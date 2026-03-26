const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');

if (music && musicBtn) {
    music.volume = 0.4;
    function handleFirstClick(e) {
        if (musicBtn.contains(e.target)) return;

        music.play().then(() => {
            musicIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
            document.removeEventListener('click', handleFirstClick);
        }).catch(err => console.log("Menunggu interaksi..."));
    }

    document.addEventListener('click', handleFirstClick);

    musicBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        document.removeEventListener('click', handleFirstClick);

        if (music.paused) {
            music.play();
            musicIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
        } else {
            music.pause();
            musicIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
        }
    });
}
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('tampil');
            entry.target.querySelectorAll('.stat-angka[data-target]').forEach(el => {
                animateCounter(el);
            });
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
function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const isDecimal = el.dataset.decimal === '1';
    const duration = 1800;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = target * ease;
        el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}
document.querySelectorAll('.kartu').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', x + '%');
        card.style.setProperty('--my', y + '%');
    });
});