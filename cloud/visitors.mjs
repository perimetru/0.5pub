export function visitorDay(now=new Date()){
  const parts=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Chisinau',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now).map(p=>[p.type,p.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}
function before(day,days){return new Date(Date.parse(day+'T00:00:00Z')-days*86400000).toISOString().slice(0,10)}
export async function recordVisit(DB,id,now=new Date()){
  const day=visitorDay(now);
  const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(id.toLowerCase()));
  const visitor=Array.from(new Uint8Array(digest),n=>n.toString(16).padStart(2,'0')).join('');
  await DB.batch([
    DB.prepare('INSERT OR IGNORE INTO visitor_days(day,visitor) VALUES(?,?)').bind(day,visitor),
    DB.prepare('DELETE FROM visitor_days WHERE day<?').bind(before(day,89))
  ]);
}
export async function visitorStats(DB,now=new Date()){
  const today=visitorDay(now);
  const counts=await DB.prepare('SELECT COUNT(DISTINCT CASE WHEN day=? THEN visitor END) AS today, COUNT(DISTINCT CASE WHEN day>=? THEN visitor END) AS week, COUNT(DISTINCT visitor) AS month FROM visitor_days WHERE day>=? AND day<=?').bind(today,before(today,6),before(today,29),today).first();
  return {...counts,timeZone:'Europe/Chisinau',updatedAt:now.toISOString()};
}
