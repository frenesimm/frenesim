/**
 * FRENESIM 2ª Edição — main.js v2
 * Módulos: nav, reveal, marquee, tabs, avise-me form, toast
 */

// =====================
// 1. NAVEGAÇÃO
// =====================
function initNav() {
  const nav      = document.getElementById('nav');
  const navLogo  = document.getElementById('nav-logo');
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('nav-mobile');
  const closeBtn  = document.getElementById('nav-mobile-close');
  const mobileLinks = document.querySelectorAll('.nav-mobile-link');

  // Scroll: adiciona classe .scrolled
  const onScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger toggle
  function openMenu() {
    navMobile.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
    closeBtn.focus();
  }
  function closeMenu() {
    navMobile.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.focus();
  }

  hamburger.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  // Fecha ao clicar em link
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fecha com ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMobile.classList.contains('open')) closeMenu();
  });
}

// =====================
// 2. SCROLL REVEAL
// =====================
function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

// =====================
// 3. MARQUEE — duplica conteúdo
// =====================
function initMarquee() {
  const track = document.getElementById('marquee-track');
  if (!track) return;
  // já está duplicado no HTML; sem necessidade de JS adicional
}

// =====================
// 4. TABS DO EDITAL
// =====================
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels  = document.querySelectorAll('.pacotes-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      // Reset todos
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      panels.forEach(p => {
        p.classList.remove('active');
        p.hidden = true;
      });

      // Ativa o selecionado
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const activePanel = document.getElementById(`panel-${target}`);
      if (activePanel) {
        activePanel.classList.add('active');
        activePanel.hidden = false;

        // Re-dispara animações dos cards
        activePanel.querySelectorAll('.reveal').forEach(el => {
          el.classList.remove('visible');
          setTimeout(() => el.classList.add('visible'), 50);
        });
      }
    });

    // Keyboard: Arrow keys para trocar tabs
    btn.addEventListener('keydown', (e) => {
      const tabs = [...tabBtns];
      const idx  = tabs.indexOf(e.currentTarget);
      if (e.key === 'ArrowRight') {
        tabs[(idx + 1) % tabs.length].focus();
        tabs[(idx + 1) % tabs.length].click();
      }
      if (e.key === 'ArrowLeft') {
        tabs[(idx - 1 + tabs.length) % tabs.length].focus();
        tabs[(idx - 1 + tabs.length) % tabs.length].click();
      }
    });
  });
}

// =====================
// 5. TOAST
// =====================
function showToast(msg, duration = 3500) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// =====================
// 6. FORMULÁRIO AVISE-ME
// =====================
function initAviseme() {
  const form      = document.getElementById('avise-form');
  const emailInput = document.getElementById('avise-email');
  const igInput   = document.getElementById('avise-instagram');
  const btn       = document.getElementById('btn-avise-me');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const ig    = igInput.value.trim();

    if (!email && !ig) {
      showToast('Preencha e-mail ou Instagram.');
      emailInput.focus();
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('E-mail inválido.');
      emailInput.focus();
      return;
    }

    // Estado de loading
    const original = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    // TODO: substituir por fetch real (Formspree, n8n, webhook, etc.)
    // Exemplo: await fetch('https://formspree.io/f/SEU_ID', { method:'POST', body: new FormData(form) })
    await new Promise(r => setTimeout(r, 800));

    btn.textContent = original;
    btn.disabled = false;
    form.reset();
    showToast('Anotado! Te avisamos quando abrir. 🎉');
  });
}

// =====================
// 7. LOGO NA NAV — troca para versão colorida ao scroll
//    (hover efeito visual)
// =====================
function initLogoSwap() {
  const heroLogo = document.getElementById('hero-logo');
  if (!heroLogo) return;

  // Logo branca no header sobre fundo escuro: mantida
  // Apenas anima entrada do hero logo
  heroLogo.style.transition = 'opacity 0.5s ease';
}

// =====================
// INIT
// =====================
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initMarquee();
  initTabs();
  initAviseme();
  initLogoSwap();
});
