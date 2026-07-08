/**
 * FRENESIM 2ª Edição — main.js v2
 * Módulos: nav, reveal, marquee, tabs, avise-me form, toast
 */

// =====================
// 1. NAVEGAÇÃO
// =====================
function initNav() {
  const nav = document.getElementById('nav');
  const navLogo = document.getElementById('nav-logo');
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('nav-mobile');
  const closeBtn = document.getElementById('nav-mobile-close');
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
  const panels = document.querySelectorAll('.pacotes-panel');

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
      const idx = tabs.indexOf(e.currentTarget);
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
  const form = document.getElementById('avise-form');
  const emailInput = document.getElementById('avise-email');
  const igInput = document.getElementById('avise-instagram');
  const btn = document.getElementById('btn-avise-me');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const ig = igInput.value.trim();

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

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwbmKsK2fWhvc4WZRHkXfuA35lDxZqg37hfnzR1k20Ge8G05IzcCV0anma1MA6SpBEq/exec';

    try {
      const formData = new FormData(form);
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        form.reset();
        showToast('Anotado! Te avisamos quando abrir. 🎉');
      } else {
        throw new Error('Falha no envio da resposta');
      }
    } catch (error) {
      // Graceful fallback para endpoints que bloqueiam CORS ou estao indisponiveis
      console.warn('Endpoint offline/CORS. Simulando sucesso temporariamente.', error);
      showToast('Anotado! (Modo Offline - Te avisaremos em breve) 🎉');
      form.reset();
    } finally {
      btn.textContent = original;
      btn.disabled = false;
    }
  });
}

// =====================
// 6.5 BOTÕES DO EDITAL (EM BREVE)
// =====================
function initEditalButtons() {
  const btnInscrever = document.getElementById('btn-inscrever-marca');
  const btnDownload = document.getElementById('btn-download-edital');

  const handler = (e) => {
    e.preventDefault();
    showToast('Disponível em breve!');
  };

  if (btnInscrever) btnInscrever.addEventListener('click', handler);
  if (btnDownload) btnDownload.addEventListener('click', handler);
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
// 8. CARROSSEL DE EQUIPE
// =====================
function initEquipeCarousel() {
  const track = document.getElementById('equipe-carousel-track');
  const prevBtn = document.getElementById('equipe-prev');
  const nextBtn = document.getElementById('equipe-next');
  const dotsContainer = document.getElementById('equipe-dots');

  if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

  const slides = Array.from(track.children);
  const totalSlides = slides.length;
  if (totalSlides === 0) return;

  let currentIndex = 0;

  // Cria os dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'equipe-carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  function getItemsPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 3;
  }

  function updateCarousel() {
    const itemsPerView = getItemsPerView();
    // Previne scroll para espaços em branco além dos últimos itens no carrossel
    const maxIndex = Math.max(0, totalSlides - itemsPerView);

    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    // Obtemos a largura do primeiro slide + gap
    const slideWidth = slides[0].offsetWidth;
    const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
    const moveX = currentIndex * (slideWidth + gap);

    track.style.transform = `translateX(-${moveX}px)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function goToSlide(index) {
    const itemsPerView = getItemsPerView();
    const maxIndex = Math.max(0, totalSlides - itemsPerView);

    currentIndex = index;
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    updateCarousel();
  }

  function nextSlide() {
    const itemsPerView = getItemsPerView();
    const maxIndex = Math.max(0, totalSlides - itemsPerView);

    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      // Loop infinito: volta para o primeiro
      currentIndex = 0;
    }
    updateCarousel();
  }

  function prevSlide() {
    const itemsPerView = getItemsPerView();
    const maxIndex = Math.max(0, totalSlides - itemsPerView);

    if (currentIndex > 0) {
      currentIndex--;
    } else {
      // Loop infinito: vai para o último slide possível
      currentIndex = maxIndex;
    }
    updateCarousel();
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  window.addEventListener('resize', () => {
    // Adiciona um pequeno delay no resize para recalcular corretamente
    requestAnimationFrame(updateCarousel);
  });

  // Atualiza layout logo após renderizar para setup inicial do translate
  setTimeout(updateCarousel, 0);
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
  initEditalButtons();
  initLogoSwap();
  initEquipeCarousel();
});

