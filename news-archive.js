const archiveList = document.querySelector('#archiveList');
const allNews = [...(window.SITE_NEWS || [])].sort((a,b) => b.sort.localeCompare(a.sort));

function badgeClass(item) {
  if (item.kind === 'meeting') return 'archive-badge archive-badge-meeting';
  if (item.kind === 'vote') return 'archive-badge archive-badge-vote';
  return 'archive-badge';
}

function renderArchive(filter = 'all') {
  archiveList.innerHTML = '';
  allNews
    .filter(item => filter === 'all' || item.kind === filter)
    .forEach(item => {
      const card = document.createElement('article');
      card.className = `archive-card${item.kind === 'meeting' ? ' archive-card-meeting' : ''}${!item.image && !item.images?.length ? ' archive-card-text' : ''}`;
      card.dataset.kind = item.kind;

      let media = '';
      if (item.image) {
        media = `<div class="archive-media"><img src="${item.image}" alt="${item.title}" loading="lazy"></div>`;
      } else if (item.images?.length) {
        media = `<div class="archive-media"><img src="${item.images[0]}" alt="${item.title}" loading="lazy"></div>`;
      }

      const keypoints = item.keypoints?.length
        ? `<div class="archive-keypoints">${item.keypoints.map(point => `<span>${point}</span>`).join('')}</div>`
        : '';

      const detailsLabel = item.kind === 'meeting' ? 'Подробные итоги собрания' : 'Подробнее';
      const details = item.details
        ? `<details class="archive-details${item.kind === 'meeting' ? ' archive-details-important' : ''}"><summary>${detailsLabel} <span>+</span></summary><div class="archive-detail-content">${item.details}</div></details>`
        : '';

      card.innerHTML = `${media}<div class="archive-body"><div class="archive-meta"><span>${item.date}</span><span class="${badgeClass(item)}">${item.tag}</span></div><h2>${item.title}</h2><p>${item.text}</p>${keypoints}${details}</div>`;
      archiveList.appendChild(card);
    });
}

renderArchive();

document.querySelectorAll('.archive-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.archive-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderArchive(btn.dataset.filter);
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}
