// Thrivelink Health — Shared JavaScript
function $(id) { return document.getElementById(id); }

// === TOAST ===
function showToast(message, type='info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  const icons = { success: '<i class="fas fa-check"></i>', error: '<i class="fas fa-times"></i>', info: '<i class="fas fa-info"></i>' };
  toast.innerHTML = icons[type] + '<span>' + message + '</span>';
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

// === CHAT ===
function toggleChat() {
  const widget = document.getElementById('chatWidget');
  if (widget) widget.classList.toggle('open');
}

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const body = document.getElementById('chatBody');
  if (!input || !body) return;
  const msg = input.value.trim();
  if (!msg) return;

  body.innerHTML += '<div class="chat-msg user">' + escapeHtml(msg) + '</div>';
  input.value = '';
  body.scrollTop = body.scrollHeight;

  setTimeout(() => {
    const replies = [
      "Thank you for reaching out! Our team will assist you shortly.",
      "For urgent medical emergencies, please use the emergency feature in our app or call emergency services directly.",
      "You can also email us once our contact details are updated. Stay tuned!",
      "Would you like to know more about our services or the Thrivelink platform?"
    ];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    body.innerHTML += '<div class="chat-msg bot">' + reply + '</div>';
    body.scrollTop = body.scrollHeight;
  }, 1000);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// === CONTACT FORM ===
function submitContactForm(e) {
  e.preventDefault();
  const name = document.getElementById('cf-name');
  const email = document.getElementById('cf-email');
  const message = document.getElementById('cf-message');
  if (!name || !email || !message) return;

  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    showToast('Please fill all required fields', 'error'); return;
  }

  const submissions = JSON.parse(localStorage.getItem('thrivelink_contacts') || '[]');
  submissions.push({
    name: name.value.trim(),
    email: email.value.trim(),
    phone: document.getElementById('cf-phone') ? document.getElementById('cf-phone').value : '',
    subject: document.getElementById('cf-subject') ? document.getElementById('cf-subject').value : 'General Inquiry',
    message: message.value.trim(),
    date: new Date().toISOString()
  });
  localStorage.setItem('thrivelink_contacts', JSON.stringify(submissions));
  showToast('Message received! We will get back to you soon.', 'success');
  e.target.reset();
}

// === CONTACT NOT AVAILABLE ===
function contactNotAvailable(type) {
  showToast('Contact details not yet provided. Will be updated soon.', 'info');
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
