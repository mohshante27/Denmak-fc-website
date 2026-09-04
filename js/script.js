/**
 * Denmak FC - Main JavaScript (COMPLETE WORKING)
 */

document.addEventListener('DOMContentLoaded', function() {

    console.log('🏆 Denmak FC - Script Loaded');

    // ============================================
    // 1. HAMBURGER MENU TOGGLE
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        console.log('✅ Hamburger found');
        
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    // ============================================
    // 2. MOBILE DROPDOWN TOGGLE
    // ============================================
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('> a');
        
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    const href = this.getAttribute('href');
                    if (href === 'revenue.html' || href === '#') {
                        e.preventDefault();
                    }
                    
                    dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });
                    
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(d => d.classList.remove('active'));
            }
        }
    });

    // ============================================
    // 3. PARTNERS CAROUSEL - COMPLETE WORKING
    // ============================================
    
    // Wait for everything to load
    setTimeout(function() {
        initCarousel();
    }, 500);

    function initCarousel() {
        console.log('🔄 Initializing carousel...');
        
        // Find elements
        const wrapper = document.querySelector('.partners-carousel-wrapper');
        if (!wrapper) {
            console.log('❌ Wrapper not found - check HTML');
            return;
        }
        
        const track = wrapper.querySelector('.partners-track');
        const prevBtn = wrapper.querySelector('.carousel-btn.prev');
        const nextBtn = wrapper.querySelector('.carousel-btn.next');
        const dotsContainer = wrapper.querySelector('.carousel-dots');
        
        if (!track) {
            console.log('❌ Track not found');
            return;
        }
        
        const slides = track.querySelectorAll('.partner-logo');
        if (slides.length === 0) {
            console.log('❌ No slides found');
            return;
        }
        
        console.log('✅ Found ' + slides.length + ' slides');
        console.log('✅ Prev button:', prevBtn ? 'found' : 'NOT found');
        console.log('✅ Next button:', nextBtn ? 'found' : 'NOT found');
        
        let currentIndex = 0;
        let slidesPerView = getSlidesPerView();
        let totalSlides = slides.length;
        let autoSlideInterval;
        let isAnimating = false;
        
        function getSlidesPerView() {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1024) return 2;
            return 3;
        }
        
        function goToSlide(index) {
            if (isAnimating) return;
            isAnimating = true;
            
            const maxIndex = Math.max(0, totalSlides - slidesPerView);
            currentIndex = Math.min(index, maxIndex);
            currentIndex = Math.max(0, currentIndex);
            
            const percentage = -(currentIndex * (100 / slidesPerView));
            track.style.transform = 'translateX(' + percentage + '%)';
            
            // Update dots
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.dot');
                const activeIndex = Math.floor(currentIndex / slidesPerView);
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === activeIndex);
                });
            }
            
            setTimeout(function() {
                isAnimating = false;
            }, 600);
        }
        
        function nextSlide() {
            if (isAnimating) return;
            const maxIndex = Math.max(0, totalSlides - slidesPerView);
            if (currentIndex >= maxIndex) {
                goToSlide(0);
            } else {
                goToSlide(currentIndex + slidesPerView);
            }
        }
        
        function prevSlide() {
            if (isAnimating) return;
            if (currentIndex <= 0) {
                goToSlide(Math.max(0, totalSlides - slidesPerView));
            } else {
                goToSlide(currentIndex - slidesPerView);
            }
        }
        
        // Create dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            const totalDots = Math.ceil(totalSlides / slidesPerView);
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('button');
                dot.className = 'dot' + (i === 0 ? ' active' : '');
                dot.dataset.index = i;
                dot.addEventListener('click', function() {
                    goToSlide(parseInt(this.dataset.index) * slidesPerView);
                    resetAutoSlide();
                });
                dotsContainer.appendChild(dot);
            }
        }
        
        // Auto slide
        function startAutoSlide() {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 5000);
        }
        
        function resetAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                startAutoSlide();
            }
        }
        
        // ===== BUTTON EVENT LISTENERS =====
        if (prevBtn) {
            // Remove old listeners by cloning
            const newPrev = prevBtn.cloneNode(true);
            prevBtn.parentNode.replaceChild(newPrev, prevBtn);
            
            newPrev.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('⬅️ Previous clicked');
                prevSlide();
                resetAutoSlide();
            });
        }
        
        if (nextBtn) {
            // Remove old listeners by cloning
            const newNext = nextBtn.cloneNode(true);
            nextBtn.parentNode.replaceChild(newNext, nextBtn);
            
            newNext.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('➡️ Next clicked');
                nextSlide();
                resetAutoSlide();
            });
        }
        
        // Pause on hover
        track.addEventListener('mouseenter', function() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
        });
        
        track.addEventListener('mouseleave', function() {
            startAutoSlide();
        });
        
        // Touch support
        let touchStartX = 0;
        track.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        track.addEventListener('touchend', function(e) {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                resetAutoSlide();
            }
        }, { passive: true });
        
        // Window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                const newPerView = getSlidesPerView();
                if (newPerView !== slidesPerView) {
                    slidesPerView = newPerView;
                    // Rebuild dots
                    if (dotsContainer) {
                        dotsContainer.innerHTML = '';
                        const totalDots = Math.ceil(totalSlides / slidesPerView);
                        for (let i = 0; i < totalDots; i++) {
                            const dot = document.createElement('button');
                            dot.className = 'dot' + (i === 0 ? ' active' : '');
                            dot.dataset.index = i;
                            dot.addEventListener('click', function() {
                                goToSlide(parseInt(this.dataset.index) * slidesPerView);
                                resetAutoSlide();
                            });
                            dotsContainer.appendChild(dot);
                        }
                    }
                    goToSlide(0);
                }
            }, 300);
        });
        
        // Start
        goToSlide(0);
        startAutoSlide();
        console.log('✅ Carousel ready!');
    }

    // ============================================
    // 4. ADD TO CART
    // ============================================
    const cartButtons = document.querySelectorAll('.add-to-cart');
    const cartTotalElement = document.getElementById('cart-total');
    const cartEmpty = document.querySelector('.cart-empty');
    let cartItems = 0;
    let cartTotal = 0;

    cartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            if (!productCard) return;
            
            const productName = productCard.querySelector('h3')?.textContent || 'Product';
            const productPriceText = productCard.querySelector('.product-price')?.textContent || 'KSh 0';
            const productPrice = parseInt(productPriceText.replace('KSh ', '').replace(',', '')) || 0;

            cartItems++;
            cartTotal += productPrice;

            if (cartTotalElement) {
                cartTotalElement.textContent = 'KSh ' + cartTotal.toLocaleString();
            }

            if (cartEmpty) {
                cartEmpty.innerHTML = '<p>🛒 You have ' + cartItems + ' item(s) in your cart</p>';
            }

            const originalText = this.textContent;
            this.textContent = '✅ Added!';
            this.style.background = '#28a745';
            this.style.color = 'white';
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
                this.style.color = '';
            }, 1500);
        });
    });

    // ============================================
    // 5. CHECKOUT
    // ============================================
    const checkoutBtn = document.querySelector('.checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (cartItems === 0) {
                alert('🛒 Your cart is empty!');
            } else {
                alert('✅ Thank you! Total: KSh ' + cartTotal.toLocaleString());
                cartItems = 0;
                cartTotal = 0;
                if (cartTotalElement) {
                    cartTotalElement.textContent = 'KSh 0';
                }
                if (cartEmpty) {
                    cartEmpty.innerHTML = '<p>🛒 Your cart is empty. Start shopping!</p>';
                }
            }
        });
    }

    // ============================================
    // 6. PRODUCT SIZE SELECTION
    // ============================================
    document.querySelectorAll('.product-sizes span').forEach(size => {
        size.addEventListener('click', function(e) {
            e.preventDefault();
            const siblings = this.parentElement.querySelectorAll('span');
            siblings.forEach(s => {
                s.style.background = '';
                s.style.color = '';
                s.style.borderColor = '#ddd';
            });
            this.style.background = '#f9d423';
            this.style.color = '#0a0a2e';
            this.style.borderColor = '#f9d423';
        });
    });

    // ============================================
    // 7. PARTNERSHIP INQUIRE BUTTONS
    // ============================================
    document.querySelectorAll('.package-card .btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const packageName = this.closest('.package-card')?.querySelector('h3')?.textContent || 'Partnership';
            alert('📩 Thank you for your interest in our ' + packageName + ' package!');
        });
    });

    console.log('🏆 Denmak FC - Ready!');
});
// Simplified carousel - add this to your script
function simpleCarousel() {
    const track = document.querySelector('.partners-track');
    if (!track) return;
    
    const slides = track.querySelectorAll('.partner-logo');
    if (slides.length === 0) return;
    
    let current = 0;
    const slideCount = slides.length;
    
    // Show first 3 slides on desktop, 1 on mobile
    function getVisibleCount() {
        return window.innerWidth <= 768 ? 1 : 3;
    }
    
    function updateCarousel() {
        const visible = getVisibleCount();
        const maxIndex = Math.max(0, slideCount - visible);
        if (current > maxIndex) current = maxIndex;
        
        const percent = -(current / slideCount * 100);
        track.style.transform = `translateX(${percent}%)`;
        track.style.transition = 'transform 0.6s ease';
    }
    
    // Next/Prev buttons
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const visible = getVisibleCount();
            if (current + visible < slideCount) {
                current += visible;
            } else {
                current = 0;
            }
            updateCarousel();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const visible = getVisibleCount();
            if (current - visible >= 0) {
                current -= visible;
            } else {
                current = Math.max(0, slideCount - visible);
            }
            updateCarousel();
        });
    }
    
    // Auto play
    setInterval(() => {
        const visible = getVisibleCount();
        if (current + visible < slideCount) {
            current += visible;
        } else {
            current = 0;
        }
        updateCarousel();
    }, 5000);
    
    updateCarousel();
}

// Call this instead of the other carousel
setTimeout(simpleCarousel, 1000);