const ORIGINS = ['https://05pub.md', 'https://www.05pub.md', 'https://perimetru.github.io'];
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
function fail(status, message) { throw Object.assign(new Error(message), {status}); }
async function read(request, max = 8192) {
  if (!request.headers.get('content-type')?.startsWith('application/json')) fail(415, 'JSON required');
  const reader = request.body?.getReader();
  if (!reader) fail(400, 'Missing body');
  let size = 0; const chunks = [];
  while (true) { const {done, value} = await reader.read(); if (done) break; size += value.byteLength; if (size > max) { await reader.cancel(); fail(413, 'Request too large'); } chunks.push(value); }
  const buffer = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { buffer.set(chunk, offset); offset += chunk.length; }
  try { return JSON.parse(new TextDecoder().decode(buffer)); } catch { fail(400, 'Invalid JSON'); }
}
export function reservation(input, now = new Date()) {
  if (!input || typeof input !== 'object') fail(400, 'Invalid request');
  const name = String(input.name || '').trim(), phone = String(input.phone || '').trim();
  const date = String(input.date || ''), time = String(input.time || ''), guests = Number(input.guests);
  const notes = String(input.notes || '').trim(), zone = String(input.zone || 'any');
  if (!uuid.test(input.id || '') || name.length < 2 || name.length > 80 || /[\x00-\x1f]/.test(name)) fail(400, 'Check name');
  if (!/^[+\d ()-]{7,25}$/.test(phone) || phone.replace(/\D/g, '').length < 7) fail(400, 'Check phone');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) fail(400, 'Check date and time');
  const day = Date.parse(date + 'T00:00:00Z');
  if (!Number.isFinite(day) || new Date(day).toISOString().slice(0,10) !== date) fail(400, 'Check date');
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {timeZone:'Europe/Chisinau', year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now).map(p=>[p.type,p.value]));
  const local = `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  if (date+'T'+time <= local || day > now.getTime()+90*86400000) fail(400, 'Choose a future date within 90 days');
  if (!Number.isInteger(guests) || guests < 1 || guests > 50 || notes.length > 500 || !['any','hall','terrace'].includes(zone) || input.consent !== true || input.website) fail(400, 'Check request');
  return {id:input.id, name, phone, date, time, guests, zone, notes, language:['ru','ro','en'].includes(input.language)?input.language:'ru', timeZone:'Europe/Chisinau', createdAt:now.toISOString()};
}
export function publicMenu(input) {
  if (!input || !Array.isArray(input.categories) || !Array.isArray(input.items) || input.categories.length>200 || input.items.length>3000) fail(400, 'Invalid menu');
  const string=(v,n=180)=>String(v||'').slice(0,n);
  const categories=input.categories.map(c=>({id:string(c.id),ru:string(c.ru),ro:string(c.ro),route:c.route}));
  if(categories.some(c=>!c.id||!['bar','kitchen'].includes(c.route)))fail(400,'Invalid category');
  const ids=new Set(categories.map(c=>c.id));
  const items=input.items.map(i=>({id:string(i.id),ru:string(i.ru),ro:string(i.ro),category:string(i.category),price:i.price,unit:string(i.unit,40),weighted:!!i.weighted,available:i.available!==false}));
  if(items.some(i=>!i.id||!ids.has(i.category)||typeof i.price!=='number'||!Number.isFinite(i.price)||i.price<0))fail(400,'Invalid item');
  return {currency:'MDL',categories,items};
}
async function authorized(request, env) {
  const token = request.headers.get('authorization') || '';
  if (!env.SYNC_TOKEN || env.SYNC_TOKEN.length<32) fail(503, 'Sync is not configured');
  const digest=async s=>new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)));
  const [a,b]=await Promise.all([digest(token),digest('Bearer '+env.SYNC_TOKEN)]);
  let difference=0; for(let i=0;i<a.length;i++)difference|=a[i]^b[i];
  if(difference)fail(401,'Unauthorized');
}
export default {
  async fetch(request, env) {
    const origin = request.headers.get('origin'), allowed = ORIGINS.includes(origin);
    const headers = {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Vary':'Origin'};
    if(allowed)headers['Access-Control-Allow-Origin']=origin;
    const reply=(status,value)=>new Response(JSON.stringify(value),{status,headers});
    try {
      const path=new URL(request.url).pathname;
      if(request.method==='OPTIONS') {
        if(!allowed)return reply(403,{error:'Origin not allowed'});
        return new Response(null,{status:204,headers:{...headers,'Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Access-Control-Max-Age':'3600'}});
      }
      if(path==='/health' && request.method==='GET')return reply(200,{ok:true,configured:!!env.DB&&!!env.SYNC_TOKEN});
      if(!env.DB)fail(503,'Database is not configured');
      if(path.startsWith('/sync/')) {
        await authorized(request,env);
        if(path==='/sync/menu'&&request.method==='PUT') {
          const menu=publicMenu(await read(request,1000000)),updatedAt=new Date().toISOString();
          await env.DB.prepare('INSERT INTO menu(id,payload,updated_at) VALUES(1,?,?) ON CONFLICT(id) DO UPDATE SET payload=excluded.payload, updated_at=excluded.updated_at').bind(JSON.stringify(menu),updatedAt).run();
          return reply(200,{ok:true,updatedAt});
        }
        if(path==='/sync/reservations'&&request.method==='GET') {
          const {results}=await env.DB.prepare('SELECT payload FROM reservations WHERE delivered=0 ORDER BY created_at,id LIMIT 100').all();
          return reply(200,{reservations:results.map(row=>JSON.parse(row.payload))});
        }
        if(path==='/sync/ack'&&request.method==='POST') {
          const data=await read(request);
          if(!Array.isArray(data.ids)||data.ids.length>100||data.ids.some(id=>!uuid.test(id)))fail(400,'Invalid IDs');
          if(data.ids.length)await env.DB.batch(data.ids.map(id=>env.DB.prepare('UPDATE reservations SET delivered=1 WHERE id=?').bind(id)));
          return reply(200,{ok:true});
        }
        fail(404,'Not found');
      }
      if(path==='/menu'&&request.method==='GET') {
        const row=await env.DB.prepare('SELECT payload,updated_at FROM menu WHERE id=1').first();
        if(!row)fail(503,'Menu is not synchronized yet');
        return reply(200,{...JSON.parse(row.payload),updatedAt:row.updated_at});
      }
      if(path==='/reservations'&&request.method==='POST') {
        if(!allowed)fail(403,'Origin not allowed');
        const value=reservation(await read(request));
        // Stable request IDs make a retry after a lost response safe.
        const existing=await env.DB.prepare('SELECT id FROM reservations WHERE id=?').bind(value.id).first();
        if(existing)return reply(200,{ok:true,id:value.id,status:'pending'});
        const ip=request.headers.get('CF-Connecting-IP');
        if(!ip)fail(503,'Client address unavailable');
        const bucket=Math.floor(Date.now()/3600000);
        const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(ip+':'+bucket));
        const key=Array.from(new Uint8Array(digest),n=>n.toString(16).padStart(2,'0')).join('');
        const counter=await env.DB.prepare('INSERT INTO request_limits(key,count,expires) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count').bind(key,(bucket+1)*3600000).first();
        if(counter.count>5)fail(429,'Too many requests. Please call 079 070 505');
        await env.DB.prepare('INSERT OR IGNORE INTO reservations(id,payload,created_at) VALUES(?,?,?)').bind(value.id,JSON.stringify(value),value.createdAt).run();
        await env.DB.batch([
          env.DB.prepare('DELETE FROM request_limits WHERE expires<?').bind(Date.now()),
          env.DB.prepare('DELETE FROM reservations WHERE delivered=1 AND created_at<?').bind(new Date(Date.now()-90*86400000).toISOString())
        ]);
        return reply(201,{ok:true,id:value.id,status:'pending'});
      }
      return reply(404,{error:'Not found'});
    } catch(error) { return reply(error.status||503,{error:error.status?error.message:'Service temporarily unavailable'}); }
  }
};
