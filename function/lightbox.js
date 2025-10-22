document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.rmci-facility-image');
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    if (!lightbox) return;

    let currentIndex = 0;

    function showLightbox(index) {
        const imageContainer = galleryImages[index];
        const img = imageContainer.querySelector('img');
        const caption = imageContainer.querySelector('.rmci-facility-name').textContent;

        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('show');
        currentIndex = index;
    }

    function hideLightbox() {
        lightbox.classList.remove('show');
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        showLightbox(currentIndex);
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        showLightbox(currentIndex);
    }

    galleryImages.forEach((item, index) => {
        item.addEventListener('click', () => {
            showLightbox(index);
        });
    });

    closeBtn.addEventListener('click', hideLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            hideLightbox();
        }
    });
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('show')) return;
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'Escape') hideLightbox();
    });
});