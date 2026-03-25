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

const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');

// Fungsi untuk memutar musik
function playMusic() {
    music.play().then(() => {
        musicIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
        // Hapus event listener setelah musik berhasil diputar
        document.removeEventListener('click', playMusic);
    }).catch(error => {
        console.log("Autoplay diblokir browser, menunggu interaksi.");
    });
}

// Pemicu: Musik berputar saat klik pertama di halaman
document.addEventListener('click', playMusic);

// Toggle Manual (Klik pada ikon musik)
musicBtn.addEventListener('click', function(e) {
    e.stopPropagation(); // Mencegah bentrok dengan listener dokumen
    if (music.paused) {
        music.play();
        musicIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
    } else {
        music.pause();
        musicIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
    }
});