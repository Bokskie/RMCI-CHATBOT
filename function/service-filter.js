document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceBoxes = document.querySelectorAll('.rmci-service-box');

    if (filterButtons.length === 0 || serviceBoxes.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            serviceBoxes.forEach(box => {
                box.classList.remove('is-visible');

                if (filter === 'all' || box.getAttribute('data-category') === filter) {
                    box.classList.remove('hide');
                    setTimeout(() => box.classList.add('is-visible'), 10);
                } else {
                    box.classList.add('hide');
                }
            });
        });
    });
});