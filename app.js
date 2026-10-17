'use strict';
const translations = {
  ru: {eyebrow:'0.5 PUB · ПАБ ПРИ ПИВОВАРНЕ ALBEER', title:['Пиво Albeer.','Встречаемся в пабе.'], description:'Пиво с нашей пивоварни. Еда и компания — в 0.5 PUB.', explore:'Посмотреть меню', label:'НАЙДИТЕ СВОЙ ВКУС', heading:'Меню паба', currency:'Цены в MDL', search:'Найти блюдо или напиток', all:'Всё меню', count:'Найдено позиций', empty:'Ничего не найдено. Попробуйте другое название или категорию.', footer:'0.5 PUB — паб при пивоварне Albeer.', weight:'Цена за', portion:'порция', piece:'шт.', error:'Не удалось загрузить меню. Обновите страницу.'},
  ro: {eyebrow:'0.5 PUB · PUB LA BERĂRIA ALBEER', title:['Bere Albeer.','Ne vedem la pub.'], description:'Bere din berăria noastră. Mâncare și companie — la 0.5 PUB.', explore:'Descoperă meniul', label:'GĂSEȘTE GUSTUL TĂU', heading:'Meniul pubului', currency:'Prețuri în MDL', search:'Caută un preparat sau o băutură', all:'Tot meniul', count:'Produse găsite', empty:'Nu am găsit nimic. Încearcă alt nume sau altă categorie.', footer:'0.5 PUB — pub la berăria Albeer.', weight:'Preț pentru', portion:'porție', piece:'buc.', error:'Meniul nu a putut fi încărcat. Reîncarcă pagina.'},
  en: {eyebrow:'0.5 PUB · AT THE ALBEER BREWERY', title:['Albeer beer.','See you at the pub.'], description:'Beer from our brewery. Food and good company — at 0.5 PUB.', explore:'Explore the menu', label:'FIND YOUR FAVOURITE', heading:'Pub menu', currency:'Prices in MDL', search:'Search food or drinks', all:'Full menu', count:'Items found', empty:'No matches. Try another name or category.', footer:'0.5 PUB — the pub at the Albeer brewery.', weight:'Price per', portion:'portion', piece:'pc.', error:'Could not load the menu. Please refresh the page.'}
};
const pageCopy = {
  "ru": {
    "skip": "Перейти к меню",
    "navBeer": "Пиво Albeer",
    "navMenu": "Меню",
    "navAbout": "Наш паб",
    "heroNote": "Чешская традиция. Кагульское гостеприимство.",
    "posterInvitation": "Хорошая компания\nвсегда к месту.",
    "brewedBy": "ПИВО ОТ ПИВОВАРНИ",
    "valueBeer": "Пиво Albeer",
    "valueFood": "Вкусная еда",
    "valueFriends": "Добрая компания",
    "valueQueen": "Королева в душе",
    "beerLabel": "С ПИВОВАРНИ — В ПАБ",
    "beerTitle": "Начнём с Albeer.",
    "beerIntro": "Наш стиль пивоварения — чешский. Выбирайте пиво по вкусу, а компанию берите с собой.",
    "aboutLabel": "МЕСТО СО СВОИМ ХАРАКТЕРОМ",
    "aboutTitle": "Не только пиво.\nЕщё и атмосфера.",
    "aboutIntro": "Деревянные столы, кирпичные стены, камин и коллекция пивных кружек. У каждого уголка 0.5 PUB — свой характер.",
    "terraceTitle": "Терраса",
    "terraceBody": "Крытая деревянная терраса, зелень и столы для встреч с друзьями.",
    "fireTitle": "Камин и кружки",
    "fireBody": "Каменный камин, тёплый свет и коллекция кружек, которую хочется рассматривать.",
    "barTitle": "У барной стойки",
    "barBody": "Пивные краны, винтажные афиши и разговоры за бокалом Albeer.",
    "symbolsLabel": "НАШИ МАЛЕНЬКИЕ ТРАДИЦИИ",
    "symbolsTitle": "У паба есть свои символы.",
    "witchTitle": "Из Праги — с характером",
    "witchBody": "Баба-яга на метле приехала из Праги и стала одним из символов нашего паба. Маленькая деталь с большой историей.",
    "queenTitle": "Королева в душе",
    "queenBody": "Мы любим пиво, вкусную еду и встречи с друзьями. И чтим память королевы: её портрет — часть атмосферы нашего паба.",
    "closingTitle": "Собирайте своих.\nВстречаемся в 0.5 PUB.",
    "closingLink": "Выбрать что-нибудь вкусное",
    "loading": "Загружаем меню…",
    "draft": "НА РОЗЛИВ",
    "beerVolume": "0,5 л"
  },
  "ro": {
    "skip": "Salt la meniu",
    "navBeer": "Bere Albeer",
    "navMenu": "Meniu",
    "navAbout": "Pubul nostru",
    "heroNote": "Tradiție cehă. Ospitalitate din Cahul.",
    "posterInvitation": "Compania bună\nîși găsește mereu locul.",
    "brewedBy": "BERE DE LA BERĂRIA",
    "valueBeer": "Bere Albeer",
    "valueFood": "Mâncare gustoasă",
    "valueFriends": "Companie bună",
    "valueQueen": "Regina în suflet",
    "beerLabel": "DE LA BERĂRIE — LA PUB",
    "beerTitle": "Începem cu Albeer.",
    "beerIntro": "Stilul nostru de fabricare a berii este ceh. Alege berea care îți place și adu-ți prietenii.",
    "aboutLabel": "UN LOC CU PERSONALITATE",
    "aboutTitle": "Mai mult decât bere.\nȘi atmosferă.",
    "aboutIntro": "Mese din lemn, pereți de cărămidă, un șemineu și o colecție de căni de bere. Fiecare colț al pubului 0.5 are personalitatea sa.",
    "terraceTitle": "Terasa",
    "terraceBody": "O terasă acoperită din lemn, verdeață și mese pentru întâlniri cu prietenii.",
    "fireTitle": "Șemineul și cănile",
    "fireBody": "Un șemineu de piatră, lumină caldă și o colecție de căni pe care vrei să le admiri.",
    "barTitle": "La tejgheaua barului",
    "barBody": "Robinete de bere, afișe vintage și conversații la un pahar de Albeer.",
    "symbolsLabel": "MICILE NOASTRE TRADIȚII",
    "symbolsTitle": "Pubul are simbolurile sale.",
    "witchTitle": "Din Praga — cu personalitate",
    "witchBody": "Baba Iaga pe mătură a venit din Praga și a devenit unul dintre simbolurile pubului nostru. Un mic detaliu cu o poveste mare.",
    "queenTitle": "Regina în suflet",
    "queenBody": "Ne plac berea, mâncarea bună și întâlnirile cu prietenii. Cinstim memoria reginei: portretul ei face parte din atmosfera pubului nostru.",
    "closingTitle": "Adună-ți prietenii.\nNe vedem la 0.5 PUB.",
    "closingLink": "Alege ceva gustos",
    "loading": "Încărcăm meniul…",
    "draft": "LA DRAFT",
    "beerVolume": "0,5 l"
  },
  "en": {
    "skip": "Skip to menu",
    "navBeer": "Albeer beer",
    "navMenu": "Menu",
    "navAbout": "Our pub",
    "heroNote": "Czech tradition. Cahul hospitality.",
    "posterInvitation": "There is always room\nfor good company.",
    "brewedBy": "BEER FROM THE BREWERY",
    "valueBeer": "Albeer beer",
    "valueFood": "Good food",
    "valueFriends": "Good company",
    "valueQueen": "The Queen in our hearts",
    "beerLabel": "FROM THE BREWERY TO THE PUB",
    "beerTitle": "Let’s start with Albeer.",
    "beerIntro": "We brew in the Czech tradition. Choose your favourite beer and bring your friends along.",
    "aboutLabel": "A PLACE WITH CHARACTER",
    "aboutTitle": "More than beer.\nAn atmosphere of its own.",
    "aboutIntro": "Wooden tables, brick walls, a fireplace and a collection of beer mugs. Every corner of 0.5 PUB has its own character.",
    "terraceTitle": "The terrace",
    "terraceBody": "A covered wooden terrace, greenery and tables for getting together with friends.",
    "fireTitle": "The fireplace & mugs",
    "fireBody": "A stone fireplace, warm light and a collection of mugs worth a closer look.",
    "barTitle": "At the bar",
    "barBody": "Beer taps, vintage posters and conversations over a glass of Albeer.",
    "symbolsLabel": "OUR LITTLE TRADITIONS",
    "symbolsTitle": "A pub with its own symbols.",
    "witchTitle": "From Prague, with character",
    "witchBody": "Our Baba Yaga on a broom came from Prague and became one of the pub’s symbols. A small detail with a big story.",
    "queenTitle": "The Queen in our hearts",
    "queenBody": "We love beer, good food and getting together with friends. We honour the Queen’s memory: her portrait is part of our pub’s atmosphere.",
    "closingTitle": "Gather your friends.\nSee you at 0.5 PUB.",
    "closingLink": "Find something delicious",
    "loading": "Loading the menu…",
    "draft": "ON TAP",
    "beerVolume": "0.5 L"
  }
};
Object.assign(pageCopy.ru, {reservationLabel:'Резервация столика', directionsLabel:'Маршрут на автомобиле'});
Object.assign(pageCopy.ro, {reservationLabel:'Rezervări mese', directionsLabel:'Traseu cu mașina'});
Object.assign(pageCopy.en, {reservationLabel:'Table reservations', directionsLabel:'Driving directions'});
Object.assign(pageCopy.ru, {abvLabel:'Алкоголь', densityLabel:'Нач. плотность', bitternessLabel:'Горечь', colorLabel:'Цвет', clarityLabel:'Прозрачность', clarityOf:'из', profilePending:'Характеристики уточняются'});
Object.assign(pageCopy.ro, {abvLabel:'Alcool', densityLabel:'Densitate inițială', bitternessLabel:'Amăreală', colorLabel:'Culoare', clarityLabel:'Limpiditate', clarityOf:'din', profilePending:'Caracteristici în curs de confirmare'});
Object.assign(pageCopy.en, {abvLabel:'Alcohol', densityLabel:'Original gravity', bitternessLabel:'Bitterness', colorLabel:'Colour', clarityLabel:'Clarity', clarityOf:'of', profilePending:'Details awaiting confirmation'});
Object.assign(pageCopy.ru, {barMenu:'Бар', kitchenMenu:'Кухня', allBar:'Весь бар', allKitchen:'Вся кухня', departmentsLabel:'Разделы меню'});
Object.assign(pageCopy.ro, {barMenu:'Bar', kitchenMenu:'Bucătărie', allBar:'Tot barul', allKitchen:'Toată bucătăria', departmentsLabel:'Secțiuni de meniu'});
Object.assign(pageCopy.en, {barMenu:'Bar', kitchenMenu:'Kitchen', allBar:'All bar items', allKitchen:'All kitchen items', departmentsLabel:'Menu sections'});
Object.assign(pageCopy.ru, {dishMore:'Подробнее', dishPhotoMore:'Описание и фото', dishClose:'Закрыть описание'});
Object.assign(pageCopy.ro, {dishMore:'Detalii', dishPhotoMore:'Descriere și fotografie', dishClose:'Închide descrierea'});
Object.assign(pageCopy.en, {dishMore:'Details', dishPhotoMore:'Description & photo', dishClose:'Close description'});
const allergenLabels = {
  "ru": {
    "milk": "Молоко",
    "eggs": "Яйца",
    "gluten": "Глютен",
    "fish": "Рыба",
    "crustaceans": "Ракообразные",
    "molluscs": "Моллюски",
    "peanuts": "Арахис",
    "nuts": "Орехи",
    "soy": "Соя",
    "celery": "Сельдерей",
    "mustard": "Горчица",
    "sesame": "Кунжут",
    "sulphites": "Сульфиты",
    "lupin": "Люпин"
  },
  "ro": {
    "milk": "Lapte",
    "eggs": "Ouă",
    "gluten": "Gluten",
    "fish": "Pește",
    "crustaceans": "Crustacee",
    "molluscs": "Moluște",
    "peanuts": "Arahide",
    "nuts": "Fructe cu coajă lemnoasă",
    "soy": "Soia",
    "celery": "Țelină",
    "mustard": "Muștar",
    "sesame": "Susan",
    "sulphites": "Sulfiți",
    "lupin": "Lupin"
  },
  "en": {
    "milk": "Milk",
    "eggs": "Eggs",
    "gluten": "Gluten",
    "fish": "Fish",
    "crustaceans": "Crustaceans",
    "molluscs": "Molluscs",
    "peanuts": "Peanuts",
    "nuts": "Tree nuts",
    "soy": "Soy",
    "celery": "Celery",
    "mustard": "Mustard",
    "sesame": "Sesame",
    "sulphites": "Sulphites",
    "lupin": "Lupin"
  }
};
Object.assign(pageCopy.ru, {"allergenTitle": "Аллергены", "allergenContains": "По составу техкарты", "allergenCheck": "Требуют проверки", "allergenUnknown": "Полный список аллергенов не подтверждён.", "allergenReview": "Состав готовых продуктов, соусов или панировки нужно уточнить у персонала.", "allergenAdvice": "При аллергии сообщите официанту и уточните состав и условия приготовления.", "allergenRowLabel": "По техкарте:", "allergenRowReview": "Аллергены: уточните состав", "allergenMenuNote": "Отметки сделаны по доступным техкартам; это не полный список для всех позиций. При аллергии уточните у персонала состав и условия приготовления."});
Object.assign(pageCopy.ro, {"allergenTitle": "Alergeni", "allergenContains": "Conform ingredientelor din fișă", "allergenCheck": "Necesită verificare", "allergenUnknown": "Lista completă a alergenilor nu este confirmată.", "allergenReview": "Compoziția produselor gata preparate, a sosurilor sau a crustei trebuie verificată cu personalul.", "allergenAdvice": "Dacă aveți alergii, informați chelnerul și verificați ingredientele și condițiile de preparare.", "allergenRowLabel": "Conform fișei:", "allergenRowReview": "Alergeni: verificați ingredientele", "allergenMenuNote": "Mențiunile se bazează pe fișele disponibile; lista nu este completă pentru toate produsele. Dacă aveți alergii, verificați ingredientele și condițiile de preparare cu personalul."});
Object.assign(pageCopy.en, {"allergenTitle": "Allergens", "allergenContains": "Based on recipe ingredients", "allergenCheck": "Need verification", "allergenUnknown": "The full allergen list has not been confirmed.", "allergenReview": "Please check the ingredients of prepared products, sauces or coatings with our staff.", "allergenAdvice": "If you have an allergy, tell your server and check the ingredients and preparation conditions.", "allergenRowLabel": "From the recipe:", "allergenRowReview": "Allergens: check ingredients", "allergenMenuNote": "Labels are based on the available recipe sheets and do not cover every menu item. If you have an allergy, check ingredients and preparation conditions with our staff."});
Object.assign(pageCopy.ru, {witchImageAlt:'Ведьма на метле — символ паба', queenImageAlt:'Пивная афиша с портретом королевы'});
Object.assign(pageCopy.ro, {witchImageAlt:'Vrăjitoare pe mătură — simbolul pubului', queenImageAlt:'Afiș de bere cu portretul reginei'});
Object.assign(pageCopy.en, {witchImageAlt:'Witch on a broom — a symbol of the pub', queenImageAlt:'Beer poster featuring the Queen'});
const heroCopy = {
  "ru": {
    "eyebrow": "КАХУЛ · ПАБ ПРИ ПИВОВАРНЕ ALBEER",
    "title": [
      "Пиво. Еда.",
      "Друзья.",
      "И в душе — Королева."
    ],
    "description": "Пиво в чешском стиле от Albeer. Вкусная еда, тёплый свет и место за столом для своих.",
    "label": "К ХОРОШЕМУ ПИВУ — ХОРОШИЙ СТОЛ"
  },
  "ro": {
    "eyebrow": "CAHUL · PUB LA BERĂRIA ALBEER",
    "title": [
      "Bere. Mâncare.",
      "Prieteni.",
      "Și Regina în suflet."
    ],
    "description": "Bere în stil ceh de la Albeer. Mâncare gustoasă, lumină caldă și un loc la masă pentru prieteni.",
    "label": "LÂNGĂ O BERE BUNĂ — O MASĂ BUNĂ"
  },
  "en": {
    "eyebrow": "CAHUL · AT THE ALBEER BREWERY",
    "title": [
      "Beer. Food.",
      "Friends.",
      "And the Queen in our hearts."
    ],
    "description": "Czech-style beer from Albeer. Good food, warm light and a place at the table for friends.",
    "label": "GOOD BEER DESERVES GOOD FOOD"
  }
};
for (const lang of Object.keys(heroCopy)) Object.assign(translations[lang], heroCopy[lang]);
let language = 'ru';
let category = 'all';
let department = 'bar';
let data;
let menuFailed = false;
let currentDish = null;
let companyGuests = 4;

const companyGroups=[
  {kind:'meat',categories:['kitchen-meat-grill','b66b5c5f-1e23-49fc-9cc5-5ad92e5c6110'],first:'k-ciolan-copt'},
  {kind:'potato',categories:['kitchen-sides-snacks'],first:'k-cartofi-fri'},
  {kind:'fish',categories:['kitchen-fish-beer','kitchen-seafood'],first:'fish-platou'},
  {kind:'snacks',categories:['kitchen-beer-snacks'],first:'snack-platou-bere'}
];
function companyOptions(menu,kind){
  const group=companyGroups.find(g=>g.kind===kind);
  const kitchen=new Set(menu.categories.filter(c=>c.route==='kitchen').map(c=>c.id));
  // These vegetable dishes share the meat category in RestoFlow.
  const vegetables=['709465b2-127c-4abb-b107-688332a18b7c','b88f9d87-7023-4985-b5e6-5ab7eeb0e3e7'];
  return menu.items.filter(i=>group.categories.includes(i.category)&&kitchen.has(i.category)&&i.available!==false&&!vegetables.includes(i.id));
}
function recommendCompany(menu,guests,choices={}){
  if(![4,8,10,12].includes(guests))throw new Error('Unsupported company size');
  const rows=[];
  for(const group of companyGroups){
    const options=companyOptions(menu,group.kind);
    const item=options.find(i=>i.id===choices[group.kind])||options.find(i=>i.id===group.first)||options[0];
    if(!item)continue;
    const whole=item.id==='k-ciolan-copt'||item.id==='k-dorado';
    const grams=!whole&&(item.weighted||/\d+\s*(г|g)/i.test(item.unit||''));
    const qty=whole?Math.ceil(guests/4):grams?guests*(group.kind==='meat'?150:50):Math.ceil(guests/(group.kind==='meat'||group.kind==='potato'?2:4));
    rows.push({item,kind:group.kind,qty,unit:whole?'pieces':grams?'grams':'portions'});
  }
  return {rows,incomplete:rows.length<companyGroups.length};
}
function mergeCompanyNotes(existing,previous,next){
  const index=previous?existing.indexOf(previous):-1;
  const personal=(index<0?existing:existing.slice(0,index)+existing.slice(index+previous.length)).trim();
  const merged=[personal,next].filter(Boolean).join('\n\n');
  return merged.length<=500?merged:null;
}
const companyCopy={
  ru:{eyebrow:'0.5 PUB · ЗА ОДНИМ СТОЛОМ',title:'Меню для компании',intro:'Несколько разных блюд на общий стол — чтобы каждый попробовал понемногу. Выберите количество гостей и замените блюда по вкусу.',people:'чел.',selection:'Количество гостей',heading:n=>'На компанию из '+n+' человек',meat:'Мясное',potato:'Картофель и другое',fish:'Рыба и морепродукты',snacks:'Закуски',portions:n=>n+' '+({one:'порция',few:'порции',many:'порций',other:'порции'}[new Intl.PluralRules('ru').select(n)]),pieces:n=>n+' шт. (вес уточним)',grams:n=>'≈ '+n+' г',note:'Количество ориентировочное, для дегустации на общий стол. Вес целых блюд и окончательный состав согласуем при подтверждении брони. При аллергии уточните состав у сотрудника.',loading:'Загружаем актуальное меню…',offline:'Не удалось проверить наличие блюд. Позвоните нам — поможем составить меню.',partial:'Не во всех группах есть доступные блюда. Уточните меню по телефону.',empty:'Сейчас не можем составить рекомендацию. Позвоните нам.',browse:'Посмотреть всё меню',change:'Заменить',close:'Закрыть',choose:'Выберите блюдо',send:'Отправить на резервацию',hint:'Список попадёт в комментарий. Затем укажите дату, время и контакты — это ещё не заказ.',sent:'Меню добавлено в комментарий к брони. Заполните дату, время и контакты.',full:'В комментарии недостаточно места. Сократите его, чтобы добавить меню (лимит 500 символов).',locked:'Бронь уже отправлена. Чтобы изменить меню, свяжитесь с нами.',noteTitle:n=>'Общий стол, '+n+' чел. (примерно):'},
  ro:{eyebrow:'0.5 PUB · LA ACEEAȘI MASĂ',title:'Meniu pentru prieteni',intro:'Mai multe preparate la comun, ca fiecare să guste din toate. Alegeți numărul de persoane și schimbați preparatele după preferințe.',people:'pers.',selection:'Număr de persoane',heading:n=>'Pentru un grup de '+n+' persoane',meat:'Carne',potato:'Cartofi și altele',fish:'Pește și fructe de mare',snacks:'Gustări',portions:n=>n+' '+(n===1?'porție':'porții'),pieces:n=>n+' buc. (greutatea se confirmă)',grams:n=>'≈ '+n+' g',note:'Cantități orientative pentru degustare la masa comună. Greutatea preparatelor întregi și meniul final se stabilesc la confirmarea rezervării. Pentru alergii, verificați ingredientele cu personalul.',loading:'Încărcăm meniul actual…',offline:'Nu am putut verifica disponibilitatea. Sună-ne și te ajutăm.',partial:'Nu toate grupurile au preparate disponibile. Verificați meniul telefonic.',empty:'Nu putem alcătui o sugestie acum. Sună-ne.',browse:'Vezi tot meniul',change:'Schimbă',close:'Închide',choose:'Alege un preparat',send:'Trimite la rezervare',hint:'Lista va fi adăugată în comentariu. Apoi completați data, ora și contactele — nu este încă o comandă.',sent:'Meniul a fost adăugat în comentariu. Completați data, ora și contactele.',full:'Nu este suficient loc în comentariu. Scurtați-l pentru a adăuga meniul (limita: 500 de caractere).',locked:'Rezervarea a fost deja trimisă. Pentru schimbarea meniului, sunați-ne.',noteTitle:n=>'Masă comună, '+n+' pers. (orientativ):'},
  en:{eyebrow:'0.5 PUB · AROUND ONE TABLE',title:'Food for your group',intro:'Different dishes for the table, so everyone can try a little of everything. Choose your group size and swap dishes to taste.',people:'guests',selection:'Number of guests',heading:n=>'For a group of '+n,meat:'Meat',potato:'Potatoes and sides',fish:'Fish and seafood',snacks:'Snacks',portions:n=>n+' '+(n===1?'portion':'portions'),pieces:n=>n+' pcs (weight to confirm)',grams:n=>'≈ '+n+' g',note:'Approximate quantities for sharing and tasting. Whole-dish weights and the final menu will be agreed when your booking is confirmed. Please check ingredients with staff if you have allergies.',loading:'Loading the current menu…',offline:'We could not check availability. Call us for help choosing.',partial:'Some groups have no available dishes. Please call to discuss the menu.',empty:'We cannot suggest a menu right now. Please call us.',browse:'Explore the full menu',change:'Swap',close:'Close',choose:'Choose a dish',send:'Add to reservation',hint:'The list will go into the booking comment. Then enter your date, time and contact details — this is not an order yet.',sent:'Menu added to the booking comment. Enter your date, time and contact details.',full:'There is not enough space in the comment. Shorten it to add the menu (500 character limit).',locked:'Your booking has already been sent. Please call us to change the menu.',noteTitle:n=>'Shared table, '+n+' guests (approx.):'}
};
let companyChoices={},companyPickerKind=null,companyPickerCategory=null,previousCompanyNote='',companyFeedback='';
const companyPicker=document.querySelector('#company-picker');
function companyQuantity(row){return companyCopy[language][row.unit](row.qty)}
function renderCompanyPicker(){
  if(!companyPickerKind)return;
  const t=companyCopy[language];
  companyPicker.querySelector('h2').textContent=t.choose+' · '+t[companyPickerKind];
  companyPicker.querySelector('.company-close').textContent=t.close;
  const tabs=companyPicker.querySelector('.company-picker-tabs'),list=companyPicker.querySelector('.company-options');tabs.replaceChildren();list.replaceChildren();
  const options=data&&window.pubMenuUpdatedAt?companyOptions(data,companyPickerKind):[];
  const categories=data?.categories.filter(c=>options.some(i=>i.category===c.id))||[];
  if(!categories.some(c=>c.id===companyPickerCategory))companyPickerCategory=categories[0]?.id;
  for(const c of categories){const b=element('button','',name(c));b.type='button';b.setAttribute('aria-pressed',String(c.id===companyPickerCategory));b.onclick=()=>{companyPickerCategory=c.id;renderCompanyPicker()};tabs.append(b)}
  if(!options.length)list.append(element('p','',t.offline));
  for(const item of options.filter(i=>i.category===companyPickerCategory)){
    const b=element('button','company-option');b.type='button';b.setAttribute('aria-pressed',String(companyChoices[companyPickerKind]===item.id));
    b.append(element('span','',name(item)),element('small','',item.price+' '+(data.currency||'MDL')+' / '+(item.unit||'')));
    b.onclick=()=>{companyChoices[companyPickerKind]=item.id;companyFeedback='';companyPicker.close();renderCompany()};list.append(b);
  }
}
function renderCompany(){
  const t=companyCopy[language],root=document.querySelector('#company');if(!root)return;
  root.querySelector('.eyebrow').textContent=t.eyebrow;root.querySelector('h2').textContent=t.title;root.querySelector('.company-intro').textContent=t.intro;
  root.querySelector('.company-sizes').setAttribute('aria-label',t.selection);
  root.querySelectorAll('[data-company-size]').forEach(b=>{b.textContent=b.dataset.companySize+' '+t.people;b.setAttribute('aria-pressed',String(Number(b.dataset.companySize)===companyGuests))});
  root.querySelector('h3').textContent=t.heading(companyGuests);root.querySelector('.company-note').textContent=t.note;root.querySelector('.company-browse').textContent=t.browse;
  root.querySelector('.company-send').textContent=t.send;root.querySelector('.company-hint').textContent=t.hint;
  root.querySelector('.company-feedback').textContent=companyFeedback?t[companyFeedback]:'';
  const list=root.querySelector('.company-list'),status=root.querySelector('.company-status'),send=root.querySelector('.company-send');list.replaceChildren();send.disabled=true;
  if(!data||!window.pubMenuUpdatedAt){status.textContent=window.pubMenuUpdatedAt===''?t.offline:t.loading;if(companyPicker.open)renderCompanyPicker();return}
  const result=recommendCompany(data,companyGuests,companyChoices);status.textContent=!result.rows.length?t.empty:result.incomplete?t.partial:'';send.disabled=result.incomplete;
  for(const row of result.rows){
    companyChoices[row.kind]=row.item.id;
    const li=element('li','company-row'),label=element('div','company-dish'),title=element('button','company-dish-name',name(row.item));
    title.type='button';title.setAttribute('aria-label',name(row.item)+' — '+t.change);
    title.onclick=()=>{companyPickerKind=row.kind;companyPickerCategory=row.item.category;renderCompanyPicker();companyPicker.showModal()};
    const change=element('button','company-change',t.change);change.type='button';change.onclick=title.onclick;label.append(element('small','',t[row.kind]),title,change);li.append(label,element('strong','company-qty',companyQuantity(row)));list.append(li);
  }
  if(companyPicker.open)renderCompanyPicker();
}
document.querySelectorAll('[data-company-size]').forEach(b=>b.addEventListener('click',()=>{companyGuests=Number(b.dataset.companySize);companyFeedback='';renderCompany()}));
companyPicker.querySelector('.company-close').onclick=()=>companyPicker.close();
companyPicker.addEventListener('click',e=>{if(e.target===companyPicker)companyPicker.close()});
document.querySelector('.company-send').onclick=()=>{
  const form=document.querySelector('#booking-form'),t=companyCopy[language];
  if(form.elements.notes.disabled){companyFeedback='locked';renderCompany();return}
  if(!data||!window.pubMenuUpdatedAt)return;
  const result=recommendCompany(data,companyGuests,companyChoices);if(result.incomplete)return;
  const note=[t.noteTitle(companyGuests),...result.rows.map(row=>name(row.item)+' — '+companyQuantity(row))].join('\n');
  const merged=mergeCompanyNotes(form.elements.notes.value,previousCompanyNote,note);
  if(merged===null){companyFeedback='full';renderCompany();return}
  form.elements.notes.value=merged;form.elements.guests.value=String(companyGuests);previousCompanyNote=note;companyFeedback='sent';renderCompany();
  document.querySelector('#booking').scrollIntoView({behavior:'smooth',block:'start'});form.elements.date.focus({preventScroll:true});
};
window.addEventListener('pub-menu-updated',renderCompany);
const dishDialog = document.querySelector('#dish-dialog');
const search = document.querySelector('#search');
const itemsContainer = document.querySelector('#items');
const categoryContainer = document.querySelector('#categories');
const text = (value) => String(value ?? '');
const name = (item) => text(item[language] || item.ru || item.ro);
const normalize = (value) => text(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
function element(tag, className, value) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value !== undefined) node.textContent = value;
  return node;
}
function departmentCategories() {
  return data.categories.filter(group => group.route === department);
}
function departmentItems() {
  const ids = new Set(departmentCategories().map(group => group.id));
  return data.items.filter(item => ids.has(item.category));
}
function renderDepartments() {
  document.querySelector('.menu-departments').setAttribute('aria-label', pageCopy[language].departmentsLabel);
  document.querySelectorAll('[data-department]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.department === department));
    const ids = new Set(data.categories.filter(group => group.route === button.dataset.department).map(group => group.id));
    button.querySelector('.department-count').textContent = data.items.filter(item => ids.has(item.category)).length;
  });
}
function renderCategories() {
  const t = translations[language];
  categoryContainer.replaceChildren();
  const allLabel = pageCopy[language][department === 'bar' ? 'allBar' : 'allKitchen'];
  for (const group of [{id:'all', ru:allLabel, ro:allLabel, en:allLabel}, ...departmentCategories()]) {
    const count = departmentItems().filter(item => group.id === 'all' || item.category === group.id).length;
    if (!count) continue;
    const button = element('button', 'category', name(group));
    button.type = 'button';
    button.dataset.category = group.id;
    button.setAttribute('aria-pressed', String(category === group.id));
    button.append(element('span', '', count));
    button.addEventListener('click', () => {
      category = group.id;
      renderCategories();
      renderItems();
    });
    categoryContainer.append(button);
  }
}
function renderItems() {
  const t = translations[language];
  const query = normalize(search.value.trim());
  const selected = departmentItems().filter(item => (category === 'all' || category === item.category) &&
    (!query || normalize(`${item.ru} ${item.ro} ${item.en}`).includes(query)));
  document.querySelector('#result-count').textContent = `${t.count}: ${selected.length}`;
  itemsContainer.replaceChildren();
  if (!selected.length) {
    itemsContainer.append(element('p', 'empty', t.empty));
    return;
  }
  for (const group of departmentCategories()) {
    const matching = selected.filter(item => item.category === group.id);
    if (!matching.length) continue;
    const section = element('details', 'menu-section');
    section.open = Boolean(query) || category !== 'all' || group.id === departmentCategories()[0]?.id;
    const summary = element('summary', 'section-summary');
    const heading = element('h3', 'section-title', name(group));
    summary.append(heading, element('span', 'section-count', matching.length));
    const grid = element('div', 'menu-grid');
    for (const item of matching) {
      const row = element('article', 'menu-item');
      row.dataset.itemId = item.id;
      const detail = data.dishDetails?.[item.id];
      row.append(element('h4', '', name(item)));
      if(item.available===false)row.append(element('span','availability',{ru:'Временно нет',ro:'Indisponibil momentan',en:'Temporarily unavailable'}[language]));
      const price = element('div', 'price', new Intl.NumberFormat({ru:'ru-MD', ro:'ro-MD', en:'en-GB'}[language], {maximumFractionDigits:2}).format(item.price) + ' ');
      price.append(element('small', '', data.currency));
      if (detail?.image) {
        row.classList.add('has-thumbnail');
        const thumbnail = element('button', 'dish-thumbnail');
        thumbnail.type = 'button';
        thumbnail.setAttribute('aria-haspopup', 'dialog');
        thumbnail.setAttribute('aria-label', pageCopy[language].dishPhotoMore + ': ' + name(item));
        thumbnail.title = detail.photoCaption[language];
        const photo = element('img', '', '');
        photo.src = data.photoAssets?.[detail.image] || detail.image;
        photo.alt = '';
        photo.loading = 'lazy';
        photo.decoding = 'async';
        photo.width = 84;
        photo.height = 84;
        thumbnail.append(photo);
        thumbnail.addEventListener('click', () => openDish(item.id));
        row.append(thumbnail);
      }
      row.append(price);
      let unit = text(item.unit);
      if (language !== 'ru') unit = unit.replace('порция', t.portion).replace('шт.', t.piece).replace('г', 'g').replace('мл', 'ml').replace('л', 'l');
      row.append(element('div', 'unit', item.weighted ? `${t.weight} ${unit}` : unit));
      if (detail?.allergens) {
        const labels = detail.allergens.contains.map(code => allergenLabels[language][code]);
        const note = element('p', 'menu-allergens', labels.length ? pageCopy[language].allergenRowLabel + ' ' + labels.join(' · ') : pageCopy[language].allergenRowReview);
        row.append(note);
      }
      if (detail) {
        const more = element('button', 'dish-more', pageCopy[language][detail.image ? 'dishPhotoMore' : 'dishMore']);
        more.type = 'button';
        more.dataset.dishId = item.id;
        more.setAttribute('aria-haspopup', 'dialog');
        more.addEventListener('click', () => openDish(item.id));
        row.append(more);
      }
      grid.append(row);
    }
    section.append(summary, grid);
    itemsContainer.append(section);
  }
}
function renderFeaturedBeers() {
  const container = document.querySelector('#featured-beers');
  container.replaceChildren();
  for (const [id, label] of [['beer-albeer11-05', 'Albeer 11'], ['beer-albeer12-05', 'Albeer 12'], ['beer-ipa-hasdeu-05', 'IPA Hasdeu'], ['beer-ipa-weiss-05', 'Weissbier']]) {
    const item = data.items.find(entry => entry.id === id);
    if (!item) continue;
    const card = element('article', 'beer-card');
    card.dataset.featuredId = id;
    card.style.setProperty('--beer-accent', data.beerProfiles?.[id]?.colorHex || '#e6aa42');
    const top = element('div', 'beer-card-top');
    top.append(element('span', '', pageCopy[language].draft), element('span', '', 'ALBEER'));
    const bottom = element('div', 'beer-card-bottom');
    const price = element('strong', '', new Intl.NumberFormat({ru:'ru-MD',ro:'ro-MD',en:'en-GB'}[language]).format(item.price) + ' ');
    price.append(element('small', '', data.currency));
    bottom.append(element('span', '', pageCopy[language].beerVolume), price);
    const profile = data.beerProfiles?.[id] || {};
    const stats = element('dl', 'beer-stats');
    let complete = true;
    for (const [key, labelKey, unit] of [['alcohol', 'abvLabel', '%'], ['originalDensity', 'densityLabel', '°P'], ['bitterness', 'bitternessLabel', 'IBU'], ['color', 'colorLabel', ''], ['clarity', 'clarityLabel', '']]) {
      const raw = profile[key];
      const value = raw && typeof raw === 'object' ? raw[language] : raw;
      const missing = value === null || value === undefined || value === '';
      if (missing) complete = false;
      const row = element('div', 'beer-stat');
      row.dataset.stat = key;
      const display = missing ? '—' : key === 'clarity' ? value + ' ' + pageCopy[language].clarityOf + ' 5' : typeof value === 'number' ? new Intl.NumberFormat({ru:'ru-MD',ro:'ro-MD',en:'en-GB'}[language]).format(value) + (unit ? ' ' + unit : '') : value;
      row.append(element('dt', '', pageCopy[language][labelKey]), element('dd', '', display));
      if (!missing && key === 'clarity') {
        const scale = element('div', 'beer-scale');
        scale.setAttribute('role', 'meter');
        scale.setAttribute('aria-label', pageCopy[language].clarityLabel);
        scale.setAttribute('aria-valuemin', '0');
        scale.setAttribute('aria-valuemax', '5');
        scale.setAttribute('aria-valuenow', String(value));
        for (let index = 0; index < 5; index++) scale.append(element('span', index < value ? 'is-filled' : '', ''));
        row.append(scale);
      } else if (!missing && typeof value === 'number') {
        const maximum = {alcohol:10, originalDensity:20, bitterness:100}[key];
        const scale = element('meter', 'beer-numeric-meter');
        scale.min = 0;
        scale.max = Math.max(maximum, value);
        scale.value = value;
        scale.setAttribute('aria-label', pageCopy[language][labelKey]);
        const range = element('div', 'beer-meter-range');
        range.append(element('span', '', '0'), element('span', '', scale.max + ' ' + unit));
        row.append(scale, range);
      } else if (!missing && key === 'color' && /^#[0-9a-f]{6}$/i.test(profile.colorHex || '')) {
        const swatch = element('div', 'beer-color-sample');
        swatch.style.backgroundColor = profile.colorHex;
        swatch.setAttribute('aria-hidden', 'true');
        row.append(swatch);
      }
      if (missing) {
        const scale = element('div', 'beer-scale');
        scale.setAttribute('aria-hidden', 'true');
        for (let index = 0; index < 5; index++) scale.append(element('span', '', ''));
        row.append(scale);
      }
      stats.append(row);
    }
    card.append(top, element('h3', '', label), stats);
    if(item.available===false)card.append(element('span','availability',{ru:'Временно нет',ro:'Indisponibil momentan',en:'Temporarily unavailable'}[language]));
    if (!complete) card.append(element('p', 'profile-pending', pageCopy[language].profilePending));
    card.append(bottom);
    container.append(card);
  }
}
function renderAllergens(profile) {
  const container = document.querySelector('#dish-allergens');
  const copy = pageCopy[language];
  container.replaceChildren(element('h3', '', copy.allergenTitle));
  const groups = [['contains', copy.allergenContains], ['check', copy.allergenCheck]];
  for (const [key, label] of groups) {
    const codes = profile?.[key] || [];
    if (!codes.length) continue;
    container.append(element('p', 'allergen-group-label', label));
    const badges = element('ul', 'allergen-badges ' + (key === 'check' ? 'allergen-badges-check' : ''));
    for (const code of codes) badges.append(element('li', '', allergenLabels[language][code]));
    container.append(badges);
  }
  if (!profile?.contains?.length) container.append(element('p', 'allergen-note', copy.allergenUnknown));
  if (profile?.needsReview) container.append(element('p', 'allergen-note', copy.allergenReview));
  container.append(element('p', 'allergen-advice', copy.allergenAdvice));
}
function openDish(id) {
  const item = data.items.find(entry => entry.id === id);
  const detail = data.dishDetails?.[id];
  if (!item || !detail) return;
  currentDish = id;
  const group = data.categories.find(entry => entry.id === item.category);
  document.querySelector('#dish-category').textContent = group ? name(group) : '';
  document.querySelector('#dish-title').textContent = name(item);
  document.querySelector('#dish-description').textContent = detail.description[language];
  renderAllergens(detail.allergens);
  document.querySelector('#dish-price').textContent = new Intl.NumberFormat({ru:'ru-MD',ro:'ro-MD',en:'en-GB'}[language]).format(item.price) + ' ' + data.currency;
  let unit = text(item.unit);
  if (language !== 'ru') unit = unit.replace('порция', translations[language].portion).replace('шт.', translations[language].piece).replace('г','g').replace('мл','ml').replace('л','l');
  document.querySelector('#dish-unit').textContent = item.weighted ? translations[language].weight + ' ' + unit : unit;
  const figure = document.querySelector('.dish-visual');
  const image = document.querySelector('#dish-photo');
  figure.hidden = !detail.image;
  document.querySelector('.dish-body').classList.toggle('without-photo', !detail.image);
  if (detail.image) {
    image.src = data.photoAssets?.[detail.image] || detail.image;
    image.alt = name(item) + ' — ' + detail.photoCaption[language];
    document.querySelector('#dish-caption').textContent = detail.photoCaption[language];
  } else {
    image.removeAttribute('src');
    image.alt = '';
    document.querySelector('#dish-caption').textContent = '';
  }
  document.querySelector('.dish-close').setAttribute('aria-label', pageCopy[language].dishClose);
  if (!dishDialog.open) dishDialog.showModal();
}
document.querySelector('.dish-close').addEventListener('click', () => dishDialog.close());
dishDialog.addEventListener('click', event => {
  const bounds = dishDialog.getBoundingClientRect();
  if (event.target === dishDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dishDialog.close();
});
dishDialog.addEventListener('close', () => { currentDish = null; });
function setLanguage(next) {
  language = next;
  const t = translations[language];
  document.documentElement.lang = language;
  document.querySelectorAll('[data-alt]').forEach(image => image.alt = pageCopy[language][image.dataset.alt]);
  document.title = `0.5 PUB · ${t.heading}`;
  document.querySelector('.languages').setAttribute('aria-label', {ru:'Язык', ro:'Limba', en:'Language'}[language]);
  document.querySelector('meta[name=description]').content = `${t.footer} ${t.currency}.`;
  const heading = document.querySelector('#hero-title');
  heading.replaceChildren(document.createTextNode(t.title[0]), document.createElement('br'), element('em', '', t.title[1]), document.createElement('br'), document.createTextNode(t.title[2]));
  document.querySelector('.main-nav').setAttribute('aria-label', {ru:'Навигация', ro:'Navigare', en:'Navigation'}[language]);
  for (const node of document.querySelectorAll('[data-copy]')) {
    const lines = pageCopy[language][node.dataset.copy].split('\n');
    node.replaceChildren();
    lines.forEach((line, index) => { if (index) node.append(document.createElement('br')); node.append(document.createTextNode(line)); });
  }
  for (const [id, value] of Object.entries({'eyebrow':t.eyebrow, 'hero-description':t.description, 'menu-label':t.label, 'menu-heading':t.heading, 'currency':t.currency, 'footer-note':t.footer})) document.getElementById(id).textContent = value;
  const explore = document.querySelector('#explore');
  explore.replaceChildren(document.createTextNode(t.explore + ' '), element('span', 'link-arrow', ''));
  search.placeholder = t.search;
  search.setAttribute('aria-label', t.search);
  categoryContainer.setAttribute('aria-label', {ru:'Категории меню', ro:'Categorii de meniu', en:'Menu categories'}[language]);
  document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === language)));
  if (data) { renderDepartments(); renderCategories(); renderItems(); renderFeaturedBeers(); }
  else if (menuFailed) itemsContainer.replaceChildren(element('p', 'empty', t.error));
  renderCompany();
  if (dishDialog.open && currentDish) openDish(currentDish);
}
document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
document.querySelectorAll('[data-department]').forEach(button => button.addEventListener('click', () => {
  if (!data) return;
  department = button.dataset.department;
  category = 'all';
  renderDepartments();
  renderCategories();
  renderItems();
}));
search.addEventListener('input', () => { if (data) renderItems(); });
fetch('menu.json').then(response => {
  if (!response.ok) throw new Error(`Menu request failed: ${response.status}`);
  return response.json();
}).then(menu => {
  data=menu;setLanguage(language);
  async function refresh(){try{
    const config=await fetch('connection.json',{cache:'no-store',signal:AbortSignal.timeout(5000)}).then(r=>r.json());
    if(!/^https:\/\/[a-z0-9-]+\.[a-z0-9-]+\.workers\.dev$/.test(config.apiUrl||''))return;
    const response=await fetch(config.apiUrl+'/menu',{cache:'no-store',signal:AbortSignal.timeout(8000)});
    if(!response.ok)throw Error();const live=await response.json();
    if(!Array.isArray(live.items)||!Array.isArray(live.categories)||!live.updatedAt)throw Error();
    if(window.pubMenuUpdatedAt===live.updatedAt)return;
    const merge=(rows,original)=>rows.map(row=>{const old=original.find(x=>x.id===row.id);return {...row,en:old&&old.ru===row.ru&&old.ro===row.ro?old.en:row.ro||row.ru}});
    data={...menu,...live,categories:merge(live.categories,menu.categories),items:merge(live.items,menu.items)};
    window.pubMenuUpdatedAt=live.updatedAt;window.dispatchEvent(new Event('pub-menu-updated'));setLanguage(language);
  }catch{window.pubMenuUpdatedAt='';window.dispatchEvent(new Event('pub-menu-updated'));}}
  refresh();setInterval(()=>{if(!document.hidden)refresh()},60000);
}).catch(() => {
  menuFailed = true;
  itemsContainer.replaceChildren(element('p', 'empty', translations[language].error));
});
