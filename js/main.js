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

    // ─── Catalog Data for Variations ─────────────────────────
    const catalogData = {
        'acojinada-cromada': {
            variants: {
                'default': [
                    'img/sillas/sillaAcojinadaCromada/SillaAcojinadaCromada1.webp',
                    'img/sillas/sillaAcojinadaCromada/SillaAcojinadaCromada2.webp',
                    'img/sillas/sillaAcojinadaCromada/SillaAcojinadaCromada3.webp',
                    'img/sillas/sillaAcojinadaCromada/SillaAcojinadaCromada4.webp'
                ]
            }
        },
        'acojinada-infantil': {
            variants: {
                'verde': [
                    'img/sillas/sillaAcojinadaInfantil/sillaAcojinadaInfantilVerde1.webp',
                    'img/sillas/sillaAcojinadaInfantil/sillaAcojinadaInfantilverde2.webp',
                    'img/sillas/sillaAcojinadaInfantil/sillaAcojinadaInfantilVerde3.webp',
                    'img/sillas/sillaAcojinadaInfantil/sillaAcojinadaInfantilVerde4.webp'
                ],
                'vino': [
                    'img/sillas/sillaAcojinadaInfantil/sillaAcojinadaInfantilVino1.webp',
                    'img/sillas/sillaAcojinadaInfantil/sillaAcojinadaInfantilVino2.webp',
                    'img/sillas/sillaAcojinadaInfantil/sillaAcojinadaInfantilVino3.webp'
                ]
            }
        },
        'cromada': {
            variants: {
                'azul': [
                    'img/sillas/sillaCromada/sillaCromadaAzul1.webp',
                    'img/sillas/sillaCromada/sillaCromadaAzul2.webp',
                    'img/sillas/sillaCromada/sillaCromadaAzul3.webp',
                    'img/sillas/sillaCromada/sillaCromadaAzul4.webp'
                ],
                'rojo': [
                    'img/sillas/sillaCromada/sillaCromadaRoja1.webp',
                    'img/sillas/sillaCromada/sillaCromadaRoja2.webp',
                    'img/sillas/sillaCromada/sillaCromadaRoja3.webp',
                    'img/sillas/sillaCromada/sillaCromadaRoja4.webp'
                ],
                'verde': [
                    'img/sillas/sillaCromada/SillaCromadaVerde1.webp',
                    'img/sillas/sillaCromada/SillaCromadaVerde2.webp',
                    'img/sillas/sillaCromada/SillaCromadaVerde3.webp',
                    'img/sillas/sillaCromada/SillaCromadaVerde4.webp'
                ]
            }
        },
        'galvanizada': {
            variants: {
                'default': [
                    'img/sillas/sillaGalbanizada/sillaGalbanizada1.webp',
                    'img/sillas/sillaGalbanizada/sillaGalbanizada2.webp',
                    'img/sillas/sillaGalbanizada/sillaGalvanizada3.webp',
                    'img/sillas/sillaGalbanizada/sillaGalbanizada4.webp'
                ]
            }
        },
        'pintada': {
            variants: {
                'gris': [
                    'img/sillas/sillaPintada/sillaPintadaGris1.webp',
                    'img/sillas/sillaPintada/sillaPintadaGris2.webp',
                    'img/sillas/sillaPintada/sillaPintadaGris3.webp',
                    'img/sillas/sillaPintada/sillaPintadaGris4.webp'
                ],
                'rojo': [
                    'img/sillas/sillaPintada/sillaPintadaRoja1.webp',
                    'img/sillas/sillaPintada/sillaPintadaRoja2.webp',
                    'img/sillas/sillaPintada/sillaPintadaRoja3.webp',
                    'img/sillas/sillaPintada/sillaPintadaRoja4.webp'
                ]
            }
        },
        'plastico': {
            variants: {
                'default': [
                    'img/sillas/sillaPlastico/sillaPlastico2.webp',
                    'img/sillas/sillaPlastico/sillaPlastico3.webp',
                    'img/sillas/sillaPlastico/sillaPlastico4.webp'
                ]
            }
        },
        'zintro-completa': {
            variants: {
                'default': [
                    'img/sillas/sillaZintroCompleta/sillaZintroCompleta1.webp',
                    'img/sillas/sillaZintroCompleta/sillaZintroCompleta2.webp',
                    'img/sillas/sillaZintroCompleta/sillaZintroCompleta3.webp',
                    'img/sillas/sillaZintroCompleta/sillaZintroCompleta4.webp'
                ]
            }
        },
        'zintro-pintada': {
            variants: {
                'amarillo': [
                    'img/sillas/sillaZintroPintada/sillaZintroPintadaAmarilla1.webp',
                    'img/sillas/sillaZintroPintada/sillaZintroPintadaAmarilla2.webp',
                    'img/sillas/sillaZintroPintada/sillaZintroPintadaAmarilla3.webp',
                    'img/sillas/sillaZintroPintada/sillaZintroPintadaAmarilla4.webp'
                ],
                'azul': [
                    'img/sillas/sillaZintroPintada/sillaZintroPintadaAzul1.webp',
                    'img/sillas/sillaZintroPintada/sillaZintroPintadaAzul2.webp',
                    'img/sillas/sillaZintroPintada/sillaZintroPintadaAzul3.webp',
                    'img/sillas/sillaZintroPintada/sillaZintroPintadaAzul4.webp'
                ],
                'blanco': [
                    'img/sillas/sillaZintroPintada/sillaZintroPintadaBlanca1.webp',
                    'img/sillas/sillaZintroPintada/sillaZintroPintadaBlanca2.webp',
                    'img/sillas/sillaZintroPintada/sillaZintroPintadaBlanca3.webp',
                    'img/sillas/sillaZintroPintada/sillaZintroPintadaBlanca4.webp'
                ],
                'negro': [
                    'img/sillas/sillaZintroPintada/sillaZintroPintadaNegra1.webp',
                    'img/sillas/sillaZintroPintada/sillaZintroPintadaNegra2.webp',
                    'img/sillas/sillaZintroPintada/sillaZintroPintadaNegra3.webp',
                    'img/sillas/sillaZintroPintada/sillaZintroPintadaNegra4.webp'
                ],
                'verde': [
                    'img/sillas/sillaZintroPintada/sillaZintroPintadaVerde1.webp',
                    'img/sillas/sillaZintroPintada/sillaZintroPintadaVerde2.webp',
                    'img/sillas/sillaZintroPintada/sillaZintroPintadaVerde3.webp',
                    'img/sillas/sillaZintroPintada/sillaZintroPintadaVerde4.webp'
                ]
            }
        },
        // Mesas
        'mesa-cuadrada': {
            variants: {
                'default': [
                    'img/mesas/mesaCuadrada/mesaCuadrada1.webp',
                    'img/mesas/mesaCuadrada/mesaCuadrada2.webp',
                    'img/mesas/mesaCuadrada/mesaCuadrada3.webp',
                    'img/mesas/mesaCuadrada/mesaCuadrada4.webp',
                    'img/mesas/mesaCuadrada/mesaCuadrada5.webp'
                ]
            }
        },
        'mesa-imperial': {
            variants: {
                'default': [
                    'img/mesas/mesaImperial/mesaImperial2.webp',
                    'img/mesas/mesaImperial/mesaImperial3.webp',
                    'img/mesas/mesaImperial/mesaImperial4.webp',
                    'img/mesas/mesaImperial/mesaImperial5.webp',
                    'img/mesas/mesaImperial/mesaImperialZintro1.webp'
                ]
            }
        },
        'mesa-imperial-zintro': {
            variants: {
                'default': [
                    'img/mesas/mesaImperialZintro/mesaImperialZintro1.webp',
                    'img/mesas/mesaImperialZintro/mesaImperialZintro2.webp',
                    'img/mesas/mesaImperialZintro/mesaImperialZintro3.webp',
                    'img/mesas/mesaImperialZintro/mesaImperialZintro4.webp',
                    'img/mesas/mesaImperialZintro/mesaImperialZintro5.webp'
                ]
            }
        },
        'mesa-rectangular': {
            variants: {
                'default': [
                    'img/mesas/mesaRectangular/mesaRectangular1.webp',
                    'img/mesas/mesaRectangular/mesaRectangular2.webp',
                    'img/mesas/mesaRectangular/mesaRectangular3.webp',
                    'img/mesas/mesaRectangular/mesaRectangular4.webp',
                    'img/mesas/mesaRectangular/mesaRectangular5.webp'
                ]
            }
        },
        'mesa-rectangular-chica': {
            variants: {
                'default': [
                    'img/mesas/mesaRectangularChica/mesaRectangularChica1.webp',
                    'img/mesas/mesaRectangularChica/mesaRectangularChica2.webp',
                    'img/mesas/mesaRectangularChica/mesaRectangularChica3.webp',
                    'img/mesas/mesaRectangularChica/mesaRectangularChica4.webp',
                    'img/mesas/mesaRectangularChica/mesaRectangularChica5.webp'
                ]
            }
        },
        'mesa-redonda': {
            variants: {
                'default': [
                    'img/mesas/mesaRedonda/mesaRedonda1.webp',
                    'img/mesas/mesaRedonda/mesaRedonda2.webp',
                    'img/mesas/mesaRedonda/mesaRedonda3.webp',
                    'img/mesas/mesaRedonda/mesaRedonda4.webp',
                    'img/mesas/mesaRedonda/mesaRedonda5.webp'
                ]
            }
        },
        'mesa-redonda-zintro': {
            variants: {
                'default': [
                    'img/mesas/mesaRedondaZintro/mesaRedonda1.webp',
                    'img/mesas/mesaRedondaZintro/mesaRedondaZintro2.webp',
                    'img/mesas/mesaRedondaZintro/mesaRedondaZintro3.webp',
                    'img/mesas/mesaRedondaZintro/mesaRedondaZintro4.webp',
                    'img/mesas/mesaRedondaZintro/mesaRedondaZintro5.webp'
                ]
            }
        },
        'mesa-tablon': {
            variants: {
                'default': [
                    'img/mesas/mesaTablon/mesaTablon1.webp',
                    'img/mesas/mesaTablon/mesaTablon3.webp',
                    'img/mesas/mesaTablon/mesaTablon4.webp',
                    'img/mesas/mesaTablon/mesaTablon5.webp'
                ]
            }
        }
    };

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
       3. CAROUSEL / LIGHTBOX & COLOR VARIANTS
       ══════════════════════════════════════════════════ */

    // ── Color Variants Handling
    const colorSwatches = document.querySelectorAll('.color-swatch');

    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', (e) => {
            const model = swatch.dataset.model;
            const color = swatch.dataset.color;
            
            // Update active state in siblings
            const parent = swatch.closest('.color-swatches');
            parent.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');

            // Find the associated gallery item
            const card = swatch.closest('.product-card');
            const galleryItem = card.querySelector('.gallery-item');
            
            // Update the dataset on gallery item so the carousel opens the right images
            galleryItem.dataset.color = color;

            // Update main image preview
            const firstImageSrc = catalogData[model].variants[color][0];
            const imgEl = galleryItem.querySelector('img');
            
            // Small transition trick via inline style
            imgEl.style.transition = 'opacity 0.2s ease-out';
            imgEl.style.opacity = '0';
            setTimeout(() => {
                imgEl.src = firstImageSrc;
                imgEl.style.opacity = '1';
                setTimeout(() => imgEl.style.transition = '', 200); // cleanup
            }, 200);
            
            // Prevent event from bubbling and opening carousel
            e.stopPropagation();
        });
    });

    function getImagesForCategory(category) {
        const items = document.querySelectorAll(`.gallery-item[data-category="${category}"]`);
        return Array.from(items).map(item => item.querySelector('img').src);
    }

    function openCarousel(category, index, model, color) {
        if (model && color && catalogData[model]) {
            // Context is from Sillas/Mesas with data variants
            images = catalogData[model].variants[color];
            currentIndex = 0; // Always start at 1st image
        } else {
            // Context is from Mesas (or un-modeled items)
            currentCategory = category;
            images = getImagesForCategory(category);
            currentIndex = index;
        }

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
            const index = item.dataset.index ? parseInt(item.dataset.index, 10) : 0;
            const model = item.dataset.model;
            const color = item.dataset.color;
            
            openCarousel(category, index, model, color);
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
