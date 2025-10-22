# Rever Medical Center Inc. - Official Website

This is the official website for Rever Medical Center Inc. (RMCI), a DOH-licensed Level 1 General Hospital located in Jasaan, Misamis Oriental. The site is designed to provide essential information to patients, visitors, and the community. It is fully responsive and built with modern web technologies.

## ✨ Live Demo

You can view the live project deployed on GitHub Pages here:
**[https://your-github-username.github.io/your-repo-name/](https://your-github-username.github.io/your-repo-name/)**

*(Note: Replace the link above with your actual GitHub Pages URL after deployment.)*

---

## 🚀 Features

*   **Fully Responsive Design:** Adapts seamlessly to desktops, tablets, and mobile devices.
*   **Disclaimer Modal:** A session-based disclaimer that appears on the first visit.
*   **Find a Doctor:** A comprehensive directory of specialists with detailed profiles in a modal view.
*   **Online Appointment Request:** A dedicated modal form for requesting appointments with a specific doctor.
*   **Working Contact Form:** A functional contact form powered by [Formspree](https://formspree.io/).
*   **Image Galleries:** Interactive image galleries with a lightbox for viewing facilities and event photos.
*   **Filterable Services:** A dynamic "Healthcare Services" page where users can filter services by category.
*   **Dynamic Header:** A sticky header that changes its appearance on scroll for a better user experience.
*   **Scroll-to-Top Button:** A convenient button for easy navigation back to the top of the page.

---

## 📂 Pages

The website consists of the following pages:

*   **`index.html`**: The main landing page with an introduction and a "Why Choose Us" section.
*   **`about.html`**: Contains detailed information about the hospital's history, management, mission, vision, and SWOT analysis.
*   **`facilities.html`**: A gallery showcasing the hospital's state-of-the-art facilities.
*   **`healthcare-services.html`**: A filterable list of all medical services offered by the hospital.
*   **`events.html`**: A page dedicated to past and upcoming hospital events and community programs.
*   **`doctors.html`**: A directory of the hospital's medical specialists.
*   **`contact.html`**: Provides contact details, an interactive map, and a contact form.

---

## 🛠️ Technologies Used

*   **HTML5:** For the structure and content of the website.
*   **CSS3:** For styling, layout, and animations. Uses CSS Variables for easy theming.
*   **JavaScript (ES6+):** For all interactive functionalities, including modals, form handling, and dynamic content.
*   **Font Awesome:** For icons used throughout the site.
*   **Formspree:** As a free backend service to handle email submissions from the contact and appointment forms.

---

## ⚙️ Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-github-username/your-repo-name.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd Rever-Medical-Center-Inc
    ```

3.  **Open `index.html` in your web browser.**
    *   You can do this by double-clicking the file or using a live server extension in your code editor (like Live Server for VS Code).

---

## 📝 Important: Formspree Configuration

The contact and appointment request forms rely on Formspree. To receive email submissions, you need to set up your own Formspree endpoints.

1.  Go to Formspree.io and create a free account.
2.  Create a new form for your project. You will be given a unique URL endpoint.
3.  Open the following files and replace the placeholder `action` URL with your own Formspree URL:
    *   In `contact.html`, update the `<form>` tag:
        ```html
        <form id="contactForm" action="https://formspree.io/f/YOUR_UNIQUE_ID" method="POST">
        ```
    *   In `doctors.html`, update the appointment form's `<form>` tag:
        ```html
        <form id="appointmentForm" action="https://formspree.io/f/YOUR_OTHER_UNIQUE_ID" method="POST">
        ```

---

## 📁 File Structure

The project is organized as follows:

```
/
├── function/         # Contains all JavaScript files
├── image/            # Contains all images, organized in subfolders
├── style/            # Contains all CSS stylesheets
├── about.html
├── contact.html
├── doctors.html
├── events.html
├── facilities.html
├── healthcare-services.html
├── index.html
└── README.md
```