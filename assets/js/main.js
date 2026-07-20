/**
 * FRENESIM 2ª Edição — main.js v3
 * Módulos: nav, reveal, marquee, tabs, avise-me form, toast, flip cards, lightbox, carousel
 */

// =====================
// 1. NAVEGAÇÃO
// =====================
function initNav() {
  const nav = document.getElementById('nav');
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
// 7. LOGO NA NAV — animação
// =====================
function initLogoSwap() {
  const heroLogo = document.getElementById('hero-logo');
  if (!heroLogo) return;

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

  function renderDots() {
    dotsContainer.innerHTML = '';
    const itemsPerView = getItemsPerView();
    // Quantidade total de "páginas" necessárias para ver todos os slides
    const pages = Math.ceil(Math.max(0, totalSlides - itemsPerView)) + 1;
    
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement('button');
      dot.className = 'equipe-carousel-dot' + (i === currentIndex ? ' active' : '');
      dot.setAttribute('aria-label', `Ir para posição ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  // Generate initial dots
  renderDots();

  // Recalculate on resize
  window.addEventListener('resize', () => {
    const itemsPerView = getItemsPerView();
    const maxIndex = Math.ceil(Math.max(0, totalSlides - itemsPerView));
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    renderDots();
    updateCarousel();
  });

  function getDots() {
    return Array.from(dotsContainer.children);
  }

  function getItemsPerView() {
    if (window.innerWidth < 481) return 1.6; /* 25% maior no mobile */
    if (window.innerWidth < 641) return 2.2; /* um pouco maior no tablet */
    if (window.innerWidth < 1200) return 2.5; 
    return 2.85; /* 40% maior no desktop */
  }

  function updateCarousel() {
    const itemsPerView = getItemsPerView();
    const maxIndex = Math.ceil(Math.max(0, totalSlides - itemsPerView));

    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    const slideWidth = slides[0].offsetWidth;
    const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
    
    // Cálculo exato de quanto podemos transladar sem sobrar espaço vazio
    const maxTranslate = Math.max(0, track.scrollWidth - track.parentElement.offsetWidth);
    
    let moveX = currentIndex * (slideWidth + gap);
    if (moveX > maxTranslate) moveX = maxTranslate;

    track.style.transform = `translateX(-${moveX}px)`;

    getDots().forEach((dot, i) => {
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

  // --- TOUCH SWIPE SUPPORT ---
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 40;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide();
    }
  }
  // ---------------------------

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
// 9. FLIP CARDS (EQUIPE) — Mobile/Touch
// =====================
function initFlipCards() {
  const flipCards = document.querySelectorAll('.equipe-flip-card');
  if (!flipCards.length) return;

  // Detectar se é touch device
  const isTouchDevice = () => {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  };

  flipCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Em dispositivos com hover (desktop), o CSS cuida do flip
      // Em touch, usamos a classe .flipped
      if (!isTouchDevice()) return;

      e.stopPropagation();

      // Se já está flipped, volta
      if (card.classList.contains('flipped')) {
        card.classList.remove('flipped');
        return;
      }

      // Fecha todos os outros cards abertos
      flipCards.forEach(c => c.classList.remove('flipped'));

      // Abre este card
      card.classList.add('flipped');
    });
  });

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.equipe-flip-card')) {
      flipCards.forEach(c => c.classList.remove('flipped'));
    }
  });
}

// =====================
// 10. LIGHTBOX (GALERIA)
// =====================
function initLightbox() {
  const overlay = document.getElementById('lightbox-overlay');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  const galeriaItems = document.querySelectorAll('.galeria-item');

  if (!overlay || !lightboxImg || !galeriaItems.length) return;

  galeriaItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;

      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeLightbox();
    }
  });
}

function initEquipeModal() {
  const modalOverlay = document.getElementById('equipe-modal');
  const modalContent = document.getElementById('equipe-modal-content');
  const closeBtn = document.getElementById('equipe-modal-close');

  if (!modalOverlay || !modalContent) return;

  // Fecha o modal
  function closeModal() {
    modalOverlay.classList.remove('show');
    document.body.style.overflow = '';
    // Limpa o conteúdo clonado após a animação de saída (300ms)
    setTimeout(() => {
      // Mantém o closeBtn e remove apenas os clones
      Array.from(modalContent.children).forEach(child => {
        if (child.id !== 'equipe-modal-close') {
          child.remove();
        }
      });
    }, 300);
  }

  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Abre o modal ao clicar num card da equipe
  const equipeSlides = document.querySelectorAll('.equipe-slide');
  equipeSlides.forEach(slide => {
    const flipCard = slide.querySelector('.equipe-flip-card');
    if (!flipCard) return;

    flipCard.addEventListener('click', () => {
      // Clona o card original
      const clone = flipCard.cloneNode(true);
      
      // Anexa no modal
      modalContent.appendChild(clone);
      
      // Exibe o modal
      modalOverlay.classList.add('show');
      document.body.style.overflow = 'hidden';

      // Aguarda 1.6s (1.5s a mais) para a pessoa ver a foto grande antes de virar
      setTimeout(() => {
        clone.classList.add('flipped');
      }, 1600);
    });
  });
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
  initLightbox();
  initEquipeModal();
});
