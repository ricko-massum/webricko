document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. GLOBAL LOGIC 
    // ==========================================

    // --- Mobile Menu Toggle ---
    const navMenu = document.getElementById('nav-menu');
    const menuBtn = document.querySelector('.menu-toggle'); 

    window.toggleMenu = function() {
        if (navMenu) {
            navMenu.classList.toggle('active');
        }
    };

    // Auto-close menu when a link is clicked
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(n => n.addEventListener("click", () => {
        if (navMenu) navMenu.classList.remove("active");
    }));


    // --- Shared Scroll Reveal ---
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        const revealPoint = 120;

        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    }


    // --- Logo Scroll Effect ---
    function handleLogoScroll() {
        const logoBadge = document.querySelector('.logo-badge') || document.getElementById('logoBadge');
        if (logoBadge) {
            if (window.scrollY > 50) {
                logoBadge.classList.add('scrolled');
            } else {
                logoBadge.classList.remove('scrolled');
            }
        }
    }

    // Attach Global Scroll Listeners
    window.addEventListener('scroll', () => {
        reveal();
        handleLogoScroll();
    });
    
    // Initial run for elements already in view
    reveal();
    handleLogoScroll();


    // ==========================================
    // 2. PAGE-SPECIFIC LOGIC 
    // ==========================================

    // --- Hero Slider (index.html) ---
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 0) {
        let currentSlide = 0;
        function nextSlide() {
            heroSlides.forEach(slide => slide.classList.remove('active'));
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
        }
        setInterval(nextSlide, 5000);
    }


    // --- Stats Counter (index.html) ---
    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
        const counters = document.querySelectorAll('.stat-number');
        let started = false;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !started) {
                started = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const increment = target / 60;
                    let count = 0;
                    const updateCount = () => {
                        count += increment;
                        if (count < target) {
                            counter.innerText = Math.ceil(count);
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
            }
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }


    // --- Modals (struki.html) ---
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        }
    };

    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };

    // Close modal if clicking outside the box
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });


    // --- History Slider (zaNas.html) ---
    const historySlides = document.querySelectorAll('.history-slide');
    if (historySlides.length > 0) {
        let currentHistoryIndex = 0;
        window.changeSlide = function(direction) {
            historySlides[currentHistoryIndex].classList.remove('active');
            currentHistoryIndex += direction;
            if (currentHistoryIndex >= historySlides.length) currentHistoryIndex = 0;
            if (currentHistoryIndex < 0) currentHistoryIndex = historySlides.length - 1;
            historySlides[currentHistoryIndex].classList.add('active');
        };
    }

});