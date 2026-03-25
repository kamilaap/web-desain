 // ── Scroll Reveal ──
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('tampil');

<<<<<<< HEAD
document.querySelectorAll(".muncul").forEach(function (el) {
  observer.observe(el);
});

// DEFINE VARIABEL TERLEBIH DAHULU
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');

// Set volume agar tidak terlalu mengejutkan (opsional)
music.volume = 0.4;

function playMusic() {
    // Tambahkan pengecekan agar tidak error jika musik sudah diputar manual
    music.play().then(() => {
        musicIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
        // Hapus listener agar tidak terpanggil berulang kali setiap klik
        document.removeEventListener('click', playMusic);
    }).catch(error => {
        console.log("Menunggu interaksi pengguna untuk audio...");
    });
}

// Pemicu otomatis saat klik pertama di area mana pun
document.addEventListener('click', playMusic);

// Toggle Manual
musicBtn.addEventListener('click', function(e) {
    e.stopPropagation(); 
    if (music.paused) {
        music.play();
        musicIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
    } else {
        music.pause();
        musicIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
    }
});
=======
          // Trigger counter jika ada
          entry.target.querySelectorAll('.stat-angka[data-target]').forEach(el => {
            animateCounter(el);
          });

          // Trigger progress bars
          entry.target.querySelectorAll('.fakta-bar-fill[data-width]').forEach(el => {
            setTimeout(() => {
              el.style.width = el.dataset.width + '%';
            }, 200);
          });

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.muncul').forEach(el => observer.observe(el));

    // ── Counter Animation ──
    function animateCounter(el) {
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const isDecimal = el.dataset.decimal === '1';
      const duration = 1800;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = target * ease;
        el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    }

    // ── Magnetic hover pada kartu (mouse tracking) ──
    document.querySelectorAll('.kartu').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', x + '%');
        card.style.setProperty('--my', y + '%');
      });
    });
>>>>>>> 9f3d4e55bc58b2621673a0b2ea520cb72aa8b43b
