const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

const filterButtons = document.querySelectorAll('.filter-btn');
const skillCards = document.querySelectorAll('.skill-card');
const emptyMessage = document.getElementById('filterEmpty');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => item.classList.remove('selected'));
  button.classList.add('selected');
  const filter = button.dataset.filter;
  let visible = 0;
  skillCards.forEach(card => {
    const show = filter === 'all' || card.dataset.category === filter;
    card.hidden = !show;
    if (show) visible++;
  });
  emptyMessage.hidden = visible !== 0;
}));

// Gentle pointer tilt on the hero artwork; disabled for touch and reduced-motion users.
const heroArt = document.getElementById('heroArt');
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  heroArt.addEventListener('pointermove', event => {
    const rect = heroArt.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroArt.style.transform = `rotateY(${x * 5}deg) rotateX(${-y * 4}deg)`;
  });
  heroArt.addEventListener('pointerleave', () => heroArt.style.transform = '');
}

// Reveal sections as they enter the viewport.
const revealTargets = document.querySelectorAll('.section-heading, .about-main, .fact-card, .skill-card, .journey-panel, .market-card, .empty-project, .gallery-tile, .certificate-note, .contact-box');
revealTargets.forEach(item => item.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(item => observer.observe(item));
} else {
  revealTargets.forEach(item => item.classList.add('visible'));
}
