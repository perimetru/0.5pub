const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.join(__dirname,'../site'),source=fs.readFileSync(path.join(root,'app.js'),'utf8');
const ctx={};vm.runInNewContext(source.slice(source.indexOf('function recommendCompany('),source.indexOf('const companyCopy=')),ctx);
const menu=()=>JSON.parse(fs.readFileSync(path.join(root,'menu.json'),'utf8'));
test('company sizes scale portions, honor availability and only use kitchen dishes sold by portion',()=>{
 for(const guests of [4,8,10,12]){const result=ctx.recommendCompany(menu(),guests);assert.equal(result.incomplete,false);assert.equal(result.rows.length,5);assert.equal(result.rows.filter(x=>x.kind==='main').reduce((n,x)=>n+x.qty,0),guests);assert.ok(result.rows.every(x=>Number.isInteger(x.qty)&&x.qty>0&&!x.item.weighted));}
 const current=menu();current.items.find(x=>x.id==='k-aripioare-bbq').available=false;let result=ctx.recommendCompany(current,4);assert.ok(!result.rows.some(x=>x.item.id==='k-aripioare-bbq'));assert.ok(result.rows.some(x=>x.item.id==='k-aripioare-fresnel'));
 current.items.find(x=>x.id==='k-aripioare-fresnel').unit='100 г';current.items.find(x=>x.id==='k-buffalo-wings').weighted=true;result=ctx.recommendCompany(current,4);assert.equal(result.incomplete,true);assert.ok(!result.rows.some(x=>x.kind==='main'&&x.item.id.startsWith('k-aripioare')));
 for(const item of current.items)item.available=false;assert.equal(ctx.recommendCompany(current,12).rows.length,0);
 assert.throws(()=>ctx.recommendCompany(menu(),7),/Unsupported/);
 const bar=menu();bar.categories.forEach(x=>x.route='bar');assert.equal(ctx.recommendCompany(bar,4).rows.length,0);
});
test('company suggestions appear before the menu and keep booking first',()=>{
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');assert.ok(html.indexOf('<section id="booking"')<html.indexOf('<section id="company"'));assert.ok(html.indexOf('<section id="company"')<html.indexOf('<section id="menu"'));assert.equal((html.match(/id="company"/g)||[]).length,1);
});
