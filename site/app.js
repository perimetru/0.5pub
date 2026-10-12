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
    "valueQueen": "За королеву!",
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
    "queenTitle": "И за здоровье королевы",
    "queenBody": "Мы любим хорошую компанию, вкусную еду и чтим королеву. Её портрет — часть интерьера, а тост — часть нашего девиза.",
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
    "valueQueen": "Pentru regină!",
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
    "queenTitle": "Și pentru sănătatea reginei",
    "queenBody": "Ne plac compania bună și mâncarea gustoasă și o cinstim pe regină. Portretul ei face parte din decor, iar toastul — din deviza noastră.",
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
    "valueQueen": "To the Queen!",
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
    "queenTitle": "And to the Queen’s health",
    "queenBody": "We love good company, good food and honour the Queen. Her portrait is part of our interior, and the toast is part of our motto.",
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
Object.assign(pageCopy.ru, {abvLabel:'Алкоголь', densityLabel:'Нач. плотность', bitternessLabel:'Горечь', colorLabel:'Цвет', hazeLabel:'Мутность', profilePending:'Характеристики уточняются'});
Object.assign(pageCopy.ro, {abvLabel:'Alcool', densityLabel:'Densitate inițială', bitternessLabel:'Amăreală', colorLabel:'Culoare', hazeLabel:'Turbiditate', profilePending:'Caracteristici în curs de confirmare'});
Object.assign(pageCopy.en, {abvLabel:'Alcohol', densityLabel:'Original gravity', bitternessLabel:'Bitterness', colorLabel:'Colour', hazeLabel:'Haze', profilePending:'Details awaiting confirmation'});
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
const heroCopy = {
  "ru": {
    "eyebrow": "КАХУЛ · ПАБ ПРИ ПИВОВАРНЕ ALBEER",
    "title": [
      "За добрую компанию,",
      "сытный стол",
      "и здоровье королевы!"
    ],
    "description": "Пиво в чешском стиле от Albeer. Вкусная еда, тёплый свет и место за столом для своих.",
    "label": "К ХОРОШЕМУ ПИВУ — ХОРОШИЙ СТОЛ"
  },
  "ro": {
    "eyebrow": "CAHUL · PUB LA BERĂRIA ALBEER",
    "title": [
      "Pentru companie bună,",
      "o masă îmbelșugată",
      "și sănătatea reginei!"
    ],
    "description": "Bere în stil ceh de la Albeer. Mâncare gustoasă, lumină caldă și un loc la masă pentru prieteni.",
    "label": "LÂNGĂ O BERE BUNĂ — O MASĂ BUNĂ"
  },
  "en": {
    "eyebrow": "CAHUL · AT THE ALBEER BREWERY",
    "title": [
      "To good company,",
      "a hearty meal",
      "and the Queen’s health!"
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
      row.append(element('h4', '', name(item)));
      const price = element('div', 'price', new Intl.NumberFormat({ru:'ru-MD', ro:'ro-MD', en:'en-GB'}[language], {maximumFractionDigits:2}).format(item.price) + ' ');
      price.append(element('small', '', data.currency));
      row.append(price);
      let unit = text(item.unit);
      if (language !== 'ru') unit = unit.replace('порция', t.portion).replace('шт.', t.piece).replace('г', 'g').replace('мл', 'ml').replace('л', 'l');
      row.append(element('div', 'unit', item.weighted ? `${t.weight} ${unit}` : unit));
      const detail = data.dishDetails?.[item.id];
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
    const top = element('div', 'beer-card-top');
    top.append(element('span', '', pageCopy[language].draft), element('span', '', 'ALBEER'));
    const bottom = element('div', 'beer-card-bottom');
    const price = element('strong', '', new Intl.NumberFormat({ru:'ru-MD',ro:'ro-MD',en:'en-GB'}[language]).format(item.price) + ' ');
    price.append(element('small', '', data.currency));
    bottom.append(element('span', '', pageCopy[language].beerVolume), price);
    const profile = data.beerProfiles?.[id] || {};
    const stats = element('dl', 'beer-stats');
    let complete = true;
    for (const [key, labelKey, unit] of [['alcohol', 'abvLabel', '%'], ['originalDensity', 'densityLabel', '°P'], ['bitterness', 'bitternessLabel', 'IBU'], ['color', 'colorLabel', ''], ['haze', 'hazeLabel', '']]) {
      const raw = profile[key];
      const value = raw && typeof raw === 'object' ? raw[language] : raw;
      const missing = value === null || value === undefined || value === '';
      if (missing) complete = false;
      const row = element('div', 'beer-stat');
      row.dataset.stat = key;
      row.append(element('dt', '', pageCopy[language][labelKey]), element('dd', '', missing ? '—' : typeof value === 'number' ? new Intl.NumberFormat({ru:'ru-MD',ro:'ro-MD',en:'en-GB'}[language]).format(value) + (unit ? ' ' + unit : '') : value));
      if (missing) {
        const scale = element('div', 'beer-scale');
        scale.setAttribute('aria-hidden', 'true');
        for (let index = 0; index < 5; index++) scale.append(element('span', '', ''));
        row.append(scale);
      }
      stats.append(row);
    }
    card.append(top, element('h3', '', label), stats);
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
}).then(menu => { data = menu; setLanguage(language); }).catch(() => {
  menuFailed = true;
  itemsContainer.replaceChildren(element('p', 'empty', translations[language].error));
});
