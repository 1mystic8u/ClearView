document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                hamburgerMenu.setAttribute('aria-expanded', 'true');
            } else {
                hamburgerMenu.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburgerMenu.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
});

// Add this to CSS if using the IntersectionObserver example above:
/*
.animate-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.animate-on-scroll.visible {
    opacity: 1;
    transform: translateY(0);
}
*/

// --- Bottom Navbar Active State ---
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.bottom-nav .nav-item');
    if (navLinks.length > 0) {
        const current = window.location.pathname.split('/').pop();
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && current && href === current) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
});
