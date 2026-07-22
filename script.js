const burgerBtn = document.getElementById('burgerBtn');
const navLinks = document.getElementById('navLinks');
burgerBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

document.getElementById('menuTabs').addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    document.querySelectorAll('#menuTabs .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    document.querySelectorAll('.menu-cat').forEach(sec => sec.classList.toggle('active', sec.dataset.cat === cat));
});

document.getElementById('galTabs').addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    document.querySelectorAll('#galTabs .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.gcat;
    document.querySelectorAll('#gallery .g-item').forEach(item => item.classList.toggle('hidden-cat', cat !== 'all' && item.dataset.gcat !== cat));
});

const lightbox = document.getElementById('lightbox');
document.getElementById('gallery').addEventListener('click', (e) => {
    if (!e.target.closest('.g-item')) return;
    lightbox.classList.add('open');
});
document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('open'));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });

document.querySelectorAll('.rev-actions').forEach(group => {
    const buttons = group.querySelectorAll('.react-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.disabled = true);
            btn.classList.toggle('active');
        });
    });
});

const orderModal = document.getElementById('orderModal');
function openOrder() { orderModal.classList.add('open'); }
document.getElementById('openOrderNav').addEventListener('click', openOrder);
document.getElementById('openOrderHero').addEventListener('click', openOrder);
document.getElementById('orderModalClose').addEventListener('click', () => orderModal.classList.remove('open'));
orderModal.addEventListener('click', (e) => { if (e.target === orderModal) orderModal.classList.remove('open'); });