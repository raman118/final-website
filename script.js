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

// Prevent scroll on page load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
});
