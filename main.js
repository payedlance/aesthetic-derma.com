document.addEventListener('DOMContentLoaded', () => {
    /* 
     * Language Toggle Logic 
     */
    const langBtns = document.querySelectorAll('.lang-btn');
    const currLang = localStorage.getItem('ad_lang') || 'EN';

    function setLanguage(lang) {
        langBtns.forEach(btn => {
            if (btn.dataset.setLang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        const elements = document.querySelectorAll('[data-lang-en], [data-lang-my]');
        elements.forEach(el => {
            if (lang === 'EN') {
                if (el.dataset.langEn) el.innerHTML = el.dataset.langEn;
            } else {
                if (el.dataset.langMy) el.innerHTML = el.dataset.langMy;
            }
        });

        localStorage.setItem('ad_lang', lang);
    }

    // Initialize lang
    setLanguage(currLang);

    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            setLanguage(e.target.dataset.setLang);
        });
    });

    /*
     * Sticky Header Functionality
     */
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /*
     * Scroll Reveal Animation using IntersectionObserver
     */
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /*
     * FAQ Accordion Logic
     */
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            // close all others optionally
            faqItems.forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    /*
     * Before/After Slider Logic
     */
    const sliders = document.querySelectorAll('.compare-slider');

    sliders.forEach(slider => {
        let isDown = false;
        const handle = slider.querySelector('.slider-handle');
        const beforeImg = slider.querySelector('.slider-before');

        function slide(e) {
            if (!isDown && e.type !== 'touchmove') return;

            const sliderRect = slider.getBoundingClientRect();
            // x position within the slider
            let x = (e.pageX || e.touches[0].pageX) - sliderRect.left;

            // Stop the handle from going outside bounds
            x = Math.max(0, Math.min(x, sliderRect.width));

            let percent = (x / sliderRect.width) * 100;

            handle.style.left = percent + '%';
            beforeImg.style.width = percent + '%';
        }

        slider.addEventListener('mousedown', () => isDown = true);
        slider.addEventListener('mouseup', () => isDown = false);
        slider.addEventListener('mouseleave', () => isDown = false);
        slider.addEventListener('mousemove', slide);

        // touch events
        slider.addEventListener('touchstart', () => isDown = true);
        slider.addEventListener('touchend', () => isDown = false);
        slider.addEventListener('touchmove', slide);
    });

    /*
     * Gallery Filtering Logic
     */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterBtns.forEach(f => f.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    /*
     * Mobile Menu Logic
     */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    const dropdownToggles = document.querySelectorAll('.dropdown > a');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                toggle.parentElement.classList.toggle('active');
            }
        });
    });

});
