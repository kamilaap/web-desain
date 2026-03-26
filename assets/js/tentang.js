document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');

    const animateCount = (el) => {
        const target = parseFloat(el.getAttribute('data-target'));
        const duration = 2000;
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            let currentNum = progress * target;
            if (target % 1 !== 0) {
                el.innerText = currentNum.toFixed(1).replace('.', ',');
            } else {
                el.innerText = Math.floor(currentNum);
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                el.innerText = target.toString().replace('.', ',');
            }
        };

        window.requestAnimationFrame(step);
    };
    const observerOptions = {
        threshold: 0.7
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
});