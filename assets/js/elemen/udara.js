// Ambil semua elemen counter
const counters = document.querySelectorAll('.counter');
const speed = 500; 

// --- FUNGSI COUNTER ANGKA ---
const startCounter = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/\D/g, ''); 
            const inc = target / speed;

            if (count < target) {
                const nextCount = Math.ceil(count + inc);
                counter.innerText = nextCount.toLocaleString('id-ID'); 
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target.toLocaleString('id-ID');
            }
        };
        updateCount();
    });
};

// --- LOGIKA AUTOPLAY SAAT SCROLL ---
const observerOptions = { 
    threshold: 0.3 
};

const mainObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // --- LOGIKA UNTUK YOUTUBE (Transportasi & Pabrik) ---
        if (entry.target.tagName === 'IFRAME') {
            const iframe = entry.target;
            if (entry.isIntersecting) {
                iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            } else {
                iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            }
        }

        // --- LOGIKA UNTUK VIDEO LOKAL (Sampah) ---
        if (entry.target.tagName === 'VIDEO') {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play(); // Putar otomatis saat di-scroll ke bawah
            } else {
                video.pause(); // Berhenti saat di-scroll menjauh
            }
        }

        // --- LOGIKA COUNTER STATISTIK ---
        if (entry.target.classList.contains('stats-grid') && entry.isIntersecting) {
            startCounter();
            mainObserver.unobserve(entry.target); 
        }
    });
}, { threshold: 0.3 });

// Daftarkan semua elemen
mainObserver.observe(document.querySelector('.stats-grid'));
mainObserver.observe(document.getElementById('videoTransportasi'));
mainObserver.observe(document.getElementById('videoPabrik'));
mainObserver.observe(document.getElementById('videoSampah'));