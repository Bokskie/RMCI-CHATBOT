document.addEventListener('DOMContentLoaded', function() {
    const disclaimerOverlay = document.getElementById('disclaimer-overlay');
    const acceptButton = document.getElementById('accept-disclaimer-btn');
    const body = document.body;

    if (!disclaimerOverlay || !acceptButton) {
        console.warn('Disclaimer elements not found. Skipping disclaimer logic.');
        return;
    }

    const hasAccepted = sessionStorage.getItem('disclaimerAccepted');

    if (!hasAccepted) {
        if (disclaimerOverlay) {
            disclaimerOverlay.classList.add('show');
            body.classList.add('no-scroll'); 
        }
    }

    if (acceptButton && disclaimerOverlay) {
        acceptButton.addEventListener('click', function() {
            disclaimerOverlay.classList.remove('show');
            body.classList.remove('no-scroll'); 
            sessionStorage.setItem('disclaimerAccepted', 'true'); 
        });
    }
});