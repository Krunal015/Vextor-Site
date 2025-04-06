document.addEventListener('DOMContentLoaded', () => {


    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
            menuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });
    }


    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }


    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();


            formFeedback.textContent = '';
            formFeedback.className = 'mt-4 text-center text-sm font-medium min-h-[20px]';

            const name = contactForm.elements['name']?.value.trim();
            const email = contactForm.elements['email']?.value.trim();
            const message = contactForm.elements['message']?.value.trim();


            if (!name || !email || !message) {
                formFeedback.textContent = 'Please fill out all required fields (Name, Email, Message).';
                formFeedback.classList.add('text-red-600');
                return;
            }


            formFeedback.textContent = 'Thank you! Your message has been received (Simulation).';
            formFeedback.classList.add('text-green-600');


            setTimeout(() => {
                contactForm.reset();
                formFeedback.textContent = '';
                formFeedback.className = 'mt-4 text-center text-sm font-medium min-h-[20px]';
            }, 4000);



        });
    }


    try {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        const navLinks = document.querySelectorAll('nav a.nav-link');

        navLinks.forEach(link => {
            if (!link.getAttribute('href')) return;

            const linkPage = link.getAttribute('href').split('/').pop() || 'index.html';


            const currentIsIndex = (currentPage === 'index.html' || currentPage === '');
            const linkIsIndex = (linkPage === 'index.html' || linkPage === '');
            const isActive = (currentIsIndex && linkIsIndex) || (linkPage !== 'index.html' && currentPage === linkPage);

            if (isActive) {
                link.classList.add('text-indigo-600', 'font-semibold');
                link.classList.remove('text-gray-700');
            } else {
                link.classList.remove('text-indigo-600', 'font-semibold');
                link.classList.add('text-gray-700');
            }
        });
    } catch (e) {
        console.error("Error setting active navigation link:", e);
    }



    const countUpElements = document.querySelectorAll('.count-up');

    const animateCountUp = (el) => {
        const target = parseInt(el.dataset.target || el.textContent, 10);
        if (isNaN(target)) {
            console.warn("Count-up target is not a number for element:", el);
            return;
        }

        el.textContent = '0';
        let current = 0;
        const duration = 1500;
        const stepTime = Math.abs(Math.floor(duration / target));
        const increment = Math.max(1, Math.ceil(target / (duration / 16)));

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                el.textContent = Math.ceil(current).toLocaleString();
            }
        }, 16);
    };


    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCountUp(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        countUpElements.forEach(el => {
            observer.observe(el);
        });
    } else {

        countUpElements.forEach(el => {
            animateCountUp(el);
        });
    }

});