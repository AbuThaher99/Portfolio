// Existing JavaScript for the certificate popup
const certificateImage = document.getElementById('certificate-image');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close-btn');

// Open the overlay when the certificate image is clicked
certificateImage.addEventListener('click', () => {
    overlay.classList.add('active');
});

// Close the overlay when the close button is clicked
closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
});

// Close the overlay when clicking outside the image
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.classList.remove('active');
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(element => {
        observer.observe(element);
    });
});
function toggleMenu() {
    document.querySelector(".menu-toggle").classList.toggle("active");
    document.querySelector("nav ul").classList.toggle("show");
}
