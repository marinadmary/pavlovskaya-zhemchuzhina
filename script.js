// =============================
// РЕДАКТИРОВАТЬ НОВОСТИ ЗДЕСЬ
// Добавляйте новую запись первой.
// =============================
const news = [
  { date: '01 октября 2026', title: 'Сформированы счета за октябрь', text: '1 числа в «Управе» сформированы очередные счета. Оплатить их уже можно.', tag: 'Взносы' },
  { date: '30 сентября 2026', title: 'Итоги работы ТСН за сентябрь', text: 'Подключено электричество на въездной зоне, запущен шлагбаум, организована круглосуточная охрана и восстановлено видеонаблюдение.', tag: 'Отчёт' },
  { date: '30 сентября 2026', title: 'Планы работ на октябрь', text: 'Покос обочин, укрепление дороги на линии 157–167 и дренажирование проблемного участка между 409 и 402.', tag: 'Благоустройство' }
];

const faqs = [
  ['Почему ежемесячный взнос составляет 2 500 ₽?', 'Размер ежемесячного взноса утверждён общим собранием. Средства направляются на содержание и благоустройство общего имущества в рамках утверждённой сметы.'],
  ['Я не член ТСН. Что мне нужно оформить?', 'Для собственников, не являющихся членами ТСН, предусмотрен договор пользования общим имуществом.'],
  ['Где смотреть начисления и как оплатить?', 'Начисления размещаются в личном кабинете «Управы». Перейдите по ссылке на сайт «Управы», авторизуйтесь и оплатите выставленный счёт.'],
  ['Как открыть шлагбаум?', 'Позвоните на номер шлагбаума +7 (921) 415-92-42 с телефона, заранее внесённого в базу по заявлению собственника.'],
  ['Как пропустить гостей, такси или доставку?', 'Обычным гостям, такси и доставке шлагбаум открывает собственник. Для грузового транспорта необходимо заранее предупредить охрану.'],
  ['Почему на сайте нет протоколов собраний?', 'Протоколы не публикуются в открытом разделе сайта. Предполагается, что собственники будут смотреть их в личном кабинете «Управы».']
];

const newsGrid = document.querySelector('#newsGrid');
news.forEach(item => {
  const card = document.createElement('article');
  card.className = 'news-card reveal';
  card.innerHTML = `<div class="news-date">${item.date}</div><h3>${item.title}</h3><p>${item.text}</p><div class="news-tag">${item.tag}</div>`;
  newsGrid.appendChild(card);
});

const faqList = document.querySelector('#faqList');
faqs.forEach(([q,a]) => {
  const item = document.createElement('div'); item.className='faq-item reveal';
  item.innerHTML=`<button class="faq-q" type="button"><span>${q}</span><span>+</span></button><div class="faq-a">${a}</div>`;
  item.querySelector('.faq-q').addEventListener('click',()=>item.classList.toggle('open'));
  faqList.appendChild(item);
});

const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
menuToggle.addEventListener('click',()=>{const isOpen=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(isOpen));});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const toast=document.querySelector('#toast');
const showToast=t=>{toast.textContent=t;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),3200)};
document.querySelectorAll('.doc-card,.disabled').forEach(el=>el.addEventListener('click',()=>showToast('Ссылку или файл подключим в финальной версии сайта.')));

document.querySelector('#feedbackForm').addEventListener('submit',e=>{e.preventDefault();showToast('Это демо-форма: отправку подключим после выбора почты или Telegram.');});
