// ══════════════════════════════════════
//  MAIN.JS — Bumi Berbicara
//  Berisi: reveal, counter, progress bar,
//          navbar anchor patch, scroll highlight
// ══════════════════════════════════════

// ── Override navbar: link ke anchor bukan file terpisah ──
function patchNavbarAnchors() {
  const peta = {
    'index.html':  '#beranda',
    'tentang.html': '#tentang',
    'elemen.html':  '#elemen',
    'kontak.html':  '#kontak',
  };

  document.querySelectorAll('nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const namaFile = href.split('/').pop();
    if (peta[namaFile]) {
      a.setAttribute('href', peta[namaFile]);
      a.classList.remove('active');
    }
  });

  highlightNavOnScroll();
}

// ── Highlight nav link sesuai section yang sedang aktif ──
function highlightNavOnScroll() {
  const sections = ['beranda', 'tentang', 'elemen', 'kontak'];
  const navLinks = document.querySelectorAll('nav a.nav-link');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + id) {
            a.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
}

// ── Counter animasi angka ──
function animateCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const isDecimal = target % 1 !== 0;
    const duration = 1800;
    const startTime = performance.now();

    function update(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = target * eased;
      el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  });
}

// ── Progress bar animasi ──
function animateBars() {
  document.querySelectorAll('.card[data-progress]').forEach(card => {
    const val = card.dataset.progress;
    const bar = card.querySelector('.bar-isi');
    if (bar) bar.style.width = val + '%';
  });
}

// ── Scroll reveal ──
function setupReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// ── Counter observer — trigger saat stats masuk viewport ──
function setupCounterObserver() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        animateBars();
        io.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.tentang-stats');
  if (statsSection) io.observe(statsSection);
}

// ── Init ──
document.addEventListener('DOMContentLoaded', function () {
  loadNavbar();
  loadFooter();
  patchNavbarAnchors();
  setupReveal();
  setupCounterObserver();

  // Trigger reveal untuk elemen yang sudah kelihatan saat load
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add('visible');
    });
  }, 100);
});