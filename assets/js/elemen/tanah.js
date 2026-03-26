document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCounter = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
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
                observer.unobserve(counter);
            }
        });
    };

    const counterObserver = new IntersectionObserver(startCounter, {
        threshold: 0.5
    });

    counters.forEach(counter => counterObserver.observe(counter));
});

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