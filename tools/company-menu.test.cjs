const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.join(__dirname,'../site'),source=fs.readFileSync(path.join(root,'app.js'),'utf8');
const ctx={};vm.runInNewContext(source.slice(source.indexOf('const companyGroups='),source.indexOf('const companyCopy=')),ctx);
const menu=()=>JSON.parse(fs.readFileSync(path.join(root,'menu.json'),'utf8'));
test('shared table scales four groups, supports replacements and respects current kitchen availability',()=>{
 for(const guests of [4,8,10,12]){const result=ctx.recommendCompany(menu(),guests);assert.equal(result.incomplete,false);assert.equal(result.rows.length,4);assert.equal(result.rows[0].item.id,'k-ciolan-copt');assert.equal(result.rows[0].unit,'pieces');assert.equal(result.rows[0].qty,Math.ceil(guests/4));assert.equal(result.rows[1].qty,Math.ceil(guests/2));}
 const current=menu();
 let result=ctx.recommendCompany(current,8,{meat:[{id:'k-costita-bbq'}],fish:[{id:'k-dorado'}]});
 assert.equal(result.rows[0].item.id,'k-costita-bbq');assert.equal(result.rows[0].unit,'grams');assert.equal(result.rows[0].qty,1200);assert.equal(result.rows[2].unit,'pieces');
 current.items.find(x=>x.id==='k-costita-bbq').available=false;
 result=ctx.recommendCompany(current,8,{meat:[{id:'k-costita-bbq'}]});assert.equal(result.rows[0].item.id,'k-ciolan-copt');
 result=ctx.recommendCompany(current,4,{meat:[{id:'fish-platou'}]});assert.equal(result.rows[0].item.id,'k-ciolan-copt');
 assert.ok(!ctx.companyOptions(current,'meat').some(i=>i.id==='709465b2-127c-4abb-b107-688332a18b7c'));
 for(const item of current.items)item.available=false;assert.equal(ctx.recommendCompany(current,12).rows.length,0);
 assert.throws(()=>ctx.recommendCompany(menu(),7),/Unsupported/);
 const bar=menu();bar.categories.forEach(x=>x.route='bar');assert.equal(ctx.recommendCompany(bar,4).rows.length,0);
 const grams=menu();const sausage=grams.items.find(i=>i.id==='k-carnaciori-gratar');sausage.weighted=false;sausage.unit='100 г';assert.equal(ctx.recommendCompany(grams,4,{meat:[{id:sausage.id}]}).rows[0].unit,'grams');
});
test('booking handoff preserves guest comments, replaces the previous list and refuses overflow',()=>{
 const merge=ctx.mergeCompanyNotes;assert.equal(merge('Window table','','Menu 4'),'Window table\n\nMenu 4');
 assert.equal(merge('Window table\n\nMenu 4','Menu 4','Menu 8'),'Window table\n\nMenu 8');
 assert.equal(merge('Window table\n\nMenu 4\nNo onions','Menu 4','Menu 8'),'Window table\n\n\nNo onions\n\nMenu 8');
 assert.equal(merge('x'.repeat(490),'','Menu 12 guests'),null);assert.equal(merge('x'.repeat(490),'','Menu 123').length,500);
});
test('company block stays between booking and menu, with an accessible replacement dialog',()=>{
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');assert.ok(html.indexOf('<section id="booking"')<html.indexOf('<section id="company"'));assert.ok(html.indexOf('<section id="company"')<html.indexOf('<section id="menu"'));assert.equal((html.match(/id="company-picker"/g)||[]).length,1);assert.ok(html.includes('class="company-send" disabled'));
});

test('extra dishes, custom quantities and automatic size scaling stay independent',()=>{
 const choices={fish:[{id:'k-creveti-grill',qty:3},{id:'k-midii',qty:2}],meat:[{id:'k-ciolan-copt'}]};
 for(const guests of [4,8,12]){const r=ctx.recommendCompany(menu(),guests,choices);const fish=r.rows.filter(x=>x.kind==='fish');assert.equal(fish.length,2);assert.equal(fish[0].qty,3);assert.equal(fish[1].qty,2);assert.equal(r.rows[0].qty,Math.ceil(guests/4));assert.equal(r.incomplete,false)}
 assert.equal(ctx.recommendCompany(menu(),4).rows.find(r=>r.kind==='fish').item.id,'k-creveti-grill');
 const current=menu();current.items.find(i=>i.id==='k-midii').available=false;assert.equal(ctx.recommendCompany(current,4,choices).rows.filter(r=>r.kind==='fish').length,1);
 choices.fish.push({id:'k-creveti-grill',qty:9},{id:'k-ciolan-copt',qty:5});assert.equal(ctx.recommendCompany(menu(),4,choices).rows.filter(r=>r.kind==='fish').length,2);
 choices.fish[0].qty=-2;assert.equal(ctx.recommendCompany(menu(),4,choices).rows.find(r=>r.kind==='fish').qty,1);
});

test('removed categories stay empty across group sizes and partial menus can be booked',()=>{
 for(const guests of [4,8,10,12]){const r=ctx.recommendCompany(menu(),guests,{fish:[],snacks:[]});assert.equal(r.rows.length,2);assert.equal(r.incomplete,false);assert.ok(!r.rows.some(x=>['fish','snacks'].includes(x.kind)))}
 const cleared={meat:[],potato:[],fish:[],snacks:[]};assert.equal(ctx.recommendCompany(menu(),4,cleared).rows.length,0);
 cleared.fish.push({id:'k-midii',qty:2});const r=ctx.recommendCompany(menu(),4,cleared);assert.equal(r.rows.length,1);assert.equal(r.rows[0].item.id,'k-midii');assert.equal(r.incomplete,false);
 assert.equal(ctx.mergeCompanyNotes('Window table\n\nPrevious list','Previous list',''),'Window table');
});
