'use strict';
const $=s=>document.querySelector(s),kinds={meat:'Мясное',potato:'Картофель и другое',fish:'Рыба и морепродукты',snacks:'Закуски'};
let api='',key='',menu,preferences,dirty=false;
const status=message=>{$('#status').textContent=message};
function el(tag,text){const n=document.createElement(tag);if(text)n.textContent=text;return n}
async function request(method='GET',body){
  const response=await fetch(api+'/admin/settings',{method,cache:'no-store',signal:AbortSignal.timeout(15000),headers:{Authorization:'Bearer '+key,...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{})});
  if(!response.ok)throw Error(({401:'Неверный ключ администратора.',409:'Меню ещё не синхронизировано с RestoFlow.',503:'Админка пока не подключена. Проверьте настройки сервера.',400:'Не удалось сохранить: обновите страницу и проверьте выбранные блюда.'})[response.status]||'Ошибка сервера. Повторите попытку.');
  return response.json();
}
function checkbox(text,checked,onchange){const label=el('label'),input=el('input');input.type='checkbox';input.checked=checked;input.onchange=()=>{dirty=true;status('Есть несохранённые изменения.');onchange(input.checked)};label.append(input,el('span',text));return label}
function render(){
  const catalog=$('#catalog');catalog.replaceChildren();
  for(const c of menu.categories){
    const items=menu.items.filter(i=>i.category===c.id);if(!items.length)continue;
    const details=el('details');details.open=true;details.append(el('summary',c.ru||c.ro));
    for(const item of items){
      const row=checkbox(item.ru||item.ro,!preferences.hidden.includes(item.id),shown=>{preferences.hidden=preferences.hidden.filter(id=>id!==item.id);if(!shown)preferences.hidden.push(item.id);renderGroups()});
      row.className='dish';row.dataset.search=((item.ru||'')+' '+(item.ro||'')+' '+(c.ru||'')+' '+(c.ro||'')).toLocaleLowerCase();
      row.querySelector('span').append(el('small',item.price+' MDL · '+(item.unit||'порция')+(item.available===false?' · Временно нет':'')));details.append(row);
    }catalog.append(details);
  }
  $('#search').oninput=()=>{const q=$('#search').value.trim().toLocaleLowerCase();for(const details of catalog.children){for(const row of details.querySelectorAll('.dish'))row.hidden=!row.dataset.search.includes(q);details.hidden=![...details.querySelectorAll('.dish')].some(row=>!row.hidden)}};
  renderGroups();
}
function renderGroups(){
  const root=$('#groups');root.replaceChildren();
  const kitchen=new Set(menu.categories.filter(c=>c.route==='kitchen').map(c=>c.id));
  const items=menu.items.filter(i=>kitchen.has(i.category));
  for(const [kind,title] of Object.entries(kinds)){
    const details=el('details');details.append(el('summary',title));
    const custom=Array.isArray(preferences.company[kind]);
    const toggle=checkbox('Настроить свой список',custom,checked=>{if(checked)preferences.company[kind]=[];else delete preferences.company[kind];renderGroups();root.querySelector('[data-kind="'+kind+'"]').open=true});toggle.className='group-toggle';details.append(toggle);details.dataset.kind=kind;
    if(custom){
      const values=preferences.company[kind];
      const primary=el('label','Блюдо по умолчанию'),select=el('select');primary.className='primary';
      const active=values.filter(id=>items.some(i=>i.id===id&&i.available!==false)&&!preferences.hidden.includes(id));
      if(!active.length){const option=el('option','Нет доступных выбранных блюд');option.value='';select.append(option);select.disabled=true}
      for(const id of active){const item=items.find(i=>i.id===id),option=el('option',item.ru||item.ro);option.value=id;select.append(option)}
      select.onchange=()=>{preferences.company[kind]=[select.value,...values.filter(id=>id!==select.value)];dirty=true;status('Есть несохранённые изменения.')};primary.append(select);details.append(primary);
      const list=el('div');list.className='choices';
      for(const item of items){const row=checkbox((item.ru||item.ro)+(preferences.hidden.includes(item.id)?' · скрыто с сайта':item.available===false?' · временно нет':''),values.includes(item.id),checked=>{preferences.company[kind]=values.filter(id=>id!==item.id);if(checked)preferences.company[kind].push(item.id);renderGroups();root.querySelector('[data-kind="'+kind+'"]').open=true});row.className='dish';list.append(row)}details.append(list);
    }else details.append(el('p','Используется стандартный подбор блюд из текущего меню.'));
    root.append(details);
  }
}
$('#login').onsubmit=async event=>{
  event.preventDefault();const button=$('#login button');button.disabled=true;status('Подключаемся…');
  try{
    const config=await fetch('connection.json',{cache:'no-store',signal:AbortSignal.timeout(5000)}).then(r=>r.json());
    if(!/^https:\/\/[a-z0-9-]+\.[a-z0-9-]+\.workers\.dev$/.test(config.apiUrl||''))throw Error('Не указан адрес сервера.');
    api=config.apiUrl;key=$('#key').value;const result=await request();menu=result.menu;preferences=result.settings;
    // Removed RestoFlow dishes must not prevent saving the remaining selection.
    for(const values of Object.values(preferences.company))for(let i=values.length-1;i>=0;i--)if(!menu.items.some(item=>item.id===values[i]))values.splice(i,1);
    $('#key').value='';$('#login').hidden=true;$('#settings').hidden=false;$('#logout').hidden=false;render();dirty=false;status('Меню загружено.');
  }catch(error){key='';status(error.name==='TimeoutError'?'Сервер не ответил. Повторите попытку.':error.message)}finally{button.disabled=false}
};
$('#settings').onsubmit=async event=>{
  event.preventDefault();const button=$('#save');button.disabled=true;
  // Freeze the form while saving so edits cannot be mistaken for saved changes.
  const controls=[...$('#settings').querySelectorAll('input,select')],disabled=controls.map(n=>n.disabled);controls.forEach(n=>n.disabled=true);
  status('Сохраняем…');try{await request('PUT',preferences);dirty=false;status('Изменения сохранены на сайте.')}catch(error){status('Изменения не сохранены. '+error.message)}finally{button.disabled=false;controls.forEach((n,i)=>n.disabled=disabled[i])}
};
$('#logout').onclick=()=>{if(dirty&&!confirm('Выйти без сохранения изменений?'))return;key='';dirty=false;menu=null;preferences=null;$('#catalog').replaceChildren();$('#groups').replaceChildren();$('#settings').hidden=true;$('#logout').hidden=true;$('#login').hidden=false;status('Вы вышли.');$('#key').focus()};
window.addEventListener('beforeunload',event=>{if(dirty){event.preventDefault();event.returnValue=''}});
