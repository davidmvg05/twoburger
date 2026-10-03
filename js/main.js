/**
 * TWO BURGER — JAVASCRIPT PRINCIPAL
 * - Interatividade da Comanda de Cozinha (Kitchen Ticket Modal)
 * - Filtros dinâmicos do Cardápio
 * - Acordeão de FAQ (AEO)
 * - Carimbo de data/hora em tempo real na comanda
 * - Acessibilidade WCAG e navegação por teclado
 */

document.addEventListener('DOMContentLoaded', () => {
  initHttpsEnforcer();
  initKitchenTicket();
  initMenuFilters();
  initFaqAccordion();
  initHeaderScroll();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   0. FORÇAR HTTPS NO CLIENTE (PRODUÇÃO)
   -------------------------------------------------------------------------- */
function initHttpsEnforcer() {
  const host = window.location.hostname;
  const isLocal =
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '' ||
    window.location.protocol === 'file:';

  if (!isLocal && window.location.protocol === 'http:') {
    window.location.replace(
      `https://${host}${window.location.pathname}${window.location.search}${window.location.hash}`
    );
  }
}

/* --------------------------------------------------------------------------
   1. COMANDA DE COZINHA (KITCHEN TICKET MODAL)
   -------------------------------------------------------------------------- */
function initKitchenTicket() {
  const burgerBtn = document.getElementById('burger-toggle-btn');
  const ticketBackdrop = document.getElementById('ticket-backdrop');
  const closeBtn = document.getElementById('ticket-close-btn');
  const ticketLinks = document.querySelectorAll('.ticket-nav-item a');
  const timeElement = document.getElementById('ticket-live-time');
  const dateElement = document.getElementById('ticket-live-date');

  if (!burgerBtn || !ticketBackdrop) return;

  // Atualizar data e hora em tempo real na comanda
  function updateTicketClock() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const timeStr = now.toLocaleTimeString('pt-PT', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    if (dateElement) dateElement.textContent = `DATA: ${dateStr}`;
    if (timeElement) timeElement.textContent = `HORA: ${timeStr}`;
  }

  updateTicketClock();
  setInterval(updateTicketClock, 1000);

  function openTicket() {
    ticketBackdrop.removeAttribute('inert');
    ticketBackdrop.setAttribute('aria-hidden', 'false');
    ticketBackdrop.classList.add('active');
    burgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Focar no botão de fechar após estar visível para evitar avisos de ARIA na consola
    if (closeBtn) {
      requestAnimationFrame(() => closeBtn.focus());
    }
  }

  function closeTicket() {
    // Retirar o foco de dentro do modal antes de aplicar aria-hidden="true" (evita aviso Blocked aria-hidden na consola)
    burgerBtn.focus();
    ticketBackdrop.classList.remove('active');
    burgerBtn.setAttribute('aria-expanded', 'false');
    ticketBackdrop.setAttribute('aria-hidden', 'true');
    ticketBackdrop.setAttribute('inert', '');
    document.body.style.overflow = '';
  }

  burgerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (ticketBackdrop.classList.contains('active')) {
      closeTicket();
    } else {
      openTicket();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeTicket();
    });
  }

  // Fechar ao clicar fora (light-dismiss)
  ticketBackdrop.addEventListener('click', (e) => {
    if (e.target === ticketBackdrop) {
      closeTicket();
    }
  });

  // Fechar com tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && ticketBackdrop.classList.contains('active')) {
      closeTicket();
    }
  });

  // Fechar ao clicar em qualquer link da comanda e rolar suavemente
  ticketLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeTicket();
    });
  });
}

/* --------------------------------------------------------------------------
   2. FILTROS DO CARDÁPIO (MENU TABS)
   -------------------------------------------------------------------------- */
function initMenuFilters() {
  const tabButtons = document.querySelectorAll('.menu-tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  if (!tabButtons.length || !menuCards.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      // Atualizar classe ativa
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filtrar cartões
      menuCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. ACORDEÃO DE FAQ (AEO - MOTORES DE RESPOSTA)
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Fechar outros itens se desejado
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          const otherBtn = other.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. EFEITO DE SCROLL NO CABEÇALHO (TRANSPARENTE NO TOPO, ESCURO NO SCROLL)
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}

/* --------------------------------------------------------------------------
   5. ROLAGEM SUAVE COM COMPENSAÇÃO DINÂMICA DE HEADER
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  function scrollToTarget(targetId) {
    if (targetId === '#' || targetId === '') return;
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    const header = document.querySelector('.site-header');
    const headerHeight = header ? header.offsetHeight : 120;
    // Margem de segurança generosa para que badges e títulos fiquem perfeitamente visíveis
    const safetyOffset = 35;
    const elementPosition = targetEl.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - (headerHeight + safetyOffset);

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth'
    });
  }

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        scrollToTarget(targetId);

        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // Compensar também quando o utilizador entra com âncora direta no URL (ex: #sobre-nos)
  if (window.location.hash) {
    setTimeout(() => {
      scrollToTarget(window.location.hash);
    }, 250);
  }
}
