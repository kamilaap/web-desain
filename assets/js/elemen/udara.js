// --- INISIALISASI AOS ---
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000, // Durasi animasi (ms)
        once: true,     // Animasi hanya berjalan sekali saat scroll ke bawah
        offset: 100     // Jarak elemen dari layar sebelum animasi dimulai
    });
});

// --- FUNGSI COUNTER (Modifikasi agar lebih smooth) ---
const counters = document.querySelectorAll('.counter');
const speed = 100; // Percepat sedikit

const startCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const updateCount = () => {
        const count = +counter.innerText.replace(/\D/g, ''); 
        const inc = Math.max(1, Math.ceil(target / speed));

        if (count < target) {
            counter.innerText = (count + inc).toLocaleString('id-ID');
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target.toLocaleString('id-ID');
        }
    };
    updateCount();
};

// --- INTERSECTION OBSERVER ---
const mainObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Jalankan counter hanya saat kartu statistik terlihat
        if (entry.target.classList.contains('stat-card') && entry.isIntersecting) {
            const counterElement = entry.target.querySelector('.counter');
            if (counterElement) startCounter(counterElement);
            mainObserver.unobserve(entry.target); 
        }

        // Kontrol Video (YouTube & Lokal)
        if (entry.target.tagName === 'IFRAME' || entry.target.tagName === 'VIDEO') {
            if (entry.isIntersecting) {
                if (entry.target.tagName === 'VIDEO') entry.target.play();
                else entry.target.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            } else {
                if (entry.target.tagName === 'VIDEO') entry.target.pause();
                else entry.target.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            }
        }
    });
}, { threshold: 0.5 });

// Daftarkan elemen untuk diamati
document.querySelectorAll('.stat-card').forEach(card => mainObserver.observe(card));
document.querySelectorAll('iframe, video').forEach(v => mainObserver.observe(v));