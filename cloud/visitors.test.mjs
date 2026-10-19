import {test} from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {recordVisit,visitorStats,visitorDay} from './visitors.mjs';
import worker from './worker.mjs';

function database(){
  const sql=new DatabaseSync(':memory:');sql.exec(readFileSync(new URL('./schema.sql',import.meta.url),'utf8'));
  const wrap=(query,params=[])=>({bind:(...values)=>wrap(query,values),first:async()=>sql.prepare(query).get(...params)||null,run:async()=>sql.prepare(query).run(...params)});
  return {sql,DB:{prepare:query=>wrap(query),batch:async statements=>{sql.exec('BEGIN');try{const rows=await Promise.all(statements.map(s=>s.run()));sql.exec('COMMIT');return rows}catch(error){sql.exec('ROLLBACK');throw error}}}};
}
test('unique periods deduplicate browsers across days and use Chisinau midnight',async()=>{
  const {sql,DB}=database(),now=new Date('2026-10-19T21:30:00Z'),id=crypto.randomUUID();
  assert.equal(visitorDay(now),'2026-10-20');
  assert.equal(visitorDay(new Date('2026-01-19T21:30:00Z')),'2026-01-19');
  assert.deepEqual(await visitorStats(DB,now),{today:0,week:0,month:0,timeZone:'Europe/Chisinau',updatedAt:now.toISOString()});
  for(const offset of [0,0,1,6])await recordVisit(DB,id,new Date(now.getTime()-offset*86400000));
  await recordVisit(DB,id.toUpperCase(),now);
  for(const offset of [7,29,30])await recordVisit(DB,crypto.randomUUID(),new Date(now.getTime()-offset*86400000));
  let stats=await visitorStats(DB,now);assert.equal(stats.today,1);assert.equal(stats.week,1);assert.equal(stats.month,3);
  sql.prepare('INSERT INTO visitor_days(day,visitor) VALUES(?,?)').run('2020-01-01','old');
  await recordVisit(DB,crypto.randomUUID(),now);stats=await visitorStats(DB,now);assert.equal(stats.today,2);assert.equal(stats.week,2);assert.equal(stats.month,4);
  assert.equal(sql.prepare("SELECT COUNT(*) AS n FROM visitor_days WHERE day='2020-01-01'").get().n,0);
  assert.ok(sql.prepare('SELECT visitor FROM visitor_days').all().every(row=>/^[a-f0-9]{64}$/.test(row.visitor)&&row.visitor!==id));
  sql.close();
});
test('public collection validates origins and bodies while statistics require admin access',async()=>{
  const {sql,DB}=database(),env={DB,ADMIN_TOKEN:'b'.repeat(48),SYNC_TOKEN:'a'.repeat(48)};
  const call=(path,method='GET',body,headers={})=>worker.fetch(new Request('https://worker.test'+path,{method,headers:{'Content-Type':'application/json',...headers},...(body!==undefined?{body:JSON.stringify(body)}:{})}),env);
  const origin={Origin:'https://05pub.md'},admin={Authorization:'Bearer '+env.ADMIN_TOKEN};
  assert.equal((await call('/admin/visitors')).status,401);
  assert.equal((await call('/admin/visitors','GET',undefined,{Authorization:'Bearer '+env.SYNC_TOKEN})).status,401);
  assert.equal((await call('/visits','POST',{id:crypto.randomUUID()})).status,403);
  for(const body of [null,{id:'bad'},{id:[crypto.randomUUID()]},{id:crypto.randomUUID(),extra:'x'.repeat(2000)}])assert.ok([400,413].includes((await call('/visits','POST',body,origin)).status));
  const value={id:crypto.randomUUID()};for(let i=0;i<2;i++)assert.equal((await call('/visits','POST',value,origin)).status,200);
  const response=await call('/admin/visitors','GET',undefined,admin);assert.equal(response.status,200);assert.equal((await response.json()).today,1);
  assert.equal(sql.prepare('SELECT COUNT(*) AS n FROM visitor_days').get().n,1);
  sql.close();
});
