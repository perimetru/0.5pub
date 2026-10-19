'use strict';
import {companyRules,companyCandidates,companyAmount} from './company-rules.mjs';
const $=s=>document.querySelector(s),kinds={meat:'Мясное',potato:'Картофель и другое',fish:'Рыба и морепродукты',snacks:'Закуски'};
let api='',key='',menu,preferences,dirty=false;
const status=message=>{$('#status').textContent=message};
function el(tag,text){const n=document.createElement(tag);if(text)n.textContent=text;return n}
async function request(method='GET',body,path='/admin/settings'){
  const response=await fetch(api+path,{method,cache:'no-store',signal:AbortSignal.timeout(15000),headers:{Authorization:'Bearer '+key,...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{})});
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
  const root=$('#groups'),open=new Set([...root.querySelectorAll('details[open]')].map(n=>n.dataset.kind));root.replaceChildren();
  for(const [kind,title] of Object.entries(kinds)){
    const items=companyCandidates(menu,kind),rule=companyRules.find(g=>g.kind===kind);
    const details=el('details');details.open=open.has(kind);details.append(el('summary',title));details.dataset.kind=kind;
    const custom=Array.isArray(preferences.company[kind]);
    const toggle=checkbox('Настроить свой список и порции',custom,checked=>{
      if(checked)preferences.company[kind]=[...items].sort((a,b)=>Number(b.id===rule.first)-Number(a.id===rule.first)).map(i=>i.id);else delete preferences.company[kind];
      renderGroups();root.querySelector('[data-kind="'+kind+'"]').open=true;
    });toggle.className='group-toggle';details.append(toggle);
    if(custom){
      const values=preferences.company[kind];
      const primary=el('label','Блюдо по умолчанию'),select=el('select');primary.className='primary';
      const active=values.filter(id=>items.some(i=>i.id===id&&i.available!==false)&&!preferences.hidden.includes(id));
      if(!active.length){const option=el('option','Нет доступных выбранных блюд');option.value='';select.append(option);select.disabled=true}
      for(const id of active){const item=items.find(i=>i.id===id),option=el('option',item.ru||item.ro);option.value=id;select.append(option)}
      select.onchange=()=>{preferences.company[kind]=[select.value,...preferences.company[kind].filter(id=>id!==select.value)];dirty=true;status('Есть несохранённые изменения.')};primary.append(select);details.append(primary);
      const list=el('div');list.className='choices';
      for(const item of items){
        const block=el('div');block.className='choice';
        const row=checkbox((item.ru||item.ro)+(preferences.hidden.includes(item.id)?' · скрыто с сайта':item.available===false?' · временно нет':''),values.includes(item.id),checked=>{preferences.company[kind]=preferences.company[kind].filter(id=>id!==item.id);if(checked)preferences.company[kind].push(item.id);renderGroups()});row.className='dish';block.append(row);
        if(values.includes(item.id)){
          const quantities=el('div');quantities.className='quantities';
          const amount=companyAmount(item,kind,4),unit={pieces:'шт.',grams:'г',portions:'порций'}[amount.unit];
          for(const guests of [4,8,10,12]){
            const label=el('label',guests+' чел. · '+unit),input=el('input');input.type='number';input.min=amount.step;input.max=amount.max;input.step=amount.step;input.placeholder='Авто: '+companyAmount(item,kind,guests).qty;
            input.value=preferences.quantities[item.id]?.[guests]??'';input.setAttribute('aria-label',(item.ru||item.ro)+' — '+guests+' чел., '+unit);
            input.oninput=()=>{
              if(!input.validity.valid)return;
              preferences.quantities[item.id]??={};if(input.value==='')delete preferences.quantities[item.id][guests];else preferences.quantities[item.id][guests]=Number(input.value);
              if(!Object.keys(preferences.quantities[item.id]).length)delete preferences.quantities[item.id];dirty=true;status('Есть несохранённые изменения.');
            };
            label.append(input);quantities.append(label);
          }block.append(quantities);
        }list.append(block);
      }details.append(list);
    }else details.append(el('p','Стандартный подбор блюд своей категории с автоматическим расчётом количества.'));
    root.append(details);
  }
}
$('#login').onsubmit=async event=>{
  event.preventDefault();const button=$('#login button');button.disabled=true;status('Подключаемся…');
  try{
    const config=await fetch('connection.json',{cache:'no-store',signal:AbortSignal.timeout(5000)}).then(r=>r.json());
    if(!/^https:\/\/[a-z0-9-]+\.[a-z0-9-]+\.workers\.dev$/.test(config.apiUrl||''))throw Error('Не указан адрес сервера.');
    api=config.apiUrl;key=$('#key').value;const result=await request();menu=result.menu;preferences=result.settings;preferences.quantities??={};
    // Drop stale or misplaced dishes from older saved settings.
    for(const [kind,values] of Object.entries(preferences.company)){
      const allowed=new Set(companyCandidates(menu,kind).map(i=>i.id));preferences.company[kind]=values.filter(id=>allowed.has(id));
    }
    const ids=new Set(menu.items.map(i=>i.id));for(const id of Object.keys(preferences.quantities))if(!ids.has(id))delete preferences.quantities[id];
    $('#key').value='';$('#login').hidden=true;$('#settings').hidden=false;$('#logout').hidden=false;render();dirty=false;status('Меню загружено.');$('#visitor-stats').hidden=false;loadVisitors();
  }catch(error){key='';status(error.name==='TimeoutError'?'Сервер не ответил. Повторите попытку.':error.message)}finally{button.disabled=false}
};
$('#settings').onsubmit=async event=>{
  event.preventDefault();const button=$('#save');button.disabled=true;
  // Freeze the form while saving so edits cannot be mistaken for saved changes.
  const controls=[...$('#settings').querySelectorAll('input,select')],disabled=controls.map(n=>n.disabled);controls.forEach(n=>n.disabled=true);
  status('Сохраняем…');try{await request('PUT',preferences);dirty=false;status('Изменения сохранены на сайте.')}catch(error){status('Изменения не сохранены. '+error.message)}finally{button.disabled=false;controls.forEach((n,i)=>n.disabled=disabled[i])}
};
$('#logout').onclick=()=>{if(dirty&&!confirm('Выйти без сохранения изменений?'))return;key='';dirty=false;$('#visitor-stats').hidden=true;for(const period of ['today','week','month'])$('#visitors-'+period).textContent='—';menu=null;preferences=null;$('#catalog').replaceChildren();$('#groups').replaceChildren();$('#settings').hidden=true;$('#logout').hidden=true;$('#login').hidden=false;status('Вы вышли.');$('#key').focus()};
window.addEventListener('beforeunload',event=>{if(dirty){event.preventDefault();event.returnValue=''}});

async function loadVisitors(){
  const authKey=key;if(!authKey)return;const button=$('#refresh-visitors');button.disabled=true;$('#visitor-status').textContent='Загружаем статистику…';
  try{const stats=await request('GET',null,'/admin/visitors');if(key!==authKey)return;for(const period of ['today','week','month'])$('#visitors-'+period).textContent=stats[period].toLocaleString('ru-RU');$('#visitor-status').textContent='Обновлено: '+new Date(stats.updatedAt).toLocaleString('ru-MD',{timeZone:'Europe/Chisinau'});}
  catch{if(key===authKey)$('#visitor-status').textContent='Не удалось загрузить статистику. Нажмите «Обновить статистику».';}
  finally{button.disabled=false;}
}
$('#refresh-visitors').onclick=loadVisitors;
