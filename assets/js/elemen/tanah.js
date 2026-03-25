document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Semakin besar angka, semakin lambat jalannya

    const startCounter = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                // Logika perhitungan angka
                const animate = () => {
                    const value = +counter.getAttribute('data-target');
                    const data = +counter.innerText;
                    const time = value / speed;

                    if (data < value) {
                        counter.innerText = Math.ceil(data + time);
                        setTimeout(animate, 1);
                    } else {
                        counter.innerText = value;
                    }
                };

                animate();
                // Berhenti mengamati setelah animasi selesai sekali
                observer.unobserve(counter);
            }
        });
    };

    const counterObserver = new IntersectionObserver(startCounter, {
        threshold: 0.5 // Animasi mulai saat 50% elemen terlihat
    });

    counters.forEach(counter => counterObserver.observe(counter));
});


// 2. Logika Musik yang Diperbaiki
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');

if (music && musicBtn) {
    music.volume = 0.4;

    // Fungsi klik pertama kali
    function handleFirstClick(e) {
        // Jika yang diklik adalah tombolnya, jangan jalankan fungsi ini (biarkan fungsi toggle)
        if (musicBtn.contains(e.target)) return;

        music.play().then(() => {
            musicIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
            document.removeEventListener('click', handleFirstClick);
        }).catch(err => console.log("Menunggu interaksi..."));
    }

    document.addEventListener('click', handleFirstClick);

    // Toggle Manual
    musicBtn.addEventListener('click', function(e) {
        e.stopPropagation(); 
        // Hapus auto-play listener jika user klik tombol manual duluan
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