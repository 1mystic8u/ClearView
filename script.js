document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Optional: Change hamburger icon to 'X'
            if (navLinks.classList.contains('active')) {
                hamburgerMenu.setAttribute('aria-expanded', 'true');
                // Change icon logic here if you have an 'X' icon
            } else {
                hamburgerMenu.setAttribute('aria-expanded', 'false');
                // Change back to hamburger icon
            }
        });
    }

    // Optional: Close menu when a link is clicked (for single-page apps or smooth scrolling)
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

    // Simple scroll reveal for elements not animated on load (if needed)
    // This is a basic example. For more complex scenarios, use Intersection Observer.
    // const animatedElements = document.querySelectorAll('.animate-on-scroll');
    // if (animatedElements.length > 0 && "IntersectionObserver" in window) {
    //     const observer = new IntersectionObserver((entries) => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 entry.target.classList.add('visible');
    //                 observer.unobserve(entry.target);
    //             }
    //         });
    //     }, { threshold: 0.1 });

    //     animatedElements.forEach(el => observer.observe(el));
    // } else { // Fallback for browsers that don't support IntersectionObserver
    //     animatedElements.forEach(el => el.classList.add('visible'));
    // }
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
