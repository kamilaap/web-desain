const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry, i) {
    if (entry.isIntersecting) {
      setTimeout(function () {
        entry.target.classList.add("tampil");
      }, i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

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