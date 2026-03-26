(function () {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');

    if (!dot || !ring) return;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let rafId;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });
    function lerpRing() {
        const speed = 0.12;
        ringX += (mouseX - ringX) * speed;
        ringY += (mouseY - ringY) * speed;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        rafId = requestAnimationFrame(lerpRing);
    }

    rafId = requestAnimationFrame(lerpRing);
    const interactiveSelectors = 'a, button, [role="button"], input, textarea, select, label, .fitur-card, .card, .element-box, .accordion-button';

    document.addEventListener('mouseover', e => {
        if (e.target.closest(interactiveSelectors)) {
            dot.classList.add('hover', 'on-link');
            ring.classList.add('hover', 'on-link');
        }
    });

    document.addEventListener('mouseout', e => {
        if (e.target.closest(interactiveSelectors)) {
            dot.classList.remove('hover', 'on-link');
            ring.classList.remove('hover', 'on-link');
        }
    });

    document.addEventListener('mousedown', () => {
        dot.classList.add('clicking');
        ring.classList.add('clicking');
    });

    document.addEventListener('mouseup', () => {
        dot.classList.remove('clicking');
        ring.classList.remove('clicking');
    });

    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
    });
})();