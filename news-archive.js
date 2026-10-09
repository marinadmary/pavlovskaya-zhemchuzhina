const archiveList = document.querySelector('#archiveList');
const allNews = [...(window.SITE_NEWS || [])].sort((a,b) => b.sort.localeCompare(a.sort));

function badgeClass(item) {
  if (item.kind === 'meeting') return 'archive-badge archive-badge-meeting';
  if (item.kind === 'vote') return 'archive-badge archive-badge-vote';
  return 'archive-badge';
}

function getImages(item) {
  if (Array.isArray(item.images) && item.images.length) return item.images;
  if (item.image) return [item.image];
  return [];
}

function galleryMarkup(item, images) {
  if (images.length <= 1) return '';

  return `
    <div class="archive-gallery-block">
      <div class="archive-gallery-title">
        <strong>Фотографии</strong>
        <span>${images.length} фото</span>
      </div>
      <div class="archive-gallery">
        ${images.map((src, index) => `
          <button class="archive-gallery-item" type="button"
                  data-lightbox-src="${src}"
                  data-lightbox-alt="${item.title} — фото ${index + 1}"
                  aria-label="Открыть фото ${index + 1} крупно">
            <img src="${src}" alt="${item.title} — фото ${index + 1}" loading="lazy">
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function renderArchive(filter = 'all') {
  archiveList.innerHTML = '';

  allNews
    .filter(item => filter === 'all' || item.kind === filter)
    .forEach(item => {
      const images = getImages(item);
      const card = document.createElement('article');
      card.className = `archive-card${item.kind === 'meeting' ? ' archive-card-meeting' : ''}${!images.length ? ' archive-card-text' : ''}`;
      card.dataset.kind = item.kind;

      let media = '';
      if (images.length) {
        const count = images.length > 1
          ? `<span class="archive-photo-count">${images.length} фото</span>`
          : '';

        media = `
          <div class="archive-media">
            <button class="archive-cover-button" type="button"
                    data-lightbox-src="${images[0]}"
                    data-lightbox-alt="${item.title}"
                    aria-label="Открыть фотографию крупно">
              <img src="${images[0]}" alt="${item.title}" loading="lazy">
              ${count}
            </button>
          </div>
        `;
      }

      const keypoints = item.keypoints?.length
        ? `<div class="archive-keypoints">${item.keypoints.map(point => `<span>${point}</span>`).join('')}</div>`
        : '';

      const detailsLabel = item.kind === 'meeting' ? 'Подробные итоги собрания' : 'Подробнее';
      const gallery = galleryMarkup(item, images);

      const details = (item.details || gallery)
        ? `<details class="archive-details${item.kind === 'meeting' ? ' archive-details-important' : ''}">
             <summary>${detailsLabel} <span>+</span></summary>
             <div class="archive-detail-content">
               ${item.details || ''}
               ${gallery}
             </div>
           </details>`
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

// -----------------------------------------------------
// ФОТОГАЛЕРЕЯ АРХИВА
// Для любой будущей новости с images: [...] галерея
// появится автоматически внутри раскрытого блока.
// -----------------------------------------------------
const lightbox = document.querySelector('#archiveLightbox');
const lightboxImage = lightbox?.querySelector('.archive-lightbox-image');
const lightboxClose = lightbox?.querySelector('.archive-lightbox-close');

function openLightbox(src, alt = '') {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.hidden = false;
  document.body.classList.add('lightbox-open');
  lightboxClose?.focus();
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.hidden = true;
  lightboxImage.src = '';
  document.body.classList.remove('lightbox-open');
}

archiveList.addEventListener('click', event => {
  const target = event.target.closest('[data-lightbox-src]');
  if (!target) return;
  openLightbox(target.dataset.lightboxSrc, target.dataset.lightboxAlt || '');
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', event => {
  if (event.target === lightbox || event.target.classList.contains('archive-lightbox-backdrop')) {
    closeLightbox();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
});
