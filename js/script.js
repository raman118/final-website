// Prefer manual scroll restoration to avoid browser restoring to anchors
if ('scrollRestoration' in history) {
	// keep manual so we control scrolling when tabs change
	history.scrollRestoration = 'manual';
}

const navLinks = document.querySelectorAll('.nav-link');
const tabContents = document.querySelectorAll('.tab-content');
const navTabs = document.querySelector('.nav-tabs'); // used by mobile menu functions

// Switch tab helper (only updates classes / visibility)
function switchTab(tabId) {
	navLinks.forEach(l => l.classList.remove('active'));
	tabContents.forEach(tab => tab.classList.remove('active'));

	const targetLink = document.querySelector(`[data-tab="${tabId}"]`);
	const targetTab = document.getElementById(tabId);

	if (targetLink && targetTab) {
		targetLink.classList.add('active');
		targetTab.classList.add('active');
	}
}

// On page load, restore tab from hash (but avoid native anchor jump by resetting scroll)
window.addEventListener('DOMContentLoaded', () => {
	const hash = window.location.hash.substring(1);
	const tabId = hash || 'home';
	switchTab(tabId);

	// ensure any native jump is overridden after layout renders
	requestAnimationFrame(() => window.scrollTo(0, 0));
});

// Handle back/forward navigation without layout jumps
window.addEventListener('popstate', () => {
	const hash = window.location.hash.substring(1) || 'home';
	switchTab(hash);

	// close mobile menu when navigating
	if (navTabs && navTabs.classList.contains('mobile-active')) {
		closeMobileMenu();
	}

	// override any browser scrolling/jump
	requestAnimationFrame(() => window.scrollTo(0, 0));
});

// Link click handling: use history.pushState instead of setting location.hash
navLinks.forEach(link => {
	link.addEventListener('click', (e) => {
		e.preventDefault();

		const tabId = link.getAttribute('data-tab');

		// update URL without causing an automatic scroll/jump
		if (window.location.hash.substring(1) !== tabId) {
			history.pushState({ tab: tabId }, '', `#${tabId}`);
		}

		switchTab(tabId);

		// Close mobile menu if open
		if (navTabs && navTabs.classList.contains('mobile-active')) {
			closeMobileMenu();
		}

		// Force scroll to top after layout updates to avoid any visual jump
		requestAnimationFrame(() => window.scrollTo(0, 0));
	});
});

// Mobile Menu Functionality
const hamburgerMenu = document.getElementById('hamburgerMenu');
const closeMenu = document.getElementById('closeMenu');
const mobileOverlay = document.getElementById('mobileOverlay');

// Function to open mobile menu
function openMobileMenu() {
    navTabs.classList.add('mobile-active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Function to close mobile menu
function closeMobileMenu() {
    navTabs.classList.remove('mobile-active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listener for hamburger menu
if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', openMobileMenu);
}

// Event listener for close button
if (closeMenu) {
    closeMenu.addEventListener('click', closeMobileMenu);
}

// Event listener for overlay (click outside to close)
if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
}

// Close menu on escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navTabs.classList.contains('mobile-active')) {
        closeMobileMenu();
    }
});

// ============================================
// SCROLL WHEEL SUPPORT FOR NAVIGATION SIDEBAR
// ============================================

if (navTabs) {
	// Add horizontal scroll support using mouse wheel
	navTabs.addEventListener('wheel', (e) => {
		// Check if content is scrollable (has overflow)
		const hasVerticalScroll = navTabs.scrollHeight > navTabs.clientHeight;
		
		if (hasVerticalScroll) {
			// Allow native vertical scrolling
			return;
		}
		
		// If shift key is held, allow horizontal scroll
		if (e.shiftKey) {
			e.preventDefault();
			navTabs.scrollLeft += e.deltaY;
		}
	}, { passive: false });

	// Add smooth scrolling behavior
	navTabs.style.scrollBehavior = 'smooth';

	// Optional: Add keyboard navigation for sidebar
	navTabs.addEventListener('keydown', (e) => {
		// Arrow keys for navigation when sidebar is focused
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			navTabs.scrollTop += 40;
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			navTabs.scrollTop -= 40;
		} else if (e.key === 'Home') {
			e.preventDefault();
			navTabs.scrollTop = 0;
		} else if (e.key === 'End') {
			e.preventDefault();
			navTabs.scrollTop = navTabs.scrollHeight;
		}
	});
}

