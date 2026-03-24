document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');
    
    const animateCount = (el) => {
        const target = parseFloat(el.getAttribute('data-target'));
        const duration = 2000; // 2 detik animasi
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Hitung angka saat ini
            let currentNum = progress * target;

            // Logika tampilan: Jika target punya desimal (seperti 2.2), tampilkan 1 angka di belakang koma
            if (target % 1 !== 0) {
                el.innerText = currentNum.toFixed(1).replace('.', ',');
            } else {
                el.innerText = Math.floor(currentNum);
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Pastikan angka terakhir tepat sesuai target
                el.innerText = target.toString().replace('.', ',');
            }
        };

        window.requestAnimationFrame(step);
    };

    // Observer agar animasi jalan saat elemen muncul di layar
    const observerOptions = {
        threshold: 0.7 // Jalankan jika 70% elemen sudah terlihat
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer.unobserve(entry.target); // Stop observe setelah animasi jalan sekali
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
});