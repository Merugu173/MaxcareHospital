// Hospital Website JavaScript

// State management
let currentPage = 'home';
let mobileMenuOpen = false;

// DOM elements
const navLinks = document.querySelectorAll('.nav-link');
const pageContents = document.querySelectorAll('.page-content');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navList = document.querySelector('.nav-list');
const footerLinks = document.querySelectorAll('.footer-links a[data-page]');
const heroButtons = document.querySelectorAll('.hero-buttons .btn[data-page]');
const blogLinks = document.querySelectorAll('.blog-link[data-page]');
const doctorButtons = document.querySelectorAll('.doctor-card .btn[data-page]');
const contactForm = document.querySelector('.contact-form');

// Initialize the application
function init() {
    setupEventListeners();
    setupFormHandling();
    updateActiveStates();
    console.log('Maxcare Hospital website initialized');
}

// Setup all event listeners
function setupEventListeners() {
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Footer navigation links
    footerLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Hero section buttons
    heroButtons.forEach(button => {
        button.addEventListener('click', handleNavigation);
    });
    
    // Blog navigation links
    blogLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Doctor profile buttons
    doctorButtons.forEach(button => {
        button.addEventListener('click', handleNavigation);
    });
    
    // Enhanced navigation for new elements
    document.querySelectorAll('.btn-appointment, .btn-profile, .btn-read-more, .btn-read-featured').forEach(button => {
        button.addEventListener('click', handleNavigation);
    });
    
    // Blog category filter
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', handleCategoryFilter);
    });
    
    // Newsletter subscription
    const newsletterBtns = document.querySelectorAll('.newsletter-subscribe-btn, .newsletter-btn');
    newsletterBtns.forEach(btn => {
        btn.addEventListener('click', handleNewsletterSubscription);
    });
    
    // Social share buttons
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', handleSocialShare);
    });
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenuOpen && !e.target.closest('.nav') && !e.target.closest('.mobile-menu-toggle')) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Handle navigation between pages
function handleNavigation(e) {
    e.preventDefault();
    
    const targetPage = e.target.getAttribute('data-page');
    if (targetPage && targetPage !== currentPage) {
        navigateToPage(targetPage);
    }
}

// Navigate to a specific page
function navigateToPage(page) {
    // Hide all pages
    pageContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Show target page
    const targetContent = document.getElementById(page);
    if (targetContent) {
        targetContent.classList.add('active');
        currentPage = page;
        
        // Update browser history
        window.history.pushState({ page: page }, '', `#${page}`);
        
        // Update active navigation states
        updateActiveStates();
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Close mobile menu if open
        closeMobileMenu();
        
        // Log navigation for debugging
        console.log(`Navigated to: ${page}`);
    }
}

// Update active states for navigation
function updateActiveStates() {
    // Update nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    
    if (mobileMenuOpen) {
        openMobileMenu();
    } else {
        closeMobileMenu();
    }
}

// Open mobile menu
function openMobileMenu() {
    if (navList) {
        navList.style.display = 'flex';
        navList.style.flexDirection = 'column';
        navList.style.position = 'absolute';
        navList.style.top = '100%';
        navList.style.left = '0';
        navList.style.right = '0';
        navList.style.background = 'white';
        navList.style.boxShadow = 'var(--shadow-lg)';
        navList.style.padding = 'var(--space-16)';
        navList.style.gap = 'var(--space-16)';
        navList.style.zIndex = '1001';
    }
    
    // Animate hamburger menu
    if (mobileMenuToggle) {
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    }
    
    mobileMenuOpen = true;
}

// Close mobile menu
function closeMobileMenu() {
    if (navList) {
        navList.style.display = '';
        navList.style.flexDirection = '';
        navList.style.position = '';
        navList.style.top = '';
        navList.style.left = '';
        navList.style.right = '';
        navList.style.background = '';
        navList.style.boxShadow = '';
        navList.style.padding = '';
        navList.style.gap = '';
        navList.style.zIndex = '';
    }
    
    // Reset hamburger menu
    if (mobileMenuToggle) {
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
    
    mobileMenuOpen = false;
}

// Handle window resize
function handleResize() {
    if (window.innerWidth > 768 && mobileMenuOpen) {
        closeMobileMenu();
    }
}

// Setup form handling
function setupFormHandling() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

// Handle contact form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formObject = {};
    
    // Convert FormData to object
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !formObject[field] || formObject[field].trim() === '');
    
    if (missingFields.length > 0) {
        showNotification('Please fill in all required fields: ' + missingFields.join(', '), 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formObject.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Validate phone number (basic validation)
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(formObject.phone)) {
        showNotification('Please enter a valid phone number', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your appointment request! We will contact you soon.', 'success');
    
    // Reset form
    contactForm.reset();
    
    // Log form submission for debugging
    console.log('Form submitted:', formObject);
}

// Show notification to user
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: 'var(--space-16) var(--space-24)',
        borderRadius: 'var(--radius-base)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: '10000',
        fontSize: 'var(--font-size-sm)',
        fontWeight: 'var(--font-weight-medium)',
        maxWidth: '400px',
        wordWrap: 'break-word'
    });
    
    // Set colors based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = 'var(--color-success)';
            notification.style.color = 'white';
            break;
        case 'error':
            notification.style.backgroundColor = 'var(--color-error)';
            notification.style.color = 'white';
            break;
        case 'warning':
            notification.style.backgroundColor = 'var(--color-warning)';
            notification.style.color = 'white';
            break;
        default:
            notification.style.backgroundColor = 'var(--hospital-teal)';
            notification.style.color = 'white';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform var(--duration-normal) var(--ease-standard)';
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 250);
    }, 5000);
    
    // Allow manual removal by clicking
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 250);
    });
}

// Handle browser back/forward navigation
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
        currentPage = e.state.page;
        
        // Hide all pages
        pageContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Show target page
        const targetContent = document.getElementById(currentPage);
        if (targetContent) {
            targetContent.classList.add('active');
            updateActiveStates();
        }
    }
});

// Handle page load from URL hash
function handleInitialPageLoad() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        navigateToPage(hash);
    } else {
        // Set initial state
        window.history.replaceState({ page: 'home' }, '', '#home');
    }
}

// Utility functions for animations and interactions
function addScrollAnimations() {
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
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.specialty-card, .doctor-card, .blog-card, .stat-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add smooth hover effects
function setupHoverEffects() {
    const cards = document.querySelectorAll('.specialty-card, .doctor-card, .blog-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    handleInitialPageLoad();
    addScrollAnimations();
    setupHoverEffects();
    addEnhancedAnimations();
    setupEnhancedHoverEffects();
    enhanceFormValidation();
});

// Handle blog category filtering
function handleCategoryFilter(e) {
    e.preventDefault();
    
    const clickedBtn = e.target;
    const category = clickedBtn.getAttribute('data-category');
    
    // Update active state
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    clickedBtn.classList.add('active');
    
    // Filter blog posts (for future implementation with actual filtering)
    const blogPosts = document.querySelectorAll('.blog-post-professional');
    
    blogPosts.forEach(post => {
        if (category === 'all') {
            post.style.display = 'block';
        } else {
            // This is a placeholder for actual category filtering
            // In a real implementation, you'd check the post's category
            post.style.display = 'block';
        }
    });
    
    showNotification(`Showing ${category === 'all' ? 'all' : category} articles`, 'info');
}

// Handle newsletter subscription
function handleNewsletterSubscription(e) {
    e.preventDefault();
    
    const emailInput = e.target.closest('.newsletter-form, .newsletter-form-blog').querySelector('input[type="email"], .newsletter-email-input, .newsletter-input');
    
    if (emailInput) {
        const email = emailInput.value.trim();
        
        if (!email) {
            showNotification('Please enter your email address', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate subscription
        showNotification('Thank you for subscribing to our health newsletter!', 'success');
        emailInput.value = '';
        
        console.log('Newsletter subscription:', email);
    }
}

// Handle social sharing
function handleSocialShare(e) {
    e.preventDefault();
    
    const postTitle = e.target.closest('.blog-post-professional').querySelector('.blog-post-title').textContent;
    const shareText = `Check out this health article: ${postTitle} - Maxcare Hospitals`;
    
    // Use Web Share API if available, otherwise show notification
    if (navigator.share) {
        navigator.share({
            title: 'Maxcare Hospitals Health Article',
            text: shareText,
            url: window.location.href
        }).catch(err => {
            console.log('Error sharing:', err);
        });
    } else {
        // Fallback: copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText + ' - ' + window.location.href)
                .then(() => {
                    showNotification('Article link copied to clipboard!', 'success');
                })
                .catch(() => {
                    showNotification('Sharing not supported on this device', 'info');
                });
        } else {
            showNotification('Sharing not supported on this device', 'info');
        }
    }
}

// Enhanced animations for new elements
function addEnhancedAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('doctor-professional-card') || 
                    entry.target.classList.contains('blog-post-professional') ||
                    entry.target.classList.contains('department-card')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 100}ms`;
                }
            }
        });
    }, observerOptions);
    
    // Observe new elements for scroll animations
    const animateElements = document.querySelectorAll(
        '.doctor-professional-card, .blog-post-professional, .department-card, ' +
        '.featured-blog-post, .blog-newsletter-card'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Enhanced hover effects for new elements
function setupEnhancedHoverEffects() {
    const professionalCards = document.querySelectorAll(
        '.doctor-professional-card, .blog-post-professional, .department-card'
    );
    
    professionalCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Enhanced button hover effects
    const enhancedButtons = document.querySelectorAll(
        '.btn-appointment, .btn-profile, .btn-read-more, .btn-read-featured'
    );
    
    enhancedButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.transition = 'transform 0.2s ease';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
}

// Enhanced form validation
function enhanceFormValidation() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    
    emailInputs.forEach(input => {
        input.addEventListener('blur', validateEmailInput);
        input.addEventListener('input', clearValidationError);
    });
    
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('blur', validatePhoneInput);
        input.addEventListener('input', clearValidationError);
    });
}

function validateEmailInput(e) {
    const input = e.target;
    const email = input.value.trim();
    
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showInputError(input, 'Please enter a valid email address');
    }
}

function validatePhoneInput(e) {
    const input = e.target;
    const phone = input.value.trim();
    
    if (phone && !/^[+]?[\d\s\-\(\)]{10,}$/.test(phone)) {
        showInputError(input, 'Please enter a valid phone number');
    }
}

function showInputError(input, message) {
    input.style.borderColor = 'var(--color-error)';
    
    // Remove any existing error message
    const existingError = input.parentNode.querySelector('.input-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'input-error';
    errorDiv.textContent = message;
    errorDiv.style.color = 'var(--color-error)';
    errorDiv.style.fontSize = 'var(--font-size-xs)';
    errorDiv.style.marginTop = 'var(--space-4)';
    
    input.parentNode.appendChild(errorDiv);
}

function clearValidationError(e) {
    const input = e.target;
    input.style.borderColor = '';
    
    const errorDiv = input.parentNode.querySelector('.input-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Export functions for potential external use
window.MaxcareHospital = {
    navigateToPage,
    showNotification,
    currentPage: () => currentPage,
    handleCategoryFilter,
    handleNewsletterSubscription
};