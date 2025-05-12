document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <span class="lightbox-nav lightbox-prev">&#10094;</span>
        <span class="lightbox-nav lightbox-next">&#10095;</span>
        <div class="lightbox-content">
            <img src="" alt="">
        </div>
    `;
    document.body.appendChild(lightbox);

    let currentImageIndex = 0;
    let images = [];

    // Get all images with thumbnail class
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(img => {
        if (img.parentElement.tagName === 'A') {
            images.push(img.parentElement.href);
        }
    });

    // Open lightbox
    thumbnails.forEach((img, index) => {
        if (img.parentElement.tagName === 'A') {
            img.parentElement.addEventListener('click', (e) => {
                e.preventDefault();
                currentImageIndex = index;
                openLightbox(images[currentImageIndex]);
            });
        }
    });

    // Close lightbox
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    
    // Modified click handling to close when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-content')) {
            closeLightbox();
        }
    });

    // Navigation
    lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateImage(images[currentImageIndex]);
    });

    lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage(images[currentImageIndex]);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') lightbox.querySelector('.lightbox-prev').click();
            if (e.key === 'ArrowRight') lightbox.querySelector('.lightbox-next').click();
        }
    });

    function openLightbox(src) {
        lightbox.style.display = 'block';
        updateImage(src);
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }

    function updateImage(src) {
        lightbox.querySelector('img').src = src;
    }
}); 