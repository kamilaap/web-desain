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
