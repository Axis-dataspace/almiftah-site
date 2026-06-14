// ============================================================
// AL-MIFTAH SCHOOL — Shared JavaScript (all pages)
// ============================================================

// === STICKY HEADER ===
(function () {
  const header = document.getElementById('header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

// === MOBILE HAMBURGER ===
(function () {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (!btn || !nav) return;
  const spans = btn.querySelectorAll('span');

  function openMenu() {
    nav.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    spans[0].style.cssText = 'transform:rotate(45deg) translate(5px,5px)';
    spans[1].style.cssText = 'opacity:0;width:0';
    spans[2].style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)';
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    spans.forEach(s => s.style.cssText = '');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () => nav.classList.contains('open') ? closeMenu() : openMenu());

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
})();

// === SET ACTIVE NAV LINK (by current page filename) ===
(function () {
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = (link.getAttribute('href') || '').toLowerCase();
    const isActive = (page === 'index.html' || page === '') ? href === 'index.html' : href.startsWith(page.split('.')[0]);
    link.classList.toggle('active', isActive);
  });
})();

// === HERO SLIDER (home page only) ===
(function () {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.getElementById('heroPrev');
  const nextBtn = document.getElementById('heroNext');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current] && dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current] && dots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }
  function startTimer() { clearInterval(timer); timer = setInterval(next, 6000); }

  nextBtn && nextBtn.addEventListener('click', () => { next(); startTimer(); });
  prevBtn && prevBtn.addEventListener('click', () => { prev(); startTimer(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startTimer(); }));

  startTimer();
})();

// === ANIMATED COUNTERS ===
(function () {
  const numbers = document.querySelectorAll('.stat-number');
  if (!numbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1800;
      const step = target / (duration / 16);
      let count = 0;
      const tick = () => {
        count = Math.min(count + step, target);
        el.textContent = Math.floor(count).toLocaleString();
        if (count < target) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  numbers.forEach(n => observer.observe(n));
})();

// === SCROLL REVEAL ===
(function () {
  const targets = document.querySelectorAll(
    '.school-card, .why-card, .testimonial-card, .news-card, .news-full-card, ' +
    '.accred-item, .step, .about-feature, .event-item, .value-card, .leader-card, ' +
    '.admit-step-card, .req-card, .vm-card'
  );
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, (parseInt(entry.target.dataset.delay) || 0) * 80);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    el.dataset.delay = i % 6;
    observer.observe(el);
  });
})();

// === BACK TO TOP (appears at 50% of page height) ===
(function () {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  function checkScroll() {
    const half = (document.body.scrollHeight - window.innerHeight) / 2;
    btn.classList.toggle('visible', window.scrollY >= half);
  }
  window.addEventListener('scroll', checkScroll, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// === CONTACT FORM ===
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent! We\'ll be in touch soon.';
    btn.disabled = true;
    btn.style.background = '#16a34a';
    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
    }, 4000);
  });
})();

// === FAQ ACCORDION (admissions page) ===
(function () {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();
