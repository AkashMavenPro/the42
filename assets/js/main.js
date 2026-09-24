// THE 42 @ Middleton — site interactions
// Mobile nav toggle, scroll-aware header, scroll-reveal animation, accordion.

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollNavbar();
  initScrollReveal();
  initFeaturesAccordion();
});

function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const iconOpen = document.getElementById('iconOpen');
  const iconClose = document.getElementById('iconClose');

  if (!menuBtn || !mobileMenu || !iconOpen || !iconClose) return;

  menuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    iconOpen.classList.toggle('hidden', isHidden);
    iconClose.classList.toggle('hidden', !isHidden);
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      iconOpen.classList.remove('hidden');
      iconClose.classList.add('hidden');
    });
  });
}

function initScrollNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const ctaNav = document.getElementById('ctaNav');
  const hero = document.getElementById('hero');

  if (!navbar || !navLinks || !ctaNav || !hero) return;

  const heroHeight = hero.offsetHeight;

  const onScroll = () => {
    const scrolled = window.scrollY > heroHeight - 100;
    navbar.classList.toggle('bg-white/95', scrolled);
    navbar.classList.toggle('backdrop-blur', scrolled);
    navbar.classList.toggle('shadow-sm', scrolled);
    navLinks.classList.toggle('text-white', !scrolled);
    navLinks.classList.toggle('text-ink', scrolled);
    ctaNav.classList.toggle('text-white', !scrolled);
    ctaNav.classList.toggle('text-ink', scrolled);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
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

function initFeaturesAccordion() {
  const allDetails = document.querySelectorAll('#features details');
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
