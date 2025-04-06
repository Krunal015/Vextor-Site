document.addEventListener('DOMContentLoaded', () => {

    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
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

            const name = contactForm.elements['name'].value.trim();
            const email = contactForm.elements['email'].value.trim();
            const message = contactForm.elements['message'].value.trim();

            if (!name || !email || !message) {
                formFeedback.textContent = 'Please fill out all fields.';
                formFeedback.className = 'mt-4 text-center text-sm text-red-600';
                return;
            }

            formFeedback.textContent = 'Thank you! Your message has been sent successfully.';
            formFeedback.className = 'mt-4 text-center text-sm text-green-600';

            setTimeout(() => {
                contactForm.reset();
                formFeedback.textContent = '';
                formFeedback.className = 'mt-4 text-center text-sm';
            }, 3000);

        });
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('#mobile-menu a, #navbar a:not(#mobile-menu-button)');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (!linkHref) return;

        const linkPage = linkHref.split('/').pop();
        let isActive = false;

        if (currentPage === 'index.html' || currentPage === '') {
            isActive = (linkPage === 'index.html' || linkPage === '');
        } else {
            isActive = (currentPage === linkPage);
        }


        if (isActive) {
            link.classList.add('text-indigo-500');
            link.classList.remove('text-gray-700');
            link.classList.add('font-semibold');
        } else {
            link.classList.remove('text-indigo-500');
            link.classList.add('text-gray-700');
            link.classList.remove('font-semibold');
        }
    });


    const countUpElements = document.querySelectorAll('.count-up');
    countUpElements.forEach(el => {
        const target = parseInt(el.textContent, 10);
        if (isNaN(target)) return;

        el.textContent = '0';
        let current = 0;
        const increment = Math.max(1, Math.ceil(target / 100));

        const updateCount = () => {
            current += increment;
            if (current < target) {
                el.textContent = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                el.textContent = target;
            }
        };

        let observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(updateCount, 200);
                observer.unobserve(el);
            }
        }, { threshold: 0.1 });

        observer.observe(el);
    });

});