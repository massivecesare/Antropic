/* main.js — Tenuta BubbleBee */

/* ── CUSTOM CURSOR (only mouse devices) ── */
const isPointerFine = window.matchMedia(’(pointer:fine)’).matches;
const cur  = document.getElementById(‘cur’);
const curR = document.getElementById(‘curR’);
let mx = 0, my = 0, rx = 0, ry = 0;

if (isPointerFine && cur && curR) {
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
}

/* ── NAVBAR SCROLL ── */
const nav = document.getElementById(‘nav’);
if (nav) {
const scrollHandler = () => nav.classList.toggle(‘scrolled’, window.scrollY > 60);
window.addEventListener(‘scroll’, scrollHandler, { passive: true });
scrollHandler(); // run on load
}

/* ── MOBILE MENU ── */
const ham      = document.getElementById(‘ham’);
const mob      = document.getElementById(‘mob’);
const mobClose = document.getElementById(‘mobClose’);
if (ham && mob) {
ham.addEventListener(‘click’, () => mob.classList.toggle(‘open’));
if (mobClose) mobClose.addEventListener(‘click’, () => mob.classList.remove(‘open’));
// Close on link click
mob.querySelectorAll(‘a’).forEach(a => a.addEventListener(‘click’, () => mob.classList.remove(‘open’)));
// Close on outside click
mob.addEventListener(‘click’, e => { if (e.target === mob) mob.classList.remove(‘open’); });
}

/* ── HAMBURGER ANIMATION ── */
if (ham && mob) {
const spans = ham.querySelectorAll(‘span’);
const observer = new MutationObserver(() => {
const open = mob.classList.contains(‘open’);
if (spans[0]) spans[0].style.transform = open ? ‘rotate(45deg) translate(4px, 4px)’ : ‘’;
if (spans[1]) spans[1].style.opacity   = open ? ‘0’ : ‘1’;
if (spans[2]) spans[2].style.transform = open ? ‘rotate(-45deg) translate(4px, -4px)’ : ‘’;
});
observer.observe(mob, { attributes: true, attributeFilter: [‘class’] });
}

/* ── TESTIMONIALS (homepage) ── */
const slides  = document.querySelectorAll(’.testi-slide’);
const dotsEl  = document.getElementById(‘dots’);
let curT = 0;
let testiTimer;

if (slides.length && dotsEl) {
slides.forEach((_, i) => {
const d = document.createElement(‘div’);
d.className = ‘dot’ + (i === 0 ? ’ on’ : ‘’);
d.setAttribute(‘aria-label’, `Testimonianza ${i + 1}`);
d.addEventListener(‘click’, () => goT(i));
dotsEl.appendChild(d);
});

function goT(idx) {
slides[curT].classList.remove(‘on’);
dotsEl.children[curT].classList.remove(‘on’);
curT = (idx + slides.length) % slides.length;
slides[curT].classList.add(‘on’);
dotsEl.children[curT].classList.add(‘on’);
resetTimer();
}

function resetTimer() {
clearInterval(testiTimer);
testiTimer = setInterval(() => goT(curT + 1), 5500);
}
resetTimer();

// Swipe support for mobile
let tsX = 0;
const tw = document.querySelector(’.testi-wrap’);
if (tw) {
tw.addEventListener(‘touchstart’, e => { tsX = e.touches[0].clientX; }, { passive: true });
tw.addEventListener(‘touchend’,   e => {
const dx = e.changedTouches[0].clientX - tsX;
if (Math.abs(dx) > 50) goT(curT + (dx < 0 ? 1 : -1));
}, { passive: true });
}
}

/* ── FAQ ── */
document.querySelectorAll(’.faq-item’).forEach(item => {
item.addEventListener(‘click’, () => {
const wasOpen = item.classList.contains(‘open’);
document.querySelectorAll(’.faq-item.open’).forEach(f => f.classList.remove(‘open’));
if (!wasOpen) item.classList.add(‘open’);
});
});

/* ── SCROLL REVEAL (IntersectionObserver) ── */
const io = new IntersectionObserver(entries => {
entries.forEach(e => {
if (e.isIntersecting) {
e.target.classList.add(‘vis’);
io.unobserve(e.target);
}
});
}, { threshold: 0.1, rootMargin: ‘0px 0px -40px 0px’ });
document.querySelectorAll(’.fade-up’).forEach(el => io.observe(el));

/* ── BOOKING FORM (homepage) ── */
const bForm = document.querySelector(’.book-form’);
if (bForm) {
bForm.addEventListener(‘submit’, e => {
e.preventDefault();
const btn = bForm.querySelector(’.btn-submit’);
const orig = btn.textContent;
btn.textContent = ‘✓ Richiesta inviata con successo!’;
btn.style.background = ‘#3d7a52’;
btn.disabled = true;
setTimeout(() => {
btn.textContent = orig;
btn.style.background = ‘’;
btn.disabled = false;
bForm.reset();
}, 4500);
});
}

/* ── CONTACT FORM (contatti page) ── */
const cForm = document.querySelector(‘form[onsubmit]’);
// handled inline in contatti.html

/* ── LAZY IMAGE FADE-IN ── */
document.querySelectorAll(‘img[loading=“lazy”]’).forEach(img => {
if (img.complete) return;
img.style.opacity = ‘0’;
img.style.transition = ‘opacity .5s ease’;
img.addEventListener(‘load’,  () => { img.style.opacity = ‘1’; });
img.addEventListener(‘error’, () => { img.style.display = ‘none’; });
});

/* ── PREVENT SCROLL WHEN MOBILE MENU OPEN ── */
if (mob) {
new MutationObserver(() => {
document.body.style.overflow = mob.classList.contains(‘open’) ? ‘hidden’ : ‘’;
}).observe(mob, { attributes: true, attributeFilter: [‘class’] });
}
