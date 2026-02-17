// JavaScript for Finansskolen

// Helper function to check if on mobile
function isMobile() {
    return window.innerWidth <= 768;
}

function toggleFaq(element) {
    element.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Finansskolen loaded successfully!');

    // Only run on program page
    if (document.body.classList.contains('program-page')) {
        initHorizontalScroll();
    }

    // Random color hover for FAQ page footer
    if (document.body.classList.contains('faq-page')) {
        initFaqFooterHover();
    }

    // Magnetic scroll for tilmelding page
    if (document.body.classList.contains('tilmelding-page')) {
        initTilmeldingScroll();
    }

    // Magnetic scroll for om os page
    if (document.body.classList.contains('omos-page')) {
        initOmosScroll();
    }

    // Magnetic scroll for index page
    if (document.body.classList.contains('index-page')) {
        initIndexScroll();
    }

    // Magnetic scroll for faq page
    if (document.body.classList.contains('faq-page')) {
        initFaqScroll();
    }

    // Magnetic scroll for samarbejd page
    if (document.body.classList.contains('samarbejd-page')) {
        initSamarbejdScroll();
    }
});

function smoothScrollTo(targetY) {
    const startY = window.scrollY;
    const diff = targetY - startY;
    const duration = 500;
    const startTime = performance.now();

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, startY + diff * eased);
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

function initTilmeldingScroll() {
    if (isMobile()) return; // Disable magnetic scroll on mobile

    const block2 = document.querySelector('.tilmelding-block-2');
    const footer = document.querySelector('.site-footer');
    if (!block2 || !footer) return;

    // State: 0 = viewing block 1, 1 = viewing block 2, 2 = footer
    let currentView = 0;
    let isAnimating = false;
    let scrollAccumulator = 0;
    let lastScrollTime = 0;

    const snapPoints = [0, block2.offsetTop, footer.offsetTop];
    const threshold = 80;

    // Ensure we start at top
    window.scrollTo(0, 0);

    function animateTo(targetY) {
        isAnimating = true;
        const startY = window.scrollY;
        const diff = targetY - startY;
        const duration = 500;
        const startTime = performance.now();

        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            window.scrollTo(0, startY + diff * eased);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                isAnimating = false;
            }
        }

        requestAnimationFrame(step);
    }

    // Scroll arrow click
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            if (currentView === 0) {
                currentView = 1;
                animateTo(snapPoints[1]);
            }
        });
    }

    // Take complete control of scrolling
    window.addEventListener('wheel', function(e) {
        if (isMobile()) return;
        e.preventDefault();

        if (isAnimating) return;

        const currentTime = Date.now();
        if (currentTime - lastScrollTime > 200) {
            scrollAccumulator = 0;
        }
        lastScrollTime = currentTime;
        scrollAccumulator += e.deltaY;

        if (Math.abs(scrollAccumulator) > threshold) {
            if (scrollAccumulator > 0 && currentView < 2) {
                // Scroll down: go to next section
                currentView++;
                animateTo(snapPoints[currentView]);
            } else if (scrollAccumulator < 0 && currentView > 0) {
                // Scroll up: go to previous section
                currentView--;
                animateTo(snapPoints[currentView]);
            }
            scrollAccumulator = 0;
        }
    }, { passive: false });
}

function initOmosScroll() {
    if (isMobile()) return; // Disable magnetic scroll on mobile

    const block2 = document.querySelector('.omos-block-2');
    const block3 = document.querySelector('.omos-block-3');
    const footer = document.querySelector('.site-footer');
    if (!block2 || !block3 || !footer) return;

    // State: 0 = viewing block 1, 1 = viewing block 2, 2 = viewing block 3, 3 = footer
    let currentView = 0;
    let isAnimating = false;
    let scrollAccumulator = 0;
    let lastScrollTime = 0;

    const snapPoints = [0, block2.offsetTop, block3.offsetTop, footer.offsetTop];
    const threshold = 80;

    // Ensure we start at top
    window.scrollTo(0, 0);

    function animateTo(targetY) {
        isAnimating = true;
        const startY = window.scrollY;
        const diff = targetY - startY;
        const duration = 500;
        const startTime = performance.now();

        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            window.scrollTo(0, startY + diff * eased);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                isAnimating = false;
            }
        }

        requestAnimationFrame(step);
    }

    // Scroll arrow click
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            if (currentView === 0) {
                currentView = 1;
                animateTo(snapPoints[1]);
            }
        });
    }

    // Take complete control of scrolling
    window.addEventListener('wheel', function(e) {
        if (isMobile()) return;
        e.preventDefault();

        if (isAnimating) return;

        const currentTime = Date.now();
        if (currentTime - lastScrollTime > 200) {
            scrollAccumulator = 0;
        }
        lastScrollTime = currentTime;
        scrollAccumulator += e.deltaY;

        if (Math.abs(scrollAccumulator) > threshold) {
            if (scrollAccumulator > 0 && currentView < 3) {
                // Scroll down: go to next block
                currentView++;
                animateTo(snapPoints[currentView]);
            } else if (scrollAccumulator < 0 && currentView > 0) {
                // Scroll up: go to previous block
                currentView--;
                animateTo(snapPoints[currentView]);
            }
            scrollAccumulator = 0;
        }
    }, { passive: false });
}

function initFaqScroll() {
    if (isMobile()) return; // Disable magnetic scroll on mobile

    const block2 = document.querySelector('.faq-block-2');
    const contactBlock = document.querySelector('.faq-contact-block');
    const footer = document.querySelector('.site-footer');
    if (!block2 || !contactBlock || !footer) return;

    // State: 0 = viewing block 1, 1 = viewing block 2, 2 = contact block, 3 = footer
    let currentView = 0;
    let isAnimating = false;
    let scrollAccumulator = 0;
    let lastScrollTime = 0;

    const snapPoints = [0, block2.offsetTop, contactBlock.offsetTop, footer.offsetTop];
    const threshold = 80;

    // Ensure we start at top
    window.scrollTo(0, 0);

    function animateTo(targetY) {
        isAnimating = true;
        const startY = window.scrollY;
        const diff = targetY - startY;
        const duration = 500;
        const startTime = performance.now();

        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            window.scrollTo(0, startY + diff * eased);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                isAnimating = false;
            }
        }

        requestAnimationFrame(step);
    }

    // Scroll arrow click
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            if (currentView === 0) {
                currentView = 1;
                animateTo(snapPoints[1]);
            }
        });
    }

    // Take complete control of scrolling
    window.addEventListener('wheel', function(e) {
        if (isMobile()) return;
        e.preventDefault();

        if (isAnimating) return;

        const currentTime = Date.now();
        if (currentTime - lastScrollTime > 200) {
            scrollAccumulator = 0;
        }
        lastScrollTime = currentTime;
        scrollAccumulator += e.deltaY;

        if (Math.abs(scrollAccumulator) > threshold) {
            if (scrollAccumulator > 0 && currentView < 3) {
                // Scroll down: go to next section
                currentView++;
                animateTo(snapPoints[currentView]);
            } else if (scrollAccumulator < 0 && currentView > 0) {
                // Scroll up: go to previous section
                currentView--;
                animateTo(snapPoints[currentView]);
            }
            scrollAccumulator = 0;
        }
    }, { passive: false });
}

function initSamarbejdScroll() {
    if (isMobile()) return;

    const block2 = document.querySelector('.samarbejd-block-3');
    const block3 = document.querySelector('.samarbejd-block-4');
    const footer = document.querySelector('.site-footer');
    if (!block2 || !block3 || !footer) return;

    let currentView = 0;
    let isAnimating = false;
    let scrollAccumulator = 0;
    let lastScrollTime = 0;

    const snapPoints = [0, block2.offsetTop, block3.offsetTop, footer.offsetTop];
    const threshold = 80;

    window.scrollTo(0, 0);

    function animateTo(targetY) {
        isAnimating = true;
        const startY = window.scrollY;
        const diff = targetY - startY;
        const duration = 500;
        const startTime = performance.now();

        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            window.scrollTo(0, startY + diff * eased);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                isAnimating = false;
            }
        }

        requestAnimationFrame(step);
    }

    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            if (currentView === 0) {
                currentView = 1;
                animateTo(snapPoints[1]);
            }
        });
    }

    window.addEventListener('wheel', function(e) {
        if (isMobile()) return;
        e.preventDefault();

        if (isAnimating) return;

        const currentTime = Date.now();
        if (currentTime - lastScrollTime > 200) {
            scrollAccumulator = 0;
        }
        lastScrollTime = currentTime;
        scrollAccumulator += e.deltaY;

        if (Math.abs(scrollAccumulator) > threshold) {
            if (scrollAccumulator > 0 && currentView < 3) {
                currentView++;
                animateTo(snapPoints[currentView]);
            } else if (scrollAccumulator < 0 && currentView > 0) {
                currentView--;
                animateTo(snapPoints[currentView]);
            }
            scrollAccumulator = 0;
        }
    }, { passive: false });
}

function initIndexScroll() {
    if (isMobile()) return; // Disable magnetic scroll on mobile

    const block2 = document.querySelector('.index-page .block-2');
    const block3Hvor = document.querySelector('.index-page .block-3-hvor');
    const block4 = document.querySelector('.index-page .block-4');
    const footer = document.querySelector('.site-footer');
    if (!block2 || !block3Hvor || !block4 || !footer) return;

    // State: 0 = viewing block 1, 1 = viewing block 2, etc., 4 = footer
    let currentView = 0;
    let isAnimating = false;
    let scrollAccumulator = 0;
    let lastScrollTime = 0;
    let canScroll = true;

    const snapPoints = [0, block2.offsetTop, block3Hvor.offsetTop, block4.offsetTop, footer.offsetTop];
    const threshold = 80;

    // Ensure we start at top
    window.scrollTo(0, 0);

    function animateTo(targetY) {
        isAnimating = true;
        const startY = window.scrollY;
        const diff = targetY - startY;
        const duration = 500;
        const startTime = performance.now();

        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            window.scrollTo(0, startY + diff * eased);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                isAnimating = false;
            }
        }

        requestAnimationFrame(step);
    }

    // Scroll arrow click
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            if (currentView === 0) {
                currentView = 1;
                animateTo(snapPoints[1]);
            }
        });
    }

    // Take complete control of scrolling
    window.addEventListener('wheel', function(e) {
        if (isMobile()) return;
        e.preventDefault();

        if (isAnimating || !canScroll) return;

        const currentTime = Date.now();
        if (currentTime - lastScrollTime > 200) {
            scrollAccumulator = 0;
        }
        lastScrollTime = currentTime;
        scrollAccumulator += e.deltaY;

        if (Math.abs(scrollAccumulator) > threshold) {
            if (scrollAccumulator > 0 && currentView < 4) {
                // Scroll down: go to next block (including footer)
                currentView++;
                animateTo(snapPoints[currentView]);
                scrollAccumulator = 0;
                canScroll = false;
                setTimeout(() => { canScroll = true; }, 600);
            } else if (scrollAccumulator < 0 && currentView > 0) {
                // Scroll up: go to previous block
                currentView--;
                animateTo(snapPoints[currentView]);
                scrollAccumulator = 0;
                canScroll = false;
                setTimeout(() => { canScroll = true; }, 600);
            } else {
                scrollAccumulator = 0;
            }
        }
    }, { passive: false });
}

function initHorizontalScroll() {
    if (isMobile()) return; // Disable horizontal scroll on mobile

    let currentSlide = 0;
    const totalSlides = 6; // om forløbet + 4 kursusgange + skal du med
    let scrollAccumulator = 0;
    let lastScrollTime = 0;
    let touchStartX = 0;
    let canScroll = true;
    let isHorizontalMode = false;
    let lockedScrollPosition = 0;

    const container = document.querySelector('.horizontal-scroll-container');
    const wrapper = document.querySelector('.horizontal-scroll-wrapper');
    const block1 = document.querySelector('.block-1');

    if (!container || !wrapper || !block1) return;

    // Get the actual position where block 2 starts (top of horizontal-scroll-container)
    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    // Lock position should be exactly where block 2 starts
    const lockPosition = containerTop;
    const activationPoint = lockPosition; // Activate exactly when reaching block 2

    console.log('Container top:', containerTop, 'Activation point:', activationPoint);

    // Scroll arrow click
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            window.scrollTo({ top: activationPoint, behavior: 'smooth' });
        });
    }

    window.addEventListener('scroll', checkScrollPosition);

    function checkScrollPosition() {
        if (isMobile()) return;
        const scrollY = window.scrollY || window.pageYOffset;

        if (scrollY >= activationPoint && !isHorizontalMode && !exitCooldown) {
            // Reached block 2, enable horizontal mode and LOCK at consistent position
            isHorizontalMode = true;
            lockedScrollPosition = lockPosition; // Always lock at same position
            window.addEventListener('wheel', handleWheel, { passive: false });
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, lockedScrollPosition);
            console.log('Horizontal mode activated. Locked at:', lockedScrollPosition);
        }
    }

    let exitCooldown = false;

    function exitHorizontalMode() {
        isHorizontalMode = false;
        exitCooldown = true;
        window.removeEventListener('wheel', handleWheel);
        document.body.style.overflow = '';
        currentSlide = 0;
        updateSlidePosition();
        scrollAccumulator = 0;

        // Instant jump back just above activation point
        window.scrollTo(0, activationPoint - 1);

        // Short cooldown
        setTimeout(() => {
            exitCooldown = false;
        }, 100);
    }

    // Touch events
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const swipeThreshold = 50;

        if (touchStartX - touchEndX > swipeThreshold) {
            navigateToSlide(currentSlide + 1);
        } else if (touchEndX - touchStartX > swipeThreshold) {
            navigateToSlide(currentSlide - 1);
        }
    });

    function handleWheel(e) {
        const scrollDelta = e.deltaY || e.deltaX;

        // Always prevent default when in horizontal mode
        e.preventDefault();

        if (!canScroll) return;

        const currentTime = Date.now();
        const timeSinceLastScroll = currentTime - lastScrollTime;

        // Reset accumulator if pause
        if (timeSinceLastScroll > 150) {
            scrollAccumulator = 0;
        }

        lastScrollTime = currentTime;
        scrollAccumulator += scrollDelta;

        const threshold = 80;

        if (Math.abs(scrollAccumulator) > threshold) {
            if (scrollAccumulator > 0 && currentSlide < totalSlides - 1) {
                // Scroll forward through slides
                navigateToSlide(currentSlide + 1);
                scrollAccumulator = 0;
                canScroll = false;
                setTimeout(() => { canScroll = true; }, 600);
            } else if (scrollAccumulator < 0 && currentSlide > 0) {
                // Scroll backward through slides
                navigateToSlide(currentSlide - 1);
                scrollAccumulator = 0;
                canScroll = false;
                setTimeout(() => { canScroll = true; }, 600);
            } else if (scrollAccumulator < 0 && currentSlide === 0) {
                // On block 2, scrolling up - exit horizontal mode
                exitHorizontalMode();
            } else {
                scrollAccumulator = 0;
            }
        }
    }

    function navigateToSlide(index) {
        if (index < 0 || index >= totalSlides) return;
        currentSlide = index;
        updateSlidePosition();
    }

    function updateSlidePosition() {
        requestAnimationFrame(() => {
            const translateX = -currentSlide * 100;
            wrapper.style.transform = `translateX(${translateX}vw)`;
        });
    }
}

function initFaqFooterHover() {
    // Site-wide page accent colors
    const faqColors = ['#F35D60', '#F3F35D', '#5D80F3', '#92F35D', '#4ADE80', '#F35D8D', '#E8DCC8'];
    const footer = document.querySelector('.site-footer');
    if (!footer) return;

    // Select all links except the main button
    const links = footer.querySelectorAll('a:not(.footer-button)');

    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const randomColor = faqColors[Math.floor(Math.random() * faqColors.length)];
            this.style.color = randomColor;
        });

        link.addEventListener('mouseleave', function() {
            this.style.color = '';
        });
    });

    // Random background color for the main button
    const button = footer.querySelector('.footer-button');
    if (button) {
        button.addEventListener('mouseenter', function() {
            const randomColor = faqColors[Math.floor(Math.random() * faqColors.length)];
            this.style.backgroundColor = randomColor;
        });

        button.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    }
}
