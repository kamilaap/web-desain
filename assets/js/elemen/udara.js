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
const speed = 100;

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

        // Kontrol Video
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

// aqi - Bumi Berbicara Update
(async function loadAQI() {
    const widget = document.getElementById('aqiWidget');
    if (!widget) return;

    const token = '0a4f3249e7117b0f9d70ff128d25d1500bab05d8'; 

    function getAQILevel(aqi) {
        if (aqi <= 50)  return { label: 'Baik', color: '#4DD96F', bg: 'rgba(77,217,111,0.12)', icon: 'fa-face-smile' };
        if (aqi <= 100) return { label: 'Sedang', color: '#F5C842', bg: 'rgba(245,200,66,0.12)', icon: 'fa-face-meh' };
        if (aqi <= 150) return { label: 'Tidak Sehat', color: '#FF8C42', bg: 'rgba(255,140,66,0.12)', icon: 'fa-face-frown' };
        if (aqi <= 200) return { label: 'Sangat Tidak Sehat', color: '#E24B4A', bg: 'rgba(226,75,74,0.12)', icon: 'fa-skull-crossbones' };
        return { label: 'Berbahaya', color: '#9B2C2C', bg: 'rgba(155,44,44,0.15)', icon: 'fa-biohazard' };
    }

    function renderWidget(aqi, cityName, iaqi, time, isDemo = false) {
        const level = getAQILevel(aqi);
        
        // Ekstraksi parameter dengan fallback aman
        const pm25 = iaqi.pm25 ? `${iaqi.pm25.v}` : '--';
        const pm10 = iaqi.pm10 ? `${iaqi.pm10.v}` : '--';
        const temp = iaqi.t ? `${iaqi.t.v}°C` : '--';
        const hum = iaqi.h ? `${iaqi.h.v}%` : '--';

        widget.innerHTML = `
            <div class="aqi-card muncul" style="--aqi-color:${level.color}; --aqi-bg:${level.bg}">
                <div class="aqi-left">
                    <div class="aqi-label">Kualitas Udara · <strong>${cityName}</strong></div>
                    <div class="aqi-number">${aqi}</div>
                    <div class="aqi-status">
                        <i class="fa-solid ${level.icon}"></i> ${level.label}
                    </div>
                </div>
                
                <div class="aqi-right">
                    <div class="aqi-param"><span>PM2.5</span><strong>${pm25} <small>µg</small></strong></div>
                    <div class="aqi-param"><span>PM10</span><strong>${pm10} <small>µg</small></strong></div>
                    <div class="aqi-param"><span>Suhu</span><strong>${temp}</strong></div>
                    <div class="aqi-param"><span>Lembap</span><strong>${hum}</strong></div>
                </div>

                <div class="aqi-footer-info">
                    <div class="aqi-live-tag">
                        ${isDemo ? '<i class="fa-solid fa-circle-info"></i> DATA ESTIMASI' : '<span class="live-pulse"></span> LIVE DATA'}
                    </div>
                    <div class="aqi-time-val">
                        Update: ${time}
                    </div>
                </div>
            </div>
        `;
    }

    async function fetchAQI(url) {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        if (data.status !== 'ok') throw new Error(data.data || 'API error');
        return data.data;
    }

    async function tryWithLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) return reject(new Error("Browser no support GPS"));

            navigator.geolocation.getCurrentPosition(
                async ({ coords }) => {
                    try {
                        const data = await fetchAQI(
                            `https://api.waqi.info/feed/geo:${coords.latitude};${coords.longitude}/?token=${token}`
                        );
                        resolve(data);
                    } catch(e) { reject(e); }
                },
                (err) => reject(err), 
                { enableHighAccuracy: true, timeout: 7000 }
            );
        });
    }

    // Initial Loading State
    widget.innerHTML = `
        <div class="aqi-loading">
            <i class="fa-solid fa-location-dot fa-bounce"></i>
            <span>Mencari udara di lokasimu...</span>
        </div>`;

    try {
        let data;
        let cityName;

        try {
            data = await tryWithLocation();
            cityName = (data.city?.name || 'Sekitar Anda').split(',')[0].trim();
        } catch (locErr) {
            console.warn("GPS Gagal, menggunakan Default (Jakarta):", locErr.message);
            data = await fetchAQI(`https://api.waqi.info/feed/jakarta/?token=${token}`);
            cityName = 'Jakarta';
        }

        const iaqi = data.iaqi || {};
        const time = data.time?.s?.slice(0, 16).replace(' ', ' pukul ') || '—';
        renderWidget(data.aqi, cityName, iaqi, time);

    } catch(e) {
        console.error("Critical Error:", e);
        // Emergency Fallback agar widget tidak kosong
        renderWidget(156, 'Jakarta', {
            pm25: { v: 58 }, pm10: { v: 72 },
            t: { v: 31 }, h: { v: 78 }
        }, 'Koneksi Terputus', true);
    }
})();

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

document.addEventListener('click', playMusic);

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