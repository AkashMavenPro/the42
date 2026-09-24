// THE 42 @ Middleton — page 2 interactions
// Mobile nav toggle, scroll-reveal animation, experience accordion, amenity carousel.

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollReveal();
  initExperienceAccordion();
  initAmenityCarousel();
});

function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const iconClose = document.getElementById('iconClose');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  if (iconClose) {
    iconClose.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  }

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });
}

function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => io.observe(el));
}

function initExperienceAccordion() {
  const allDetails = document.querySelectorAll('#experience details');
  allDetails.forEach((d) => {
    d.addEventListener('toggle', () => {
      if (d.open) {
        allDetails.forEach((other) => {
          if (other !== d) other.open = false;
        });
      }
    });
  });
}

function initAmenityCarousel() {
  const root = document.getElementById('amenityCarousel');
  if (!root) return;

  const slides = root.querySelectorAll('.carousel-slide');
  const prevBtn = root.querySelector('.carousel-prev');
  const nextBtn = root.querySelector('.carousel-next');
  let index = 0;

  const show = (i) => {
    slides.forEach((s, si) => s.classList.toggle('active', si === i));
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      index = (index - 1 + slides.length) % slides.length;
      show(index);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      index = (index + 1) % slides.length;
      show(index);
    });
  }

  show(index);
}
