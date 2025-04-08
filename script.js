// Initialize Particles.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed!');
    
    // Particles.js configuration
    if (typeof particlesJS !== 'undefined') {
        console.log('Initializing particles.js');
        particlesJS("particles-js", {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 3,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });
    } else {
        console.warn('particles.js is not loaded');
    }

    // Navigation scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                navToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // Close navigation when clicking on links
        document.querySelectorAll('.nav-links a').forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // Certificate modal
    const certificateImg = document.getElementById('certificate-img');
    const certificateModal = document.getElementById('certificate-modal');
    const modalClose = document.getElementById('modal-close');

    if (certificateImg && certificateModal && modalClose) {
        certificateImg.addEventListener('click', function() {
            certificateModal.classList.add('active');
            console.log('Certificate modal opened');
        });

        modalClose.addEventListener('click', function() {
            certificateModal.classList.remove('active');
        });

        certificateModal.addEventListener('click', function(e) {
            if (e.target === certificateModal) {
                certificateModal.classList.remove('active');
            }
        });
    }

    // Project filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(function(filterBtn) {
                    filterBtn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                console.log('Filtering projects by:', filterValue);
                
                projectCards.forEach(function(card) {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Scroll animations - Enhanced version with better detection
    const animateElements = function() {
        console.log('Checking for elements to animate...');
        const elements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
        
        elements.forEach(element => {
            // Check if element already has active class
            if (!element.classList.contains('active')) {
                const position = element.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                // If element is in viewport (with buffer)
                if (position.top < windowHeight - 100) {
                    console.log('Animating element:', element);
                    element.classList.add('active');
                }
            }
        });
    };

    // Initial check for elements in viewport
    // Delay initial check to ensure DOM is ready and positioned correctly
    setTimeout(function() {
        animateElements();
    }, 300);
    
    // Check on scroll with throttling for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                animateElements();
                scrollTimeout = null;
            }, 100);
        }
    });

    // Initialize GSAP ScrollTrigger if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        console.log('GSAP and ScrollTrigger available, initializing advanced animations');
        gsap.registerPlugin(ScrollTrigger);

        // Fade up animations
        const fadeUpElements = document.querySelectorAll('.fade-up');
        fadeUpElements.forEach(elem => {
            gsap.from(elem, {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        });

        // Fade left animations
        const fadeLeftElements = document.querySelectorAll('.fade-left');
        fadeLeftElements.forEach(elem => {
            gsap.from(elem, {
                x: -50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        });

        // Fade right animations
        const fadeRightElements = document.querySelectorAll('.fade-right');
        fadeRightElements.forEach(elem => {
            gsap.from(elem, {
                x: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        });
    } else {
        console.log('Using standard animations (GSAP not detected)');
    }

    // Trigger animations on load for elements already in viewport
    window.addEventListener('load', function() {
        animateElements();
    });

    // Contact form submission (mock)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! This is a demo form, and in a real implementation, your message would be sent.');
            contactForm.reset();
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Force animation of elements that should be visible on page load
    const elementsInView = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
    elementsInView.forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight) {
            console.log('Forcing animation on already visible element:', element);
            element.classList.add('active');
        }
    });
});
// Project modals with slideshow
const projectBtns = document.querySelectorAll('.view-project-btn');
const allModals = document.querySelectorAll('.modal');
const allModalCloseButtons = document.querySelectorAll('.modal-close');

if (projectBtns.length > 0) {
    // Open project modal when clicking "View Project"
    projectBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                // Open the modal
                modal.classList.add('active');
                console.log('Project modal opened:', modalId);
                
                // Initialize slideshow for this modal
                initSlideshow(modal);
            }
        });
    });

    // Close modal when clicking the close button
    allModalCloseButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Close modal when clicking outside the modal content
    allModals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });

    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            allModals.forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
    
    // Initialize slideshow functionality
    function initSlideshow(modal) {
        const slideWrapper = modal.querySelector('.slide-wrapper');
        const slides = slideWrapper.querySelectorAll('.slide');
        const prevArrow = modal.querySelector('.prev-arrow');
        const nextArrow = modal.querySelector('.next-arrow');
        const dotsContainer = modal.querySelector('.slide-dots');
        
        let currentSlide = 0;
        
        // Create dots based on number of slides
        dotsContainer.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slide-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        // Show first slide initially
        showSlide(0);
        
        // Next/previous controls
        prevArrow.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
        
        nextArrow.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
        
        // Keyboard navigation
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                showSlide(currentSlide - 1);
            } else if (e.key === 'ArrowRight') {
                showSlide(currentSlide + 1);
            }
        });
        
        // Function to show a specific slide
        function showSlide(n) {
            // Handle wrapping around
            if (n >= slides.length) {
                currentSlide = 0;
            } else if (n < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = n;
            }
            
            // Hide all slides and remove active class from dots
            slides.forEach(slide => slide.classList.remove('active'));
            const dots = dotsContainer.querySelectorAll('.slide-dot');
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Show the current slide and activate the corresponding dot
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        // Enable swiping on touch devices
        let touchStartX = 0;
        let touchEndX = 0;
        
        slideWrapper.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        slideWrapper.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Swipe left, show next slide
                showSlide(currentSlide + 1);
            } else if (touchEndX > touchStartX + 50) {
                // Swipe right, show previous slide
                showSlide(currentSlide - 1);
            }
        }
    }
}