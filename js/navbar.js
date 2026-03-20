document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navbarMenu = document.getElementById('navbarMenu');

    hamburger.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
    });

    // Optional: Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.navbar-nav li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarMenu.classList.remove('active');
        });
    });
});