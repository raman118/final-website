// Fix mobile viewport height issue
function setVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Initial call
setVh();

// Update on resize and orientation change
window.addEventListener('resize', setVh);
window.addEventListener('orientationchange', setVh);

// Prevent scroll on page load and ensure top position
window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, 100);
});

// Force scroll to top on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
});

// Prevent iOS Safari from scrolling on focus
document.addEventListener('focusin', (e) => {
    if (window.innerWidth <= 900) {
        e.preventDefault();
        window.scrollTo(0, 0);
    }
});
