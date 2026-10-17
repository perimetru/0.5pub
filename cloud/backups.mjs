const MAX=16*1024*1024;
const bad=(status,message)=>{throw Object.assign(new Error(message),{status})};
const hash=async bytes=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),n=>n.toString(16).padStart(2,'0')).join('');
export async function backups(request,bucket,reply){
 if(!bucket)bad(503,'R2 is not configured');
 const suffix=new URL(request.url).pathname.slice('/sync/backups'.length);
 const list=async()=>{const all=[];let cursor;do{const page=await bucket.list({prefix:'daily/',limit:1000,include:['customMetadata'],...(cursor?{cursor}:{})});all.push(...page.objects);cursor=page.truncated?page.cursor:null}while(cursor);return all.sort((a,b)=>b.key.localeCompare(a.key))};
 if(!suffix&&request.method==='GET')return reply(200,{backups:(await list()).map(o=>({date:o.key.slice(6,16),size:o.size,uploadedAt:o.uploaded,sourceName:o.customMetadata?.sourceName||'',sha256:o.customMetadata?.sha256||''}))});
 const date=suffix.match(/^\/(\d{4}-\d{2}-\d{2})$/)?.[1];
 if(date&&request.method==='GET'){
  const object=await bucket.get('daily/'+date+'.json.gz');if(!object)bad(404,'Backup not found');
  return new Response(object.body,{headers:{'content-type':'application/gzip','cache-control':'no-store','x-content-type-options':'nosniff','content-length':String(object.size),'x-backup-sha256':object.customMetadata?.sha256||'','content-disposition':'attachment; filename="restoflow-cloud-'+date+'.json.gz"'}});
 }
 const match=suffix.match(/^\/(restoflow-(?:daily|hourly|shift|manual)-(\d{4}-\d{2}-\d{2})-(\d{2}-\d{2}-\d{2})\.json\.gz)$/);
 if(!match||request.method!=='PUT')bad(404,'Not found');
 const day=new Date(match[2]+'T00:00:00Z');if(!Number.isFinite(day.getTime())||day.toISOString().slice(0,10)!==match[2]||match[2]>new Date(Date.now()+86400000).toISOString().slice(0,10)||!/^([01]\d|2[0-3])-[0-5]\d-[0-5]\d$/.test(match[3]))bad(400,'Invalid date');
 if(!request.headers.get('content-type')?.startsWith('application/gzip'))bad(415,'Gzip required');
 const expected=request.headers.get('x-backup-sha256')||'';if(!/^[a-f0-9]{64}$/.test(expected))bad(400,'SHA256 required');
 if(Number(request.headers.get('content-length'))>MAX)bad(413,'Backup too large');
 const chunks=[];let size=0;for await(const chunk of request.body||[]){size+=chunk.length;if(size>MAX)bad(413,'Backup too large');chunks.push(chunk)}
 const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length}
 if(bytes[0]!==31||bytes[1]!==139||await hash(bytes)!==expected)bad(400,'Invalid gzip or checksum');
 const key='daily/'+match[2]+'.json.gz',stamp=match[2]+'T'+match[3].replaceAll('-',':'),old=await bucket.head(key);
 if(old?.customMetadata?.sourceStamp>stamp)bad(409,'A newer backup already exists');
 if(old?.customMetadata?.sha256!==expected){
  const stored=await bucket.put(key,bytes,{sha256:expected,httpMetadata:{contentType:'application/gzip'},customMetadata:{sha256:expected,sourceName:match[1],sourceStamp:stamp},onlyIf:old?{etagMatches:old.etag}:{etagDoesNotMatch:'*'}});
  if(!stored)bad(409,'Backup changed during upload');
 }
 const verified=await bucket.head(key);if(verified?.customMetadata?.sha256!==expected||verified.size!==size)bad(503,'Backup verification failed');
 const obsolete=(await list()).slice(30).map(o=>o.key);if(obsolete.length)await bucket.delete(obsolete);
 return reply(200,{ok:true,sha256:expected,date:match[2],size});
}
