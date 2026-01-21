document.addEventListener('DOMContentLoaded', () => {
  const items = Array.from(document.querySelectorAll('#gallery .item'));
  const thumbs = items.map(item => item.querySelector('img'));
  const images = thumbs.map(img => ({ src: img.src, caption: img.alt }));

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const captionEl = document.getElementById('caption');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const btnClose = document.getElementById('btnClose');
  const lightboxInner = document.getElementById('lightboxInner');

  let currentIndex = 0;

  // Reveal-on-scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '100px 0px', threshold: 0.01 });

  items.forEach(item => observer.observe(item));

  // Lightbox open
  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      currentIndex = index;
      updateLightbox();
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  function updateLightbox() {
    lightboxImg.src = images[currentIndex].src;
    captionEl.textContent = images[currentIndex].caption || '';
  }

  function changeImage(direction) {
    currentIndex = (currentIndex + direction + images.length) % images.length;
    updateLightbox();
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }

  btnPrev.addEventListener('click', e => { e.stopPropagation(); changeImage(-1); });
  btnNext.addEventListener('click', e => { e.stopPropagation(); changeImage(1); });
  btnClose.addEventListener('click', e => { e.stopPropagation(); closeLightbox(); });

  lightboxInner.addEventListener('click', e => e.stopPropagation());
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', e => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') changeImage(-1);
      else if (e.key === 'ArrowRight') changeImage(1);
    }
  });
});


//oferta animacja boksów

document.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.price-box');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animacja tylko raz
      }
    });
  }, { threshold: 0.1, rootMargin: '50px' });

  boxes.forEach(box => observer.observe(box));
});


//kontak ikony mail i whatsapp

  document.addEventListener("DOMContentLoaded", () => {
    /* E-MAIL */
    const user = "zperspektywyjoanny";
    const domain = "outlook.com";
    const subject = "Zapytanie";
    const body = "Dzień dobry,%0Aproszę o informację ";

    const mailLink = `mailto:${user}@${domain}?subject=${subject}&body=${body}`;
    document.getElementById("safe-mail").setAttribute("href", mailLink);

    /* WHATSAPP */
    const country = "48";
    const number = "785534524";
    const message = "Dzień%20dobry.%20Proszę%20o%20informację%20";

    const waLink = `https://wa.me/${country}${number}?text=${message}`;
    document.getElementById("safe-whatsapp").setAttribute("href", waLink);
  });


//oferta

document.addEventListener("DOMContentLoaded", () => {

  const emailUser = "zperspektywyjoanny";
  const emailDomain = "outlook.com";
  const waCountry = "48";
  const waNumber = "785534524";

  document.querySelectorAll(".contact-icons").forEach(box => {

    const subject = box.dataset.subject || "";
    const message = box.dataset.message || "";

    const mailLink =
      `mailto:${emailUser}@${emailDomain}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Dzień dobry,\n" + message)}`;

    const waLink =
      `https://wa.me/${waCountry}${waNumber}?text=${encodeURIComponent(message)}`;

    const mailEl = box.querySelector(".contact-icon--mail");
    const waEl = box.querySelector(".contact-icon--whatsapp");

    if (mailEl) mailEl.href = mailLink;
    if (waEl) waEl.href = waLink;
  });

});


// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Simple lightbox
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');

document.querySelectorAll('.gallery img').forEach(el => {
  el.addEventListener('click', () => {
    const full = el.dataset.full || el.src;
    lbImg.src = full;
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lb.hidden = true;
  lbImg.src = '';
  document.body.style.overflow = '';
}

lb.addEventListener('click', (e) => {
  // close when clicking backdrop or close button
  if (e.target === lb || e.target.classList.contains('lightbox-close')) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !lb.hidden) closeLightbox();
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});




//kontakt, form, info o tym co się wykonało
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { "Accept": "application/json" },
        redirect: "manual"
      });

      if (response.type === "opaqueredirect" || response.ok) {
        status.textContent = "Dziękuję! Formularz został wysłany. Odpowiem w ciągu 3 dni.";
        status.className = "form-status form-status--success form-status--visible";
        form.reset();
      } else {
        status.textContent = "Coś poszło nie tak. Spróbuj ponownie.";
        status.className = "form-status form-status--error form-status--visible";
      }

    } catch (error) {
      status.textContent = "Nie udało się wysłać wiadomości.";
      status.className = "form-status form-status--error form-status--visible";
    }
  });
});