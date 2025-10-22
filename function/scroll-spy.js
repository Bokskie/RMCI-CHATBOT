document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.about-content-section');
    const navLinks = document.querySelectorAll('.about-details-nav ul li a');

    if (sections.length === 0 || navLinks.length === 0) {
        return; 
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const observerOptions = {
        root: null, 
        rootMargin: '0px 0px -75% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                document.querySelector(`.about-details-nav a[href="#${id}"]`).classList.add('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});