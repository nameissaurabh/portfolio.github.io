document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Typing Effect for Hero --- */
    const textElement = document.querySelector('.glitch-text');
    if (textElement) {
        // Simple manual typing effect replacement or glitch trigger
        const text = textElement.getAttribute('data-text');
        textElement.innerText = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                textElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100); // Typing speed
            } else {
                // After typing, maybe add a blinking cursor class
                textElement.classList.add('finished-typing');
            }
        }
        
        // Start after a small delay
        setTimeout(typeWriter, 500);
    }

    /* --- 2. Intersection Observer for Scroll Animations --- */
    const observerOptions = {
        threshold: 0.2, // Trigger when 20% of item is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special handling for progress bars
                if (entry.target.classList.contains('progress-bar')) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.querySelector('div').style.width = width;
                }
                
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe Timeline Items
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });

    // Observe Project Cards (staggered fade in? or just fade up)
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 100}ms`; // staggered delay
        card.classList.add('hidden-fade'); // Add initial hidden state in JS or CSS
        observer.observe(card);
    });
    
    // Manual helper for project card fade
    // (Note: We need to add .hidden-fade css or handle it here. 
    // Let's just add a class that does the translate/opacity in CSS)
    
    // Observe Progress Bars
    document.querySelectorAll('.progress-bar').forEach(bar => {
        observer.observe(bar);
    });

    /* --- 3. Navbar Scroll Effect --- */
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 10px 30px -10px rgba(2, 12, 27, 0.7)";
            navbar.style.padding = "15px 50px"; // Shrink slightly
        } else {
            navbar.style.boxShadow = "none";
            navbar.style.padding = "20px 50px";
        }

        // Hide/Show on scroll direction
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            navbar.style.transform = "translateY(-100%)";
        } else {
            navbar.style.transform = "translateY(0)";
        }
        lastScrollY = window.scrollY;
    });

});
