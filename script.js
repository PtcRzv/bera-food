document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. MENIU MOBIL (NAV) ---------- */
  const burgerBtn = document.getElementById('burgerBtn');
  const navLinks = document.getElementById('navLinks');

  if (burgerBtn && navLinks) {
    burgerBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ---------- 1.5. ANIMAȚIE SMOOTH SCROLL (DESKTOP + MOBIL) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();

        // Calculăm înălțimea header-ului sticky (cca. 70px) pentru offset
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        // Executăm derularea lină calculată în pixeli
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ---------- 2. TAB-URI MENIU (FILTRARE DUPĂ CATEGORIE) ---------- */
  const menuTabs = document.querySelector('.menu-tabs');
  
  if (menuTabs) {
    menuTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;

      // Schimbă butonul activ
      menuTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filtrează cardurile de meniu (.menu-ticket)
      const selectedCat = btn.dataset.category || btn.dataset.cat;
      const tickets = document.querySelectorAll('.menu-ticket');

      tickets.forEach(ticket => {
        if (ticket.dataset.category === selectedCat || ticket.dataset.cat === selectedCat) {
          ticket.classList.remove('hidden');
        } else {
          ticket.classList.add('hidden');
        }
      });
    });
  }

  /* ---------- 3. GALERIE & TAB-URI GALERIE ---------- */
  const galTabs = document.getElementById('galTabs');
  const gallery = document.getElementById('gallery');

  if (galTabs) {
    galTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;

      document.querySelectorAll('#galTabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.gcat;
      document.querySelectorAll('#gallery .g-item').forEach(item => {
        item.classList.toggle('hidden-cat', cat !== 'all' && item.dataset.gcat !== cat);
      });
    });
  }

  /* ---------- 4. LIGHTBOX GALERIE ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightboxClose');

  if (gallery && lightbox) {
    gallery.addEventListener('click', (e) => {
      if (!e.target.closest('.g-item')) return;
      lightbox.classList.add('open');
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }

  /* ---------- 5. REACȚII RECENZII (LIKE / REACTION) ---------- */
  document.querySelectorAll('.rev-actions').forEach(group => {
    const buttons = group.querySelectorAll('.react-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        const cntEl = btn.querySelector('.cnt');
        if (cntEl) {
          cntEl.textContent = parseInt(cntEl.textContent, 10) + 1;
        }
        btn.classList.add('active');
        buttons.forEach(b => b.disabled = true);
      });
    });
  });

  /* ---------- 6. MODAL COMANDĂ ---------- */
  const orderModal = document.getElementById('orderModal');
  const openOrderNav = document.getElementById('openOrderNav');
  const openOrderHero = document.getElementById('openOrderHero');
  const orderModalClose = document.getElementById('orderModalClose');

  function openOrder() {
    if (orderModal) orderModal.classList.add('open');
  }

  if (openOrderNav) openOrderNav.addEventListener('click', openOrder);
  if (openOrderHero) openOrderHero.addEventListener('click', openOrder);
  
  if (orderModalClose && orderModal) {
    orderModalClose.addEventListener('click', () => orderModal.classList.remove('open'));
  }

  if (orderModal) {
    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) orderModal.classList.remove('open');
    });
  }

});
