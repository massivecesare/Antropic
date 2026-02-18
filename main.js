/* main.js — Tenuta BubbleBee */

// ── CUSTOM CURSOR ──
const cur = document.getElementById(‘cur’);
const curR = document.getElementById(‘curR’);
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener(‘mousemove’, e => {
mx = e.clientX; my = e.clientY;
cur.style.left = mx + ‘px’;
cur.style.top  = my + ‘px’;
});

(function animRing() {
rx += (mx - rx) * 0.13;
ry += (my - ry) * 0.13;
curR.style.left = rx + ‘px’;
curR.style.top  = ry + ‘px’;
requestAnimationFrame(animRing);
})();

document.querySelectorAll(‘a, button, .room-card, .bub-card, .poi-card, .exp-card’).forEach(el => {
el.addEventListener(‘mouseenter’, () => {
cur.style.transform  = ‘translate(-50%,-50%) scale(2.8)’;
curR.style.transform = ‘translate(-50%,-50%) scale(1.6)’;
});
el.addEventListener(‘mouseleave’, () => {
cur.style.transform  = ‘translate(-50%,-50%) scale(1)’;
curR.style.transform = ‘translate(-50%,-50%) scale(1)’;
});
});

// ── NAVBAR SCROLL ──
const nav = document.getElementById(‘nav’);
window.addEventListener(‘scroll’, () => {
nav.classList.toggle(‘scrolled’, window.scrollY > 60);
}, { passive: true });

// ── MOBILE MENU ──
const ham     = document.getElementById(‘ham’);
const mob     = document.getElementById(‘mob’);
const mobClose = document.getElementById(‘mobClose’);
if (ham)      ham.addEventListener(‘click’,      () => mob.classList.toggle(‘open’));
if (mobClose) mobClose.addEventListener(‘click’, () => mob.classList.remove(‘open’));

// ── TESTIMONIALS (homepage only) ──
const slides = document.querySelectorAll(’.testi-slide’);
const dotsEl = document.getElementById(‘dots’);
let cur_t = 0;

if (slides.length && dotsEl) {
// build dots
slides.forEach((_, i) => {
const d = document.createElement(‘div’);
d.className = ‘dot’ + (i === 0 ? ’ on’ : ‘’);
d.addEventListener(‘click’, () => goT(i));
dotsEl.appendChild(d);
});

function goT(idx) {
slides[cur_t].classList.remove(‘on’);
document.querySelectorAll(’.dot’)[cur_t].classList.remove(‘on’);
cur_t = idx;
slides[cur_t].classList.add(‘on’);
document.querySelectorAll(’.dot’)[cur_t].classList.add(‘on’);
}
setInterval(() => goT((cur_t + 1) % slides.length), 5500);
}

// ── INTERSECTION OBSERVER (scroll reveal) ──
const io = new IntersectionObserver(entries => {
entries.forEach(e => { if (e.isIntersecting) e.target.classList.add(‘vis’); });
}, { threshold: 0.12 });
document.querySelectorAll(’.fade-up’).forEach(el => io.observe(el));

// ── BOOKING FORM (homepage) ──
const bForm = document.querySelector(’.book-form’);
if (bForm) {
bForm.addEventListener(‘submit’, e => {
e.preventDefault();
const btn = bForm.querySelector(’.btn-submit’);
btn.textContent = ‘✓ Richiesta inviata!’;
btn.style.background = ‘#4a7c59’;
setTimeout(() => { btn.textContent = ‘✦ Richiedi Disponibilità’; btn.style.background = ‘var(–gold)’; }, 4000);
});
}
