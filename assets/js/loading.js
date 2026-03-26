(function () {
    const screen = document.getElementById('loadingScreen');
    const bar = document.getElementById('loaderBar');
    const hint = document.getElementById('loaderHint');

    if (!screen) return;

    const hints = [
        'Memuat dunia...',
        'Menghitung tetes air...',
        'Menyegarkan udara...',
        'Menyuburkan tanah...',
        'Hampir siap...',
    ];

    let progress = 0;
    let hintIdx = 0;
    let hintTimer;
    function cycleHint() {
        if (!hint) return;
        hint.style.opacity = '0';
        setTimeout(() => {
            hintIdx = (hintIdx + 1) % hints.length;
            hint.textContent = hints[hintIdx];
            hint.style.opacity = '1';
        }, 300);
    }

    hint.textContent = hints[0];
    hintTimer = setInterval(cycleHint, 1400);
    function setProgress(val) {
        progress = Math.min(val, 100);
        if (bar) bar.style.width = progress + '%';
    }
    const startTime = performance.now();
    let rafId;

    function tick(now) {
        const elapsed = now - startTime;

        if (elapsed < 600) setProgress(elapsed / 600 * 40);
        else if (elapsed < 1200) setProgress(40 + (elapsed - 600) / 600 * 25);
        else setProgress(Math.min(progress + 0.4, 85));

        if (progress < 100) rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    function finish() {
        cancelAnimationFrame(rafId);
        clearInterval(hintTimer);
        setProgress(100);

        if (hint) {
            hint.style.opacity = '0';
            setTimeout(() => { hint.textContent = 'Selamat datang!'; hint.style.opacity = '1'; }, 300);
        }

        setTimeout(() => {
            screen.classList.add('hidden');
            screen.addEventListener('transitionend', () => screen.remove(), { once: true });
        }, 500);
    }

    if (document.readyState === 'complete') {
        setTimeout(finish, 200);
    } else {
        window.addEventListener('load', () => setTimeout(finish, 200));
    }
})();