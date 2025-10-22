document.addEventListener("DOMContentLoaded", () => {

    const doctorCards = document.querySelectorAll(".doctor-card");
    const detailsModal = document.getElementById("doctorModal");
    const detailsCloseButton = detailsModal.querySelector(".close-button");
    const modalDoctorImage = document.getElementById("modalDoctorImage");
    const modalDoctorName = document.getElementById("modalDoctorName");
    const modalDoctorSpecialty = document.getElementById("modalDoctorSpecialty");
    const modalDoctorContact = document.getElementById("modalDoctorContact");
    const modalDoctorSchedule = document.getElementById("modalDoctorSchedule");
    const modalDoctorRoom = document.getElementById("modalDoctorRoom");
    const modalDoctorAffiliations = document.getElementById("modalDoctorAffiliations");
    const modalDoctorBio = document.getElementById("modalDoctorBio");
    const modalAppointmentBtn = document.getElementById("modalAppointmentBtn");
    
    const appointmentModal = document.getElementById("appointmentRequestModal");
    const appointmentCloseButton = appointmentModal.querySelector(".close-button");
    const appointmentForm = document.getElementById("appointmentForm");
    const appointmentDoctorName = document.getElementById("appointmentDoctorName");
    const doctorNameInput = document.getElementById("doctorNameInput");
    const subjectInput = document.getElementById("subjectInput");
    const appointmentSuccessMessage = document.getElementById("appointmentSuccessMessage");
    
    if (!detailsModal || !appointmentModal) {
        return;
    }
    
    doctorCards.forEach(card => {
        card.addEventListener("click", () => {
            const doctorData = card.dataset;
            
            modalDoctorName.textContent = doctorData.name;
            modalDoctorSpecialty.textContent = doctorData.specialty;
            modalDoctorContact.textContent = doctorData.contact;
            modalDoctorSchedule.textContent = doctorData.schedule;
            modalDoctorRoom.textContent = doctorData.room;
            modalDoctorAffiliations.textContent = doctorData.affiliations;
            modalDoctorBio.textContent = doctorData.bio;
            modalDoctorImage.src = doctorData.image;
            
            detailsModal.style.display = "block";
            
            modalAppointmentBtn.onclick = () => {
                detailsModal.style.display = "none";
                
                appointmentDoctorName.textContent = doctorData.name;
                doctorNameInput.value = doctorData.name;
                subjectInput.value = `New Appointment Request for ${doctorData.name}`;
                
                appointmentForm.style.display = 'block';
                appointmentSuccessMessage.style.display = 'none';
                appointmentForm.reset();
                
                appointmentModal.style.display = "block";
            };
        });
    });
    
    detailsCloseButton.addEventListener("click", () => {
        detailsModal.style.display = "none";
    });
    
    appointmentCloseButton.addEventListener("click", () => {
        appointmentModal.style.display = "none";
    });
    
    window.addEventListener("click", (event) => {
        if (event.target === detailsModal) {
            detailsModal.style.display = "none";
        }
        if (event.target === appointmentModal) {
            appointmentModal.style.display = "none";
        }
    });
    
    async function handleFormSubmit(event, form, successMessageElement) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                form.style.display = 'none';
                successMessageElement.style.display = 'block';
            } else {
                alert('Oops! There was a problem submitting your request. Please try again.');
            }
        } catch (error) {
            alert('Oops! There was a network problem. Please check your connection and try again.');
        }
    }
    appointmentForm.addEventListener("submit", (event) => {
        handleFormSubmit(event, appointmentForm, appointmentSuccessMessage);
    });
});
