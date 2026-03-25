 // ── Scroll Reveal ──
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('tampil');

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