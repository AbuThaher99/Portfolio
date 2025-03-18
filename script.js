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
   // Replace your current animateElements function with this one
// This uses a simpler, more reliable animation approach

document.addEventListener('DOMContentLoaded', function() {
    console.log('Animation fix loaded');
    
    // Force initial elements to be visible
    document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('active');
        }
    });
    
    // Simple check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Better scroll handler with improved throttling
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => {
                    if (!el.classList.contains('active') && isElementInViewport(el)) {
                        el.classList.add('active');
                        console.log('Animation triggered for', el);
                    }
                });
                scrollTimeout = null;
            }, 100);
        }
    });
    
    // Trigger a scroll event to check initial elements
    setTimeout(function() {
        window.dispatchEvent(new Event('scroll'));
    }, 500);
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
