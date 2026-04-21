/* ══════════════════════════════════════════════════════
   CATÁLOGO LUPITA — Main JavaScript
   Carousel, Zoom, Navigation & Scroll Reveal
   ══════════════════════════════════════════════════════ */

(function () {
    'use strict';

    // ─── DOM References ────────────────────────────────
    const sidebar       = document.getElementById('sidebar');
    const mobileBtn     = document.getElementById('mobile-menu-btn');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const navLinks      = document.querySelectorAll('.nav-link');
    const sections      = document.querySelectorAll('.section');
    const galleryItems  = document.querySelectorAll('.gallery-item');

    // Carousel
    const modal         = document.getElementById('carousel-modal');
    const carouselImage = document.getElementById('carousel-image');
    const imageWrapper  = document.getElementById('carousel-image-wrapper');
    const btnClose      = document.getElementById('carousel-close');
    const btnPrev       = document.getElementById('carousel-prev');
    const btnNext       = document.getElementById('carousel-next');
    const counterCurrent= document.getElementById('carousel-current');
    const counterTotal  = document.getElementById('carousel-total');
    const zoomHint      = document.getElementById('zoom-hint');

    // ─── State ─────────────────────────────────────────
    let currentCategory = '';
    let currentIndex    = 0;
    let images          = [];

    // Zoom state
    let scale     = 1;
    let posX      = 0;
    let posY      = 0;
    let isDragging = false;
    let startX     = 0;
    let startY     = 0;
    let lastPosX   = 0;
    let lastPosY   = 0;

    // Touch zoom
    let lastTouchDist  = 0;
    let lastTouchTime  = 0;


    /* ══════════════════════════════════════════════════
       1. SIDEBAR / MOBILE NAVIGATION
       ══════════════════════════════════════════════════ */

    function toggleMobileMenu(open) {
        const isOpen = open !== undefined ? open : !sidebar.classList.contains('open');
        sidebar.classList.toggle('open', isOpen);
        mobileOverlay.classList.toggle('active', isOpen);
        mobileBtn.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    mobileBtn.addEventListener('click', () => toggleMobileMenu());
    mobileOverlay.addEventListener('click', () => toggleMobileMenu(false));

    // Close mobile menu on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                toggleMobileMenu(false);
            }
        });
    });

    // Active nav link on scroll
    function updateActiveNav() {
        let currentSection = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 200) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === currentSection);
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    /* ══════════════════════════════════════════════════
       2. SCROLL REVEAL (Gallery Items)
       ══════════════════════════════════════════════════ */

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    galleryItems.forEach(item => revealObserver.observe(item));


    /* ══════════════════════════════════════════════════
       3. CAROUSEL / LIGHTBOX
       ══════════════════════════════════════════════════ */

    function getImagesForCategory(category) {
        const items = document.querySelectorAll(`.gallery-item[data-category="${category}"]`);
        return Array.from(items).map(item => item.querySelector('img').src);
    }

    function openCarousel(category, index) {
        currentCategory = category;
        images = getImagesForCategory(category);
        currentIndex = index;

        updateCarouselImage();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Show zoom hint
        zoomHint.classList.remove('hidden');
        setTimeout(() => zoomHint.classList.add('hidden'), 3000);
    }

    function closeCarousel() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        resetZoom();
    }

    function navigateCarousel(direction) {
        resetZoom();
        currentIndex = (currentIndex + direction + images.length) % images.length;
        updateCarouselImage();
    }

    function updateCarouselImage() {
        carouselImage.src = images[currentIndex];
        counterCurrent.textContent = currentIndex + 1;
        counterTotal.textContent = images.length;
    }

    // Gallery item click → open carousel
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;
            const index = parseInt(item.dataset.index, 10);
            openCarousel(category, index);
        });
    });

    // Carousel controls
    btnClose.addEventListener('click', closeCarousel);
    btnPrev.addEventListener('click', () => navigateCarousel(-1));
    btnNext.addEventListener('click', () => navigateCarousel(1));

    // Close on backdrop click
    document.querySelector('.carousel-backdrop').addEventListener('click', closeCarousel);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':     closeCarousel();       break;
            case 'ArrowLeft':  navigateCarousel(-1);  break;
            case 'ArrowRight': navigateCarousel(1);   break;
        }
    });


    /* ══════════════════════════════════════════════════
       4. ZOOM FUNCTIONALITY
       ══════════════════════════════════════════════════ */

    const MIN_SCALE = 1;
    const MAX_SCALE = 5;

    function resetZoom() {
        scale = 1;
        posX = 0;
        posY = 0;
        applyTransform(true);
        carouselImage.classList.remove('zoomed');
        imageWrapper.classList.remove('grabbing');
    }

    function applyTransform(smooth) {
        if (smooth) {
            carouselImage.classList.remove('zoomed');
        } else {
            carouselImage.classList.add('zoomed');
        }
        carouselImage.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    }

    function clampPosition() {
        if (scale <= 1) {
            posX = 0;
            posY = 0;
            return;
        }

        const rect = imageWrapper.getBoundingClientRect();
        const imgRect = carouselImage.getBoundingClientRect();

        const maxX = Math.max(0, (imgRect.width - rect.width) / 2);
        const maxY = Math.max(0, (imgRect.height - rect.height) / 2);

        posX = Math.max(-maxX, Math.min(maxX, posX));
        posY = Math.max(-maxY, Math.min(maxY, posY));
    }

    function zoomAt(clientX, clientY, newScale) {
        const rect = imageWrapper.getBoundingClientRect();
        const offsetX = clientX - rect.left - rect.width / 2;
        const offsetY = clientY - rect.top - rect.height / 2;

        const ratio = newScale / scale;
        posX = offsetX - ratio * (offsetX - posX);
        posY = offsetY - ratio * (offsetY - posY);

        scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));

        if (scale <= 1) {
            posX = 0;
            posY = 0;
        } else {
            clampPosition();
        }

        applyTransform(false);
    }

    // ── Mouse wheel zoom ──
    imageWrapper.addEventListener('wheel', (e) => {
        if (!modal.classList.contains('active')) return;
        e.preventDefault();

        const delta = e.deltaY > 0 ? -0.3 : 0.3;
        const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale + delta));
        zoomAt(e.clientX, e.clientY, newScale);
        zoomHint.classList.add('hidden');
    }, { passive: false });

    // ── Double click zoom ──
    imageWrapper.addEventListener('dblclick', (e) => {
        e.preventDefault();
        zoomHint.classList.add('hidden');

        if (scale > 1.1) {
            resetZoom();
        } else {
            zoomAt(e.clientX, e.clientY, 3);
        }
    });

    // ── Mouse drag ──
    imageWrapper.addEventListener('mousedown', (e) => {
        if (scale <= 1) return;
        e.preventDefault();
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        lastPosX = posX;
        lastPosY = posY;
        imageWrapper.classList.add('grabbing');
        carouselImage.classList.add('zoomed');
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        posX = lastPosX + (e.clientX - startX);
        posY = lastPosY + (e.clientY - startY);
        clampPosition();
        applyTransform(false);
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        imageWrapper.classList.remove('grabbing');
    });

    // ── Touch: swipe to navigate & pinch to zoom ──
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;

    imageWrapper.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            // Pinch zoom start
            lastTouchDist = getTouchDistance(e.touches);
            e.preventDefault();
        } else if (e.touches.length === 1) {
            const now = Date.now();
            const timeDelta = now - lastTouchTime;
            lastTouchTime = now;

            // Double tap detection
            if (timeDelta < 300 && timeDelta > 0) {
                e.preventDefault();
                zoomHint.classList.add('hidden');
                if (scale > 1.1) {
                    resetZoom();
                } else {
                    zoomAt(e.touches[0].clientX, e.touches[0].clientY, 3);
                }
                return;
            }

            if (scale > 1) {
                // Drag when zoomed
                isDragging = true;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                lastPosX = posX;
                lastPosY = posY;
                carouselImage.classList.add('zoomed');
            } else {
                // Swipe to navigate
                isSwiping = true;
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }
        }
    }, { passive: false });

    imageWrapper.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2) {
            // Pinch zoom
            e.preventDefault();
            const dist = getTouchDistance(e.touches);
            const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

            const ratio = dist / lastTouchDist;
            const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale * ratio));
            zoomAt(midX, midY, newScale);
            lastTouchDist = dist;
            zoomHint.classList.add('hidden');
        } else if (isDragging && e.touches.length === 1) {
            e.preventDefault();
            posX = lastPosX + (e.touches[0].clientX - startX);
            posY = lastPosY + (e.touches[0].clientY - startY);
            clampPosition();
            applyTransform(false);
        }
    }, { passive: false });

    imageWrapper.addEventListener('touchend', (e) => {
        if (isSwiping && e.changedTouches.length === 1) {
            const deltaX = e.changedTouches[0].clientX - touchStartX;
            const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartY);

            // Only swipe if horizontal and not vertical scroll
            if (Math.abs(deltaX) > 50 && deltaY < 100) {
                navigateCarousel(deltaX > 0 ? -1 : 1);
            }
        }
        isDragging = false;
        isSwiping = false;
        imageWrapper.classList.remove('grabbing');
    });

    function getTouchDistance(touches) {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }


    /* ══════════════════════════════════════════════════
       5. PREVENT CAROUSEL SWIPE FROM NAVIGATING
       ══════════════════════════════════════════════════ */

    // Stop click from propagating to backdrop when using arrows
    [btnPrev, btnNext, btnClose].forEach(btn => {
        btn.addEventListener('click', e => e.stopPropagation());
    });

})();
