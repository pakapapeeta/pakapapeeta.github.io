// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scroll function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
    mobileMenuBtn.classList.toggle('active');
});

// Publications filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const publicationCards = document.querySelectorAll('.publication-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        publicationCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-type') === filter) {
                card.style.display = 'block';
                // Add fade-in animation
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 50);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Add CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(17, 24, 39, 0.95);
            backdrop-filter: blur(12px);
            flex-direction: column;
            padding: 24px;
            border-top: 1px solid rgba(75, 85, 99, 0.3);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-links.mobile-open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.highlight-card, .publication-card, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Navigation function for highlight cards
function navigateToSection(sectionId) {
    // Hide all detail sections
    const detailSections = document.querySelectorAll('.detail-section');
    detailSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Smooth scroll to section
        targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Update URL hash
        history.pushState(null, null, `#${sectionId}`);
    }
}

// Handle back button and direct URL access
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        setTimeout(() => {
            navigateToSection(hash);
        }, 100);
    }
});

window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        navigateToSection(hash);
    } else {
        // Hide all detail sections if no hash
        const detailSections = document.querySelectorAll('.detail-section');
        detailSections.forEach(section => {
            section.classList.remove('active');
        });
    }
});

// Add close button functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add close buttons to detail sections
    const detailSections = document.querySelectorAll('.detail-section');
    detailSections.forEach(section => {
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '× Close';
        closeButton.className = 'close-detail-btn';
        closeButton.onclick = () => {
            section.classList.remove('active');
            history.pushState(null, null, window.location.pathname);
        };
        
        const container = section.querySelector('.container');
        if (container) {
            container.insertBefore(closeButton, container.firstChild);
        }
    });
});

