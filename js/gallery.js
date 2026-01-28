(function () {
  const JSON_URL = 'data/gallery.json';

  const galleryRoot = document.getElementById('gallery-root');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const btnPrev = document.querySelector('.lightbox-prev');
  const btnNext = document.querySelector('.lightbox-next');

  let currentIndex = 0;
  let currentItems = [];

  /* ------------------------------
     TWORZENIE MINIATUR
  ------------------------------ */

  function createImageElement(item, index, items) {
    const img = document.createElement('img');
    const base = item.basePath;

    const src200 = `${base}-200.webp`;
    const src400 = `${base}-400.webp`;
    const src800 = `${base}-800.webp`;
    const full1600 = `${base}-1600.webp`;

    img.src = src400;
    img.srcset = `${src200} 200w, ${src400} 400w, ${src800} 800w`;
    img.sizes = '(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 25vw';
    img.alt = item.alt || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.className = 'gallery-item__img';

    img.dataset.full = full1600;
    img.dataset.caption = item.alt || '';

    img.addEventListener('load', () => {
      img.dataset.loaded = 'true';
    });

    img.addEventListener('click', () => {
      openLightbox(full1600, item.alt, index, items);
    });

    return img;
  }

  /* ------------------------------
     TWORZENIE SEKCJI KATEGORII
  ------------------------------ */

  function createCategorySection(category) {
    const section = document.createElement('section');
    section.className = 'gallery-section';
    section.id = category.id;

    const heading = document.createElement('h2');
    heading.className = 'gallery-section__title';
    heading.textContent = category.title;

    const grid = document.createElement('div');
    grid.className = 'gallery-grid';

    const items = category.items;

    items.forEach((item, index) => {
      const figure = document.createElement('figure');
      figure.className = 'gallery-item';

      const img = createImageElement(item, index, items);
      figure.appendChild(img);

      grid.appendChild(figure);
    });

    //section.appendChild(heading);
    section.appendChild(grid);

    return section;
  }

  /* ------------------------------
     RENDEROWANIE GALERII
  ------------------------------ */

  function renderGallery(data) {
    galleryRoot.innerHTML = '';

    if (!data || !Array.isArray(data.categories)) return;

    data.categories.forEach(category => {
      if (!category.items || category.items.length === 0) return;
      const section = createCategorySection(category);
      galleryRoot.appendChild(section);
    });
  }

  /* ------------------------------
     LIGHTBOX — OTWARCIE
  ------------------------------ */

  function openLightbox(src, caption, index, items) {
    currentIndex = index;
    currentItems = items;

    lightboxImg.src = src;
    lightboxImg.alt = caption || '';
    lightboxCaption.textContent = caption || '';

    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.classList.add('lightbox--visible');
    document.body.style.overflow = 'hidden';
  }

  /* ------------------------------
     LIGHTBOX — ZAMKNIĘCIE
  ------------------------------ */

  function closeLightbox() {
    lightbox.classList.remove('lightbox--visible');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    lightboxCaption.textContent = '';
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  /* ------------------------------
     NAWIGACJA — NASTĘPNE / POPRZEDNIE
  ------------------------------ */

  function showNext() {
    if (!currentItems.length) return;

    currentIndex = (currentIndex + 1) % currentItems.length;

    const item = currentItems[currentIndex];
    const full = `${item.basePath}-1600.webp`;

    lightboxImg.src = full;
    lightboxCaption.textContent = item.alt || '';
  }

  function showPrev() {
    if (!currentItems.length) return;

    currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;

    const item = currentItems[currentIndex];
    const full = `${item.basePath}-1600.webp`;

    lightboxImg.src = full;
    lightboxCaption.textContent = item.alt || '';
  }

  btnNext.addEventListener('click', showNext);
  btnPrev.addEventListener('click', showPrev);

  /* ------------------------------
     OBSŁUGA KLAWIATURY
  ------------------------------ */

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('lightbox--visible')) return;

    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'Escape') closeLightbox();
  });

  /* ------------------------------
     POBIERANIE JSON I START
  ------------------------------ */

  fetch(JSON_URL)
    .then(res => {
      if (!res.ok) throw new Error('Nie udało się pobrać gallery.json');
      return res.json();
    })
    .then(data => {
      renderGallery(data);
    })
    .catch(err => {
      console.error(err);
      galleryRoot.textContent = 'Nie udało się załadować galerii.';
    });

    // UDOSTĘPNIAMY FUNKCJĘ DLA MINI-GALERII
      window.openLightbox = openLightbox;

})();