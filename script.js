// Gallery data
const galleryData = [
    {
        id: 1,
        category: "nature",
        title: "Mountain Sunrise",
        description: "Beautiful sunrise over the mountains",
        imgUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
        id: 2,
        category: "urban",
        title: "City Skyline",
        description: "Modern city skyline at dusk",
        imgUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1544&q=80"
    },
    {
        id: 3,
        category: "portrait",
        title: "Thoughtful Gaze",
        description: "Portrait of a young woman in natural light",
        imgUrl: "https://plus.unsplash.com/premium_photo-1682095889523-510a9f284bd3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UG9ydHJhaXQlMjBvZiUyMGElMjB5b3VuZyUyMHdvbWFuJTIwaW4lMjBuYXR1cmFsJTIwbGlnaHR8ZW58MHx8MHx8fDA%3D"
    },
    {
        id: 4,
        category: "nature",
        title: "Forest Path",
        description: "Sunlight streaming through a forest path",
        imgUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
        id: 5,
        category: "travel",
        title: "Desert Adventure",
        description: "Camel riding in the desert at sunset",
        imgUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80"
    },
    {
        id: 6,
        category: "urban",
        title: "Street Art",
        description: "Colorful street art in an urban alley",
        imgUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
        id: 7,
        category: "portrait",
        title: "Elderly Wisdom",
        description: "Portrait of an elderly man with character",
        imgUrl: "https://plus.unsplash.com/premium_photo-1663127184412-b22d588aef8c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UG9ydHJhaXQlMjBvZiUyMGFuJTIwZWxkZXJseSUyMG1hbiUyMHdpdGglMjBjaGFyYWN0ZXJ8ZW58MHx8MHx8fDA%3D"
    },
    {
        id: 8,
        category: "travel",
        title: "Beach Paradise",
        description: "Tropical beach with turquoise water",
        imgUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80"
    },
    {
        id: 9,
        category: "nature",
        title: "Waterfall Majesty",
        description: "Powerful waterfall in a forest",
        imgUrl: "https://images.unsplash.com/photo-1512273222628-4daea6e55abb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
];

// DOM elements
const galleryContainer = document.querySelector('.gallery');
const filterButtons = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxInfo = document.querySelector('.lightbox-info');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentImageIndex = 0;
let filteredImages = [];

// Initialize gallery
function initGallery() {
    // Load all images initially
    filteredImages = [...galleryData];
    renderGallery();
    
    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter images
            const filter = this.getAttribute('data-filter');
            if (filter === 'all') {
                filteredImages = [...galleryData];
            } else {
                filteredImages = galleryData.filter(image => image.category === filter);
            }
            
            renderGallery();
        });
    });
    
    // Lightbox event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
    });
}

// Render gallery images
function renderGallery() {
    galleryContainer.innerHTML = '';
    
    filteredImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-category', image.category);
        galleryItem.setAttribute('data-index', index);
        
        galleryItem.innerHTML = `
            <img src="${image.imgUrl}" alt="${image.title}" class="gallery-img">
            <div class="gallery-info">
                <h3>${image.title}</h3>
                <p>${image.description}</p>
            </div>
        `;
        
        // Add click event to open lightbox
        galleryItem.addEventListener('click', () => openLightbox(index));
        
        galleryContainer.appendChild(galleryItem);
    });
}

// Open lightbox
function openLightbox(index) {
    currentImageIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Show previous image in lightbox
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightbox();
}

// Show next image in lightbox
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    updateLightbox();
}

// Update lightbox content
function updateLightbox() {
    const image = filteredImages[currentImageIndex];
    lightboxImg.src = image.imgUrl;
    lightboxImg.alt = image.title;
    lightboxInfo.innerHTML = `<h3>${image.title}</h3><p>${image.description}</p>`;
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize the gallery when page loads
document.addEventListener('DOMContentLoaded', initGallery);