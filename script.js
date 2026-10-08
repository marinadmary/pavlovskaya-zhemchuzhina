// =============================
// РЕДАКТИРОВАТЬ НОВОСТИ ЗДЕСЬ
// Добавляйте новую запись первой.
// =============================
const news = [
  { date: '01 октября 2026', title: 'Сформированы счета за октябрь', text: '1 числа в «Управе» сформированы очередные счета. Оплатить их уже можно.', tag: 'Взносы' },
  { date: '30 сентября 2026', title: 'Итоги работы ТСН за сентябрь', text: 'Подключено электричество на въездной зоне, запущен шлагбаум, организована круглосуточная охрана и восстановлено видеонаблюдение.', tag: 'Отчёт', images: ['assets/september-works-01.png','assets/september-works-02.png','assets/september-works-03.png','assets/september-works-04.png','assets/september-works-05.png','assets/september-works-06.png'] },
  { date: '30 сентября 2026', title: 'Планы работ на октябрь', text: 'Покос обочин, укрепление дороги на линии 157–167 и дренажирование проблемного участка между 409 и 402.', tag: 'Благоустройство' }
];

const faqs = [
  ['Как вступить в ТСН?', '<ol class="faq-steps"><li>Скачайте заявление о вступлении или возьмите бланк на КПП.</li><li>Заполните заявление и согласие на обработку персональных данных, приложите выписку из ЕГРН на участок.</li><li>Передайте документы в Правление: через жёлтый почтовый ящик на КПП, лично председателю или скан-копией на pavlov_pearl@mail.ru с последующей передачей оригинала.</li><li>После принятия в члены ТСН оплатите вступительный взнос 2 500 ₽.</li><li>Получите по e-mail и SMS приглашение для регистрации в «Управе».</li></ol><a class="text-link" href="assets/zayavlenie-o-vstuplenii-v-tsn.docx" download>Скачать заявление о вступлении →</a>'],
  ['Почему ежемесячный взнос составляет 2 500 ₽?', 'Размер ежемесячного взноса утверждён общим собранием. Средства направляются на содержание и благоустройство общего имущества в рамках утверждённой сметы.'],
  ['Я не член ТСН. Что мне нужно оформить?', 'Вам нужно выбрать формат взаимоотношений: вступить в ТСН или заключить с ТСН договор. Для собственников, не являющихся членами ТСН, предусмотрен договор пользования общим имуществом. Ознакомиться с ним и скачать можно в разделе «Документы». <a class="text-link" href="#documents">Перейти к документам →</a>'],
  ['Где смотреть начисления и как оплатить?', 'Начисления размещаются в личном кабинете «Управы». Перейдите по ссылке на сайт «Управы», авторизуйтесь и оплатите выставленный счёт.'],
  ['Как открыть шлагбаум?', 'Позвоните на номер шлагбаума +7 (921) 415-92-42 с телефона, заранее внесённого в базу по заявлению собственника.'],
  ['Как пропустить гостей, такси или доставку?', 'Обычным гостям, такси и доставке шлагбаум открывает собственник. Для грузового транспорта необходимо заранее предупредить охрану.'],
  ['Почему на сайте нет протоколов собраний?', 'Протоколы не публикуются в открытом разделе сайта. Предполагается, что собственники будут смотреть их в личном кабинете «Управы».']
];

const newsGrid = document.querySelector('#newsGrid');
news.forEach(item => {
  const card = document.createElement('article');
  card.className = `news-card reveal${item.images?.length ? ' has-gallery' : ''}`;
  const gallery = item.images?.length
    ? `<div class="news-gallery">${item.images.map((src, index) => `<img src="${src}" alt="${item.title}, фото ${index + 1}" loading="lazy">`).join('')}</div>`
    : '';
  card.innerHTML = `${gallery}<div class="news-content"><div class="news-date">${item.date}</div><h3>${item.title}</h3><p>${item.text}</p><div class="news-tag">${item.tag}</div></div>`;
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


// =============================
// КОПИРОВАНИЕ РЕКВИЗИТОВ
// =============================
async function copyTextToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(area);
    return ok;
  } catch (e) {
    return false;
  }
}

document.querySelectorAll('.copy-btn[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const original = button.textContent;
    const ok = await copyTextToClipboard(button.dataset.copy);
    if (ok) {
      button.textContent = 'Скопировано ✓';
      button.classList.add('copied');
      setTimeout(() => {
        button.textContent = original;
        button.classList.remove('copied');
      }, 1800);
    } else {
      showToast('Не удалось скопировать. Выделите реквизит вручную.');
    }
  });
});

const copyAllButton = document.querySelector('#copyAllRequisites');
if (copyAllButton) {
  copyAllButton.addEventListener('click', async () => {
    const allRequisites = `ТСН "ПАВЛОВСКАЯ ЖЕМЧУЖИНА"
ИНН: 4705128409
КПП: 470501001
ОГРН: 1264700003380
Расчётный счёт: 40703810655710001033
Банк: СЕВЕРО-ЗАПАДНЫЙ БАНК ПАО СБЕРБАНК
БИК: 044030653
Корр. счёт: 30101810500000000653
ИНН банка: 7707083893
КПП банка: 784243001
Назначение платежа: Ежемесячный Взнос члена ТСН Фамилия Имя номер участка`;
    const ok = await copyTextToClipboard(allRequisites);
    if (ok) {
      const original = copyAllButton.textContent;
      copyAllButton.textContent = 'Все реквизиты скопированы ✓';
      setTimeout(() => copyAllButton.textContent = original, 1800);
    } else {
      showToast('Не удалось скопировать реквизиты.');
    }
  });
}
