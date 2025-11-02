// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Don't prevent default for links that point to other pages
        if (this.getAttribute('href').startsWith('#') && document.querySelector(this.getAttribute('href'))) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Active section highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        // Only update active state for internal links
        if (link.getAttribute('href').startsWith('#') && link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Optional: Hover sound effect
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        // Add subtle hover sound if desired
        // console.log('Hover sound would play here');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (navLinks && navLinks.classList.contains('active')) {
        if (!e.target.closest('.navbar') && !e.target.closest('.nav-links')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});