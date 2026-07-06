// Thrivelink Health — Shared JavaScript
function $(id) { return document.getElementById(id); }

// === TOAST ===
function showToast(message, type='info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  toast.innerHTML = '<span>' + icons[type] + '</span><span>' + message + '</span>';
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity='0'; toast.style.transform='translateX(20px)'; setTimeout(()=>toast.remove(),300); }, 4000);
}

// === MOBILE NAV ===
function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  const overlay = document.getElementById('mobileNavOverlay');
  if (nav && overlay) {
    nav.classList.toggle('open');
    overlay.classList.toggle('open');
  }
}

// === HEADER SCROLL ===
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (header) {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 2px 20px rgba(11,61,145,0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
  }
});

// === SLIDESHOW ===
let currentSlide = 0;
let slideInterval;

function initSlideshow() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slide-dot');
  if (slides.length === 0) return;

  function showSlide(n) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    if (slides[n]) slides[n].classList.add('active');
    if (dots[n]) dots[n].classList.add('active');
    currentSlide = n;
  }

  window.goToSlide = function(n) {
    clearInterval(slideInterval);
    showSlide(n);
    startAutoSlide();
  };

  window.nextSlide = function() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  };

  window.prevSlide = function() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  };

  function startAutoSlide() {
    slideInterval = setInterval(window.nextSlide, 5000);
  }

  showSlide(0);
  startAutoSlide();
}

// === INTERSECTION OBSERVER ===
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.service-card, .platform-feature, .contact-card, .preview-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  initSlideshow();
  initAnimations();
});
