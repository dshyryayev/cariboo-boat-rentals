document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation
    const rentalForm = document.getElementById('rental-form');
    if (rentalForm) {
        rentalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const startDate = document.getElementById('start-date');
            const endDate = document.getElementById('end-date');
            const message = document.getElementById('message');
            
            // Reset previous error states
            const formElements = [name, email, startDate, endDate, message];
            formElements.forEach(el => {
                if (el) {
                    el.style.borderColor = '#ddd';
                }
            });
            
            // Validate required fields
            if (!name || name.value.trim() === '') {
                if (name) name.style.borderColor = 'red';
                isValid = false;
            }
            
            if (!email || email.value.trim() === '') {
                if (email) email.style.borderColor = 'red';
                isValid = false;
            } else if (email && !isValidEmail(email.value)) {
                email.style.borderColor = 'red';
                isValid = false;
            }
            
            if (!startDate || startDate.value === '') {
                if (startDate) startDate.style.borderColor = 'red';
                isValid = false;
            }
            
            if (!endDate || endDate.value === '') {
                if (endDate) endDate.style.borderColor = 'red';
                isValid = false;
            }
            
            if (startDate && endDate && new Date(startDate.value) > new Date(endDate.value)) {
                if (startDate) startDate.style.borderColor = 'red';
                if (endDate) endDate.style.borderColor = 'red';
                alert('End date must be after start date');
                isValid = false;
            }
            
            if (!message || message.value.trim() === '') {
                if (message) message.style.borderColor = 'red';
                isValid = false;
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server here
                alert('Thank you for your message! We will get back to you soon.');
                rentalForm.reset();
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
    }

    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.padding = '10px 0';
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '15px 0';
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Gallery image click for larger view (simple lightbox)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;
            const title = this.querySelector('.gallery-info h3').textContent;
            const description = this.querySelector('.gallery-info p').textContent;
            
            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            const lightboxContent = document.createElement('div');
            lightboxContent.className = 'lightbox-content';
            
            const closeBtn = document.createElement('span');
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '&times;';
            
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = imgAlt;
            
            const captionContainer = document.createElement('div');
            captionContainer.className = 'lightbox-caption';
            
            const captionTitle = document.createElement('h3');
            captionTitle.textContent = title;
            
            const captionText = document.createElement('p');
            captionText.textContent = description;
            
            // Assemble lightbox
            captionContainer.appendChild(captionTitle);
            captionContainer.appendChild(captionText);
            
            lightboxContent.appendChild(closeBtn);
            lightboxContent.appendChild(img);
            lightboxContent.appendChild(captionContainer);
            
            lightbox.appendChild(lightboxContent);
            
            // Add to body
            document.body.appendChild(lightbox);
            
            // Prevent scrolling when lightbox is open
            document.body.style.overflow = 'hidden';
            
            // Close lightbox when clicking close button or outside the image
            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            function closeLightbox() {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }
            
            // Close on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                }
            });
        });
    });

    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 80vh;
            display: block;
            border-radius: 5px;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            font-size: 30px;
            color: white;
            cursor: pointer;
        }
        
        .lightbox-caption {
            color: white;
            text-align: center;
            padding: 10px 0;
        }
        
        .lightbox-caption h3 {
            margin-bottom: 5px;
        }
    `;
    document.head.appendChild(style);
});
