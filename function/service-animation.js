document.addEventListener("DOMContentLoaded", function() {
    const serviceBoxes = document.querySelectorAll('.rmci-service-box');

    if (serviceBoxes.length === 0) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = index * 100; 
                entry.target.style.transitionDelay = `${delay}ms`;
                
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1 
    });

    serviceBoxes.forEach(box => observer.observe(box));
});