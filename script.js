/* ===========================================
   BEAUTILLIS — Interações
   =========================================== */

(function () {
  'use strict';

  // === HEADER SCROLLED ===
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // === MOBILE MENU ===
  const menuBtn = document.getElementById('menuBtn');
  let mobileNav = null;

  const buildMobileNav = () => {
    mobileNav = document.createElement('div');
    mobileNav.className = 'nav-mobile';
    mobileNav.innerHTML = `
      <a href="#sobre">Sobre</a>
      <a href="#servicos">Serviços</a>
      <a href="#resultados">Resultados</a>
      <a href="#contato">Contato</a>
      <a href="https://wa.me/5584981672323?text=Olá!%20Gostaria%20de%20agendar%20uma%20avaliação." class="btn btn-gold" style="margin-top:18px;padding:14px 32px;">Agendar</a>
    `;
    document.body.appendChild(mobileNav);
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  };

  menuBtn.addEventListener('click', () => {
    if (!mobileNav) buildMobileNav();
    menuBtn.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  // === REVEAL ON SCROLL ===
  const revealTargets = [
    '.section-tag', '.section-title', '.section-lead',
    '.stat', '.card-serv', '.ba-item', '.video-card',
    '.difer-item', '.contato-item', '.contato-map',
    '.cta-final h2', '.cta-final p', '.cta-final a',
    '.hero-badges', '.hero-ctas', '.hero-sub',
  ];
  const all = document.querySelectorAll(revealTargets.join(','));
  all.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  all.forEach(el => io.observe(el));

  // === CONTADOR ANIMADO ===
  const counters = document.querySelectorAll('.counter');
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(eased * target);
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
  };

  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => counterIO.observe(c));

  // === ANO FOOTER ===
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // === PAUSE VÍDEOS OFFSCREEN (economia de bateria no mobile) ===
  const videos = document.querySelectorAll('video');
  const videoIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.play().catch(() => {});
      } else {
        e.target.pause();
      }
    });
  }, { threshold: 0.25 });
  videos.forEach(v => videoIO.observe(v));

  // === FECHAR MENU AO REDIMENSIONAR ===
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && mobileNav && mobileNav.classList.contains('open')) {
      menuBtn.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

})();
