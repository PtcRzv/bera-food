document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. LIGHTBOX / POP-UP PENTRU GALERIE FOTO
  // ==========================================
  const galleryItems = document.querySelectorAll('.g-item');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox img');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightbox && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          const imageSource = img.getAttribute('src');
          if (imageSource) {
            lightboxImg.src = imageSource;
            lightboxImg.alt = img.alt || 'Imagine mărită';
            lightbox.classList.add('open');
          }
        }
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('open');
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        lightbox.classList.remove('open');
      }
    });
  }

  // ==========================================
  // 2. FILTRARE CATEGORII GALERIE
  // ==========================================
  const galTabs = document.querySelectorAll('.gal-tabs .tab-btn');
  
  if (galTabs.length > 0) {
    galTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        galTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filterValue = tab.getAttribute('data-filter');

        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-cat') === filterValue) {
            item.classList.remove('hidden-cat');
          } else {
            item.classList.add('hidden-cat');
          }
        });
      });
    });
  }

  // ==========================================
  // 2.1. FILTRARE MENIU (PRODUSE / BURGERI)
  // ==========================================
  const menuTabs = document.querySelectorAll('.menu-tabs .tab-btn');
  const menuTickets = document.querySelectorAll('.menu-ticket');

  if (menuTabs.length > 0 && menuTickets.length > 0) {
    menuTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        menuTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.getAttribute('data-category');

        menuTickets.forEach(ticket => {
          if (category === 'all' || ticket.classList.contains(category)) {
            ticket.classList.remove('hidden');
          } else {
            ticket.classList.add('hidden');
          }
        });
      });
    });
  }

  // ==========================================
  // 3. MENIU MOBIL (BURGER MENU)
  // ==========================================
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('nav.links');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // ==========================================
  // 4. MODAL COMANDĂ (ORDER MODAL)
  // ==========================================
  const orderModal = document.querySelector('.order-modal');
  const orderBtns = document.querySelectorAll('.order-btn, .btn-primary');
  const orderModalClose = document.querySelector('.order-modal-close');

  if (orderModal) {
    orderBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (btn.tagName === 'BUTTON' || btn.classList.contains('order-btn')) {
          e.preventDefault();
          orderModal.classList.add('open');
        }
      });
    });

    if (orderModalClose) {
      orderModalClose.addEventListener('click', () => {
        orderModal.classList.remove('open');
      });
    }

    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) {
        orderModal.classList.remove('open');
      }
    });
  }

  // ==========================================
  // 5. SISTEM VOT RECENZII
  // ==========================================
  const revCards = document.querySelectorAll('.rev-card');

  revCards.forEach((card, index) => {
    const likeBtn = card.querySelector('.like, .react-btn.like');
    const dislikeBtn = card.querySelector('.dislike, .react-btn.dislike');

    if (!likeBtn || !dislikeBtn) return;

    const storageKey = `voted_recenzie_${index}`;
    const savedVote = localStorage.getItem(storageKey);

    const lockButtons = (type) => {
      likeBtn.disabled = true;
      dislikeBtn.disabled = true;
      likeBtn.style.pointerEvents = 'none';
      dislikeBtn.style.pointerEvents = 'none';

      if (type === 'like') likeBtn.classList.add('active');
      if (type === 'dislike') dislikeBtn.classList.add('active');
    };

    if (savedVote) {
      lockButtons(savedVote);
    }

    const processVote = (btn, type) => {
      if (localStorage.getItem(storageKey)) return;

      const countSpan = btn.querySelector('.count, span') || btn;
      let currentVal = parseInt(countSpan.textContent.replace(/\D/g, ''), 10) || 0;
      
      if (countSpan !== btn) {
        countSpan.textContent = currentVal + 1;
      } else {
        countSpan.childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
            node.textContent = ' ' + (currentVal + 1);
          }
        });
      }

      localStorage.setItem(storageKey, type);
      lockButtons(type);
    };

    likeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      processVote(likeBtn, 'like');
    });

    dislikeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      processVote(dislikeBtn, 'dislike');
    });
  });

});
