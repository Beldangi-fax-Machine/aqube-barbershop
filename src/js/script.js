// Mobile Navigation
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('header');
let isMenuOpen = false;
let lastScroll = 0;

// Toggle mobile menu with animation
navToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    
    // Add animation to menu items
    if (isMenuOpen) {
        navLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(20px)';
            setTimeout(() => {
                link.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateX(0)';
            }, 100 * index);
        });
    } else {
        navLinks.forEach(link => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(20px)';
        });
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) {
            isMenuOpen = false;
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset link animations
            navLinks.forEach(link => {
                link.style.opacity = '0';
                link.style.transform = 'translateX(20px)';
            });
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        isMenuOpen = false;
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset link animations
        navLinks.forEach(link => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(20px)';
        });
    }
});

// Add scroll-based header styling
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow and transform on scroll
    if (currentScroll > 50) {
        header.style.transform = 'translateY(-10px)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Active link highlighting with improved scroll detection
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

const observerOptions = {
    threshold: 0.2,
    rootMargin: '-100px 0px -50% 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').slice(1) === id) {
                    item.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Smooth Scrolling with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission with improved UX
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    // Simulate form submission
    setTimeout(() => {
        // Here you would typically send the form data to a server
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }, 1000);
});

// Enhanced Scroll to Top Button
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '↑';
scrollButton.className = 'scroll-top';
document.body.appendChild(scrollButton);

let isScrolling;

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.style.display = 'block';
        scrollButton.style.opacity = '1';
    } else {
        scrollButton.style.opacity = '0';
        setTimeout(() => {
            if (window.pageYOffset <= 300) {
                scrollButton.style.display = 'none';
            }
        }, 300);
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add some CSS for the scroll button
const style = document.createElement('style');
style.textContent = `
    .scroll-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: var(--secondary-color);
        width: 45px;
        height: 45px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: none;
        font-size: 20px;
        z-index: 1000;
        transition: var(--transition);
        opacity: 0;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .scroll-top:hover {
        background-color: #ffed4a;
        transform: translateY(-3px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    header.scroll-down {
        transform: translateY(-100%);
    }

    header.scroll-up {
        transform: translateY(0);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style);

// Services Section - 3D Card Animation
const cards = document.querySelectorAll('.card');
const carousel = document.querySelector('.card-3d');

// Pause animation on hover/touch
if (carousel) {
    carousel.addEventListener('mouseenter', () => {
        carousel.style.animationPlayState = 'paused';
        cards.forEach(card => {
            card.style.animationPlayState = 'paused';
        });
    });
    
    carousel.addEventListener('mouseleave', () => {
        carousel.style.animationPlayState = 'running';
        cards.forEach(card => {
            card.style.animationPlayState = 'running';
        });
    });
    
    // For mobile touch
    carousel.addEventListener('touchstart', () => {
        carousel.style.animationPlayState = 'paused';
        cards.forEach(card => {
            card.style.animationPlayState = 'paused';
        });
    }, {passive: true});
    
    carousel.addEventListener('touchend', () => {
        carousel.style.animationPlayState = 'running';
        cards.forEach(card => {
            card.style.animationPlayState = 'running';
        });
    }, {passive: true});
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Make sure services are visible
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        servicesSection.style.display = 'block';
    }
    
    // ... rest of your existing initialization code ...
});

// Book Now Button
const bookNowBtn = document.querySelector('.book-now-btn');
bookNowBtn.addEventListener('click', () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        const headerOffset = 80;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
});

// Background Image Transition
window.addEventListener('load', () => {
    console.log('Window loaded, initializing image transitions...');
    const backgroundImages = document.querySelectorAll('.gallery-background img');
    console.log('Found images:', backgroundImages.length);
    
    if (backgroundImages.length === 0) {
        console.error('No images found in gallery background!');
        return;
    }

    let currentImageIndex = 0;

    // Set initial state
    backgroundImages.forEach((img, index) => {
        if (index === 0) {
            img.style.opacity = '1';
            img.style.zIndex = '2';
        } else {
            img.style.opacity = '0';
            img.style.zIndex = '1';
        }
    });

    function transitionImages() {
        console.log('Transitioning images...');
        const currentImage = backgroundImages[currentImageIndex];
        const nextImageIndex = (currentImageIndex + 1) % backgroundImages.length;
        const nextImage = backgroundImages[nextImageIndex];

        // Fade out current image
        currentImage.style.opacity = '0';
        currentImage.style.zIndex = '1';
        
        // Fade in next image
        nextImage.style.opacity = '1';
        nextImage.style.zIndex = '2';
        
        // Update index
        currentImageIndex = nextImageIndex;
    }

    // Start transitions
    console.log('Starting image transitions...');
    setInterval(transitionImages, 3000);
});

// Service card functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Add click handlers to each book appointment button
    serviceCards.forEach((card) => {
        const bookBtn = card.querySelector('.book-appointment-btn');
        
        // Add click handler to the book appointment button
        if (bookBtn) {
            bookBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Scroll to contact section
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    const headerOffset = 80;
                    const elementPosition = contactSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
}); 