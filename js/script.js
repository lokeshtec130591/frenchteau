// Language Toggle
let currentLang = 'en';

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'fr' : 'en';
    document.querySelectorAll('.lang-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.lang-' + currentLang).forEach(section => {
        section.classList.add('active');
    });
    localStorage.setItem('preferredLanguage', currentLang);
}

// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);

    const icon = document.querySelector('.theme-icon');
    icon.textContent = newTheme === 'dark' ? '☀️' : '🌙';

    localStorage.setItem('preferredTheme', newTheme);
}

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Load saved preferences
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('preferredTheme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const icon = document.querySelector('.theme-icon');
    icon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    if (savedLang !== currentLang) {
        toggleLanguage();
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Form submission
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        alert(currentLang === 'en'
            ? 'Thank you! We will contact you soon.'
            : 'Merci! Nous vous contacterons bientôt.');
        this.reset();
    });
});

// Add bounce effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function () {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});