document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // INITIALIZE LUCIDE ICONS
    // ==========================================================================
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ==========================================================================
    // STICKY HEADER & SCROLL EFFECT
    // ==========================================================================
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================================================
    // MOBILE NAVIGATION TOGGLE
    // ==========================================================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            
            // Toggle icon menu / close
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                const isOpened = navMenu.classList.contains('open');
                icon.setAttribute('data-lucide', isOpened ? 'x' : 'menu');
                lucide.createIcons({
                    nameAttr: 'data-lucide',
                    attrs: { class: 'lucide-icon' }
                });
            }
        });
    }

    // Close menu when clicking nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            }
        });
    });

    // ==========================================================================
    // ACTIVE NAVIGATION INDICATOR ON SCROLL (INTERSECTION OBSERVER)
    // ==========================================================================
    const sections = document.querySelectorAll('section[id]');
    
    const navObserverOptions = {
        threshold: 0.3,
        rootMargin: '-10% 0px -40% 0px'
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // ==========================================================================
    // SCROLL ANIMATIONS (INTERSECTION OBSERVER)
    // ==========================================================================
    const scrollAnimateElements = document.querySelectorAll('.fade-in-up');
    
    const animationObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                animationObserver.unobserve(entry.target); // Trigger only once
            }
        });
    }, animationObserverOptions);

    scrollAnimateElements.forEach(element => {
        animationObserver.observe(element);
    });

    // Apply scroll animations to section headers dynamically if not added
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach((header, index) => {
        header.classList.add('fade-in-up');
        animationObserver.observe(header);
    });

    // Apply scroll animations to cards
    const cardsToAnimate = document.querySelectorAll('.info-card, .skills-category, .service-card, .project-card, .channel-card, .contact-form-container');
    cardsToAnimate.forEach((card, index) => {
        card.classList.add('fade-in-up');
        card.style.transitionDelay = `${(index % 3) * 0.1}s`;
        animationObserver.observe(card);
    });

    // ==========================================================================
    // PROJECTS FILTERING SYSTEM
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Add fade-out transition first
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95) translateY(10px)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        // Re-trigger animation frame to apply styles
                        requestAnimationFrame(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1) translateY(0)';
                        });
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // ==========================================================================
    // CONTACT FORM SUBMISSION & VALIDATION
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formSubmitBtn = document.getElementById('form-submit-btn');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showMessage('Please fill in all fields.', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Button loading state
            const originalBtnContent = formSubmitBtn.innerHTML;
            formSubmitBtn.disabled = true;
            formSubmitBtn.innerHTML = `
                <span>Sending...</span>
                <i data-lucide="loader-2" class="spin"></i>
            `;
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            
            // Build the URL-encoded data for Google Forms
            const googleFormUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeK-fbfL6iZMxka3CzDgFzyHwIom7gPa9iVCu1ETzrzi-59ng/formResponse';
            const formData = new URLSearchParams();
            formData.append('entry.68205051', name);
            formData.append('entry.557332429', email);
            formData.append('entry.1086262081', subject);
            formData.append('entry.1073645259', message);

            // Send the request via fetch with mode: 'no-cors'
            fetch(googleFormUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            })
            .then(() => {
                // Restore button
                formSubmitBtn.disabled = false;
                formSubmitBtn.innerHTML = originalBtnContent;
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
                
                // Show success message
                showMessage('Message sent successfully! I will get back to you soon.', 'success');
                
                // Open confirmation modal
                const modal = document.getElementById('contact-modal');
                if (modal) {
                    modal.classList.add('active');
                }
                
                // Reset form
                contactForm.reset();
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
                
                // Restore button
                formSubmitBtn.disabled = false;
                formSubmitBtn.innerHTML = originalBtnContent;
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
                
                showMessage('Something went wrong. Please try again or email me directly.', 'error');
            });
        });
    }

    // Confirmation Modal Close Logic
    const modal = document.getElementById('contact-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    if (modal && modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        // Close modal when clicking outside the card
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    function showMessage(text, type) {
        if (!formMessage) return;
        
        formMessage.innerText = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block'; // Ensure the element is visible
        
        // Auto hide error after 5s, success remains visible longer
        if (type === 'error') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // ==========================================================================
    // FOOTER COPYRIGHT YEAR
    // ==========================================================================
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }
});
