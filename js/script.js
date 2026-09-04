/**
 * Denmak FC - Main JavaScript (COMPLETE FIX)
 */

document.addEventListener('DOMContentLoaded', function() {

    console.log('🏆 Denmak FC - Script Loaded');

    // ============================================
    // 1. HAMBURGER MENU TOGGLE
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        console.log('✅ Hamburger found, attaching events');
        
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Hamburger clicked');
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
    } else {
        console.log('❌ Hamburger or navMenu not found');
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
                    if (href === 'revenue.html' || href === '#' || href === '') {
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
    // 3. PARTNERS CAROUSEL / SLIDER - COMPLETE FIX
    // ============================================
    function initPartnersCarousel() {
        // Find all required elements
        const wrapper = document.querySelector('.partners-carousel-wrapper');
        if (!wrapper) {
            console.log('❌ Partners wrapper not found');
            return;
        }
        
        const track = wrapper.querySelector('.partners-track');
        const prevBtn = wrapper.querySelector('.carousel-btn.prev');
        const nextBtn = wrapper.querySelector('.carousel-btn.next');
        const dotsContainer = wrapper.querySelector('.carousel-dots');
        
        if (!track) {
            console.log('❌ Partners track not found');
            return;
        }
        
        const slides = track.querySelectorAll('.partner-logo');
        if (slides.length === 0) {
            console.log('❌ No partner slides found');
            return;
        }
        
        console.log('✅ Partners carousel found with ' + slides.length + ' slides');
        
        let currentIndex = 0;
        let slidesPerView = getSlidesPerView();
        let totalSlides = slides.length;
        let autoSlideInterval;
        let isTransitioning = false;
        
        // Function to get slides per view based on screen size
        function getSlidesPerView() {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1024) return 2;
            return 3;
        }
        
        // Function to go to a specific slide
        function goToSlide(index) {
            if (isTransitioning) return;
            isTransitioning = true;
            
            const maxIndex = Math.max(0, totalSlides - slidesPerView);
            currentIndex = Math.min(index, maxIndex);
            currentIndex = Math.max(0, currentIndex);
            
            const translateX = -(currentIndex * (100 / slidesPerView));
            track.style.transform = 'translateX(' + translateX + '%)';
            track.style.transition = 'transform 0.5s ease-in-out';
            
            // Update dots
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.dot');
                const activeDotIndex = Math.floor(currentIndex / slidesPerView);
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === activeDotIndex);
                });
            }
            
            setTimeout(function() {
                isTransitioning = false;
            }, 500);
        }
        
        // Function for next slide
        function nextSlide() {
            if (isTransitioning) return;
            const maxIndex = Math.max(0, totalSlides - slidesPerView);
            if (currentIndex >= maxIndex) {
                goToSlide(0);
            } else {
                goToSlide(currentIndex + slidesPerView);
            }
            console.log('➡️ Next slide: ' + currentIndex);
        }
        
        // Function for previous slide
        function prevSlide() {
            if (isTransitioning) return;
            if (currentIndex <= 0) {
                goToSlide(Math.max(0, totalSlides - slidesPerView));
            } else {
                goToSlide(currentIndex - slidesPerView);
            }
            console.log('⬅️ Previous slide: ' + currentIndex);
        }
        
        // Create dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            const totalDots = Math.ceil(totalSlides / slidesPerView);
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.dataset.index = i;
                dot.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const index = parseInt(this.dataset.index) * slidesPerView;
                    goToSlide(index);
                    resetAutoSlide();
                    console.log('🔵 Dot clicked: ' + this.dataset.index);
                });
                dotsContainer.appendChild(dot);
            }
        }
        
        // Auto-slide functions
        function startAutoSlide() {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 5000);
            console.log('▶️ Auto-slide started');
        }
        
        function resetAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                startAutoSlide();
            }
        }
        
        // ===== FIXED: EVENT LISTENERS FOR BUTTONS =====
        // Previous button
        if (prevBtn) {
            console.log('✅ Previous button found');
            // Remove any existing listeners by cloning
            const newPrevBtn = prevBtn.cloneNode(true);
            prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
            
            newPrevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('⬅️ Previous button clicked');
                prevSlide();
                resetAutoSlide();
            });
        } else {
            console.log('❌ Previous button NOT found - check your HTML');
        }
        
        // Next button
        if (nextBtn) {
            console.log('✅ Next button found');
            // Remove any existing listeners by cloning
            const newNextBtn = nextBtn.cloneNode(true);
            nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
            
            newNextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('➡️ Next button clicked');
                nextSlide();
                resetAutoSlide();
            });
        } else {
            console.log('❌ Next button NOT found - check your HTML');
        }
        
        // Pause on hover
        track.addEventListener('mouseenter', function() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                console.log('⏸️ Auto-slide paused');
            }
        });
        
        track.addEventListener('mouseleave', function() {
            startAutoSlide();
            console.log('▶️ Auto-slide resumed');
        });
        
        // Touch support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        track.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        track.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
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
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                const newSlidesPerView = getSlidesPerView();
                if (newSlidesPerView !== slidesPerView) {
                    slidesPerView = newSlidesPerView;
                    // Recreate dots
                    if (dotsContainer) {
                        dotsContainer.innerHTML = '';
                        const totalDots = Math.ceil(totalSlides / slidesPerView);
                        for (let i = 0; i < totalDots; i++) {
                            const dot = document.createElement('button');
                            dot.classList.add('dot');
                            if (i === Math.floor(currentIndex / slidesPerView)) dot.classList.add('active');
                            dot.dataset.index = i;
                            dot.addEventListener('click', function(e) {
                                e.stopPropagation();
                                const index = parseInt(this.dataset.index) * slidesPerView;
                                goToSlide(index);
                                resetAutoSlide();
                            });
                            dotsContainer.appendChild(dot);
                        }
                    }
                    goToSlide(0);
                }
            }, 200);
        });
        
        // Initialize
        goToSlide(0);
        startAutoSlide();
        console.log('✅ Carousel fully initialized');
    }

    // ============================================
    // 4. INITIALIZE CAROUSEL WITH MULTIPLE ATTEMPTS
    // ============================================
    function tryInitCarousel(attempt) {
        attempt = attempt || 0;
        console.log('🔄 Attempting to initialize carousel (attempt ' + (attempt + 1) + ')');
        
        const wrapper = document.querySelector('.partners-carousel-wrapper');
        if (wrapper) {
            initPartnersCarousel();
        } else if (attempt < 5) {
            setTimeout(function() {
                tryInitCarousel(attempt + 1);
            }, 500);
        } else {
            console.log('❌ Failed to initialize carousel after 5 attempts');
        }
    }
    
    // Start carousel initialization
    setTimeout(function() {
        tryInitCarousel(0);
    }, 300);

    // ============================================
    // 5. ADD TO CART FUNCTIONALITY
    // ============================================
    const cartButtons = document.querySelectorAll('.add-to-cart');
    const cartTotalElement = document.getElementById('cart-total');
    const cartEmpty = document.querySelector('.cart-empty');
    let cartItems = 0;
    let cartTotal = 0;

    console.log('✅ Found ' + cartButtons.length + ' Add to Cart buttons');

    cartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
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

            // Visual feedback
            const originalText = this.textContent;
            this.textContent = '✅ Added!';
            this.style.background = '#28a745';
            this.style.color = 'white';
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
                this.style.color = '';
            }, 1500);

            console.log('🛒 Added: ' + productName + ' (KSh ' + productPrice + ')');
        });
    });

    // ============================================
    // 6. CHECKOUT
    // ============================================
    const checkoutBtn = document.querySelector('.checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (cartItems === 0) {
                alert('🛒 Your cart is empty. Add some items first!');
            } else {
                alert('✅ Thank you for shopping with Denmak FC!\nTotal: KSh ' + cartTotal.toLocaleString());
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
    // 7. PRODUCT SIZE SELECTION
    // ============================================
    document.querySelectorAll('.product-sizes span').forEach(size => {
        size.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
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
    // 8. PARTNERSHIP INQUIRE BUTTONS
    // ============================================
    document.querySelectorAll('.package-card .btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const packageName = this.closest('.package-card')?.querySelector('h3')?.textContent || 'Partnership';
            alert('📩 Thank you for your interest in our ' + packageName + ' package!\nA representative will contact you shortly.');
        });
    });

    // ============================================
    // 9. SMOOTH SCROLLING
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('🏆 Denmak FC Maganyakulo - Website Ready');
    console.log('📱 "Hii ni Denmak wewe, kataa uone"');
});