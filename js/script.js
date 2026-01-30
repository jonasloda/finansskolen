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
});

function initTilmeldingScroll() {
    if (isMobile()) return; // Disable magnetic scroll on mobile

    const block2 = document.querySelector('.tilmelding-block-2');
    if (!block2) return;

    // State: 0 = viewing block 1, 1 = viewing block 2
    let currentView = 0;
    let isAnimating = false;
    let scrollAccumulator = 0;
    let lastScrollTime = 0;

    const snapPoint = block2.offsetTop;
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

    // Take complete control of scrolling
    window.addEventListener('wheel', function(e) {
        e.preventDefault();

        if (isAnimating) return;

        const currentTime = Date.now();
        if (currentTime - lastScrollTime > 200) {
            scrollAccumulator = 0;
        }
        lastScrollTime = currentTime;
        scrollAccumulator += e.deltaY;

        if (Math.abs(scrollAccumulator) > threshold) {
            if (scrollAccumulator > 0 && currentView === 0) {
                // Scroll down: block 1 -> block 2
                currentView = 1;
                animateTo(snapPoint);
            } else if (scrollAccumulator < 0 && currentView === 1) {
                // Scroll up: block 2 -> block 1
                currentView = 0;
                animateTo(0);
            }
            scrollAccumulator = 0;
        }
    }, { passive: false });
}

function initOmosScroll() {
    if (isMobile()) return; // Disable magnetic scroll on mobile

    const block2 = document.querySelector('.omos-block-2');
    const block3 = document.querySelector('.omos-block-3');
    if (!block2 || !block3) return;

    // State: 0 = viewing block 1, 1 = viewing block 2, 2 = viewing block 3
    let currentView = 0;
    let isAnimating = false;
    let scrollAccumulator = 0;
    let lastScrollTime = 0;

    const snapPoints = [0, block2.offsetTop, block3.offsetTop];
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

    // Take complete control of scrolling
    window.addEventListener('wheel', function(e) {
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
    if (!block2) return;

    // State: 0 = viewing block 1, 1 = viewing block 2
    let currentView = 0;
    let isAnimating = false;
    let scrollAccumulator = 0;
    let lastScrollTime = 0;

    const snapPoint = block2.offsetTop;
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

    // Take complete control of scrolling
    window.addEventListener('wheel', function(e) {
        e.preventDefault();

        if (isAnimating) return;

        const currentTime = Date.now();
        if (currentTime - lastScrollTime > 200) {
            scrollAccumulator = 0;
        }
        lastScrollTime = currentTime;
        scrollAccumulator += e.deltaY;

        if (Math.abs(scrollAccumulator) > threshold) {
            if (scrollAccumulator > 0 && currentView === 0) {
                // Scroll down: block 1 -> block 2
                currentView = 1;
                animateTo(snapPoint);
            } else if (scrollAccumulator < 0 && currentView === 1) {
                // Scroll up: block 2 -> block 1
                currentView = 0;
                animateTo(0);
            }
            scrollAccumulator = 0;
        }
    }, { passive: false });
}

function initIndexScroll() {
    if (isMobile()) return; // Disable magnetic scroll on mobile

    const block2 = document.querySelector('.index-page .block-2');
    const block3 = document.querySelector('.index-page .block-3');
    const block4 = document.querySelector('.index-page .block-4');
    const block5 = document.querySelector('.index-page .block-5');
    if (!block2 || !block3 || !block4 || !block5) return;

    // State: 0 = viewing block 1, 1 = viewing block 2, etc.
    let currentView = 0;
    let isAnimating = false;
    let scrollAccumulator = 0;
    let lastScrollTime = 0;
    let canScroll = true;

    const snapPoints = [0, block2.offsetTop, block3.offsetTop, block4.offsetTop, block5.offsetTop];
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

    // Take complete control of scrolling
    window.addEventListener('wheel', function(e) {
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
                // Scroll down: go to next block
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
    const totalSlides = 4; // blocks 2-5
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

    window.addEventListener('scroll', checkScrollPosition);

    function checkScrollPosition() {
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
