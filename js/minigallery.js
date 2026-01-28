<script>
  (function () {
    const JSON_URL = 'data/gallery.json';
    const root = document.getElementById('gallery-root-index');

    if (!root) return;

    fetch(JSON_URL)
      .then(res => res.json())
      .then(data => {
        if (!data || !Array.isArray(data.categories)) return;

        const allItems = data.categories.flatMap(cat => cat.items);

        // 🔥 KOLEJNOŚĆ DEFINIUJESZ TUTAJ
        const order = [
          "img/produkty-lifestyle/ZP-produkty-lifestyle-26",
          "img/produkty-lifestyle/ZP-produkty-lifestyle-36",
          "img/produkty-lifestyle/ZP-produkty-lifestyle-15",
          "img/produkty-lifestyle/ZP-produkty-lifestyle-21",
          "img/produkty-lifestyle/ZP-produkty-lifestyle-44",
          "img/biznesowe/ZP-biznesowe-1",
          "img/produkty-lifestyle/ZP-produkty-lifestyle-34",
          "img/biznesowe/ZP-biznesowe-18",
          "img/biznesowe/ZP-biznesowe-22",
          "img/portrety/ZP-portrety-17",
          "img/portrety/ZP-portrety-15",
          "img/produkty-lifestyle/ZP-produkty-lifestyle-7",
        ];

        // 🔥 MAPOWANIE — KOLEJNOŚĆ 1:1 Z LISTY "order"
        const selected = order
          .map(path => allItems.find(item => item.basePath === path))
          .filter(Boolean);

        const grid = document.createElement('div');
        grid.className = 'gallery-grid';

        selected.forEach((item, index) => {
          const figure = document.createElement('figure');
          figure.className = 'gallery-item';

          const img = document.createElement('img');
          const base = item.basePath;

          img.src = `${base}-400.webp`;
          img.srcset = `${base}-200.webp 200w, ${base}-400.webp 400w, ${base}-800.webp 800w`;
          img.sizes = '(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 25vw';
          img.alt = item.alt || '';
          img.loading = 'lazy';
          img.decoding = 'async';
          img.className = 'gallery-item__img';

          img.dataset.full = `${base}-1600.webp`;
          img.dataset.caption = item.alt || '';

          img.addEventListener('load', () => {
            img.dataset.loaded = 'true';
          });

          img.addEventListener('click', () => {
            openLightbox(img.dataset.full, img.dataset.caption, index, selected);
          });

          figure.appendChild(img);
          grid.appendChild(figure);
        });

        root.appendChild(grid);
      });
  })();
</script>