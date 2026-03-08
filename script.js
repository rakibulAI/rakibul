/* =============================================
   RAKIBUL HASAN ANTOR — Website Script
   =============================================
   HOW TO CHANGE YOUR STATS:
   Edit the numbers in the STATS CONFIG section below.
   ============================================= */

// ============================================
// ⚙️  STATS CONFIG — Change your numbers here
// ============================================
const STATS = {
  youtube:   25000,    // YouTube Subscribers
  github:    50,       // GitHub Repositories
  facebook:  100000,   // Facebook Followers
  appUsers:  5000      // App / Website Users
};
// ============================================

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- Mobile menu toggle ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ---- Number format helper ----
function formatNum(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M+';
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K+';
  return n + '+';
}

// ---- Animated counter ----
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = formatNum(Math.floor(start));
  }, 16);
}

// ---- Assign stat IDs ----
const statMap = [
  { id: 'stat-yt',  value: STATS.youtube },
  { id: 'stat-gh',  value: STATS.github },
  { id: 'stat-fb',  value: STATS.facebook },
  { id: 'stat-app', value: STATS.appUsers },
];

// ---- Content section display stats ----
document.getElementById('cs-yt').textContent = formatNum(STATS.youtube);
document.getElementById('cs-fb').textContent = formatNum(STATS.facebook);

// ---- Intersection Observer — fade-up & counter trigger ----
const faderObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

// Apply fade-up to sections
document.querySelectorAll(
  '.hero-text, .hero-card, .stat-card, .content-feature, .content-visual, .service-card, .contact-section .section-label, .contact-section .section-title, .contact-section .section-sub, .contact-btns'
).forEach(el => {
  el.classList.add('fade-up');
  faderObserver.observe(el);
});

// ---- Stats counter trigger via observer ----
let statsTriggered = false;
const statsSection = document.getElementById('stats');
const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !statsTriggered) {
    statsTriggered = true;
    statMap.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) animateCounter(el, item.value);
    });
  }
}, { threshold: 0.2 });
if (statsSection) statsObserver.observe(statsSection);

// ---- Stagger children delays ----
document.querySelectorAll('.stats-grid .stat-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
});
document.querySelectorAll('.services-grid .service-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.08}s`;
});
document.querySelectorAll('.content-feature').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.12}s`;
});

// ---- Smooth active link highlight ----
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.getAttribute('id');
    }
  });
  navAs.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? '#0d0d0d' : '';
  });
});

// ---- Hero text entrance animation (CSS-driven) ----
document.querySelector('.hero-badge').style.animation = 'fadeInDown 0.8s ease 0.1s both';
document.querySelector('.hero-headline').style.animation = 'fadeInDown 0.8s ease 0.25s both';
document.querySelector('.hero-sub').style.animation = 'fadeInDown 0.8s ease 0.4s both';
document.querySelector('.hero-btns').style.animation = 'fadeInDown 0.8s ease 0.55s both';
document.querySelector('.hero-card').style.animation = 'fadeInRight 0.9s ease 0.35s both';

// Inject keyframes
const kf = document.createElement('style');
kf.textContent = `
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(30px); }
  to   { opacity: 1; transform: translateX(0); }
}
`;
document.head.appendChild(kf);
  
