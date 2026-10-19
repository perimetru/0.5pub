export const companyRules=[
  {kind:'meat',categories:['kitchen-meat-grill','b66b5c5f-1e23-49fc-9cc5-5ad92e5c6110'],first:'k-ciolan-copt'},
  {kind:'potato',categories:['kitchen-sides-snacks'],first:'k-cartofi-fri'},
  {kind:'fish',categories:['kitchen-fish-beer','kitchen-seafood'],first:'k-creveti-grill'},
  {kind:'snacks',categories:['kitchen-beer-snacks'],first:'snack-platou-bere'}
];
export function companyCandidates(menu,kind){
  const group=companyRules.find(g=>g.kind===kind);
  if(!group)return [];
  const kitchen=new Set(menu.categories.filter(c=>c.route==='kitchen').map(c=>c.id));
  const vegetables=['709465b2-127c-4abb-b107-688332a18b7c','b88f9d87-7023-4985-b5e6-5ab7eeb0e3e7'];
  return menu.items.filter(i=>kitchen.has(i.category)&&(vegetables.includes(i.id)?kind==='potato':group.categories.includes(i.category)));
}
export function companyAmount(item,kind,guests){
  const whole=item.id==='k-ciolan-copt'||item.id==='k-dorado';
  const grams=!whole&&(item.weighted||/\d+\s*(г|g)/i.test(item.unit||''));
  return {unit:whole?'pieces':grams?'grams':'portions',step:grams?50:1,max:grams?10000:50,qty:whole?Math.ceil(guests/4):grams?guests*(kind==='meat'?150:50):Math.ceil(guests/(kind==='meat'||kind==='potato'?2:4))};
}
