document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccessMessage');
    const subjectInput = document.getElementById('subject');

    if (!form || !successMessage || !subjectInput) {
        console.warn('Contact form elements not found. Skipping form logic.');
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const doctorName = urlParams.get('doctor');

    if (doctorName) {
        subjectInput.value = `Appointment Request for ${doctorName}`;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const formElement = event.target;
        const data = new FormData(event.target);
        
        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formElement.style.display = 'none';
                successMessage.style.display = 'block';
                formElement.reset();
            } else {
                response.json().then(errorData => {
                    const errorMessage = errorData.errors ? errorData.errors.map(e => e.message).join(', ') : 'Please try again.';
                    alert(`Oops! There was a problem: ${errorMessage}`);
                }).catch(() => {
                    alert('Oops! There was a problem submitting your form. Please try again.');
                });
            }
        } catch (error) {
            alert('Oops! There was a network problem. Please check your connection and try again.');
        }
    }

    form.addEventListener("submit", handleSubmit);
});