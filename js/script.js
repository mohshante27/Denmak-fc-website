/**
 * Denmak FC - Main JavaScript (Fixed)
 */

document.addEventListener('DOMContentLoaded', function () {

<<<<<<< HEAD
    // ============================================
    // 1. HAMBURGER MENU TOGGLE
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link (on mobile)
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
                // Only on mobile
                if (window.innerWidth <= 768) {
                    // If it's the Revenue parent link, prevent navigation on first click
                    if (this.getAttribute('href') === 'revenue.html' || 
                        this.getAttribute('href') === '#') {
                        e.preventDefault();
                    }
                    
                    // Close other dropdowns
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

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(d => d.classList.remove('active'));
            }
=======
    // ---------- Mobile Dropdown Toggle (Revenue ▾) ----------
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector(':scope > a');

        trigger.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();

                // Close any other open dropdowns first
                dropdowns.forEach(other => {
                    if (other !== dropdown) other.classList.remove('active');
                });

                dropdown.classList.toggle('active');
            }
        });
    });

    // Close dropdown when tapping anywhere outside it
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768 && !e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });

    // Close dropdown automatically if the window is resized past mobile width
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
>>>>>>> 7d0e8ba5e6a27ab5cf9177647941f7c94529e48e
        }
    });

    // ============================================
    // 3. PARTNERS CAROUSEL / SLIDER
    // ============================================
    function initPartnersCarousel() {
        const track = document.querySelector('.partners-track');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        const dotsContainer = document.querySelector('.carousel-dots');
        
        if (!track) return;
        
        const slides = track.querySelectorAll('.partner-logo');
        if (slides.length === 0) return;
        
        let currentIndex = 0;
        let slidesPerView = getSlidesPerView();
        let totalSlides = slides.length;
        let autoSlideInterval;
        
        // Create dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            const totalDots = Math.ceil(totalSlides / slidesPerView);
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.dataset.index = i;
                dot.addEventListener('click', function() {
                    goToSlide(parseInt(this.dataset.index) * slidesPerView);
                });
                dotsContainer.appendChild(dot);
            }
        }
        
        function getSlidesPerView() {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1024) return 2;
            return 3;
        }
        
        function updateSlidesPerView() {
            const newSlidesPerView = getSlidesPerView();
            if (newSlidesPerView !== slidesPerView) {
                slidesPerView = newSlidesPerView;
                updateDots();
                goToSlide(0);
            }
        }
        
        function updateDots() {
            const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
            const totalDots = Math.ceil(totalSlides / slidesPerView);
            
            // Update dots count if needed
            if (dots.length !== totalDots && dotsContainer) {
                dotsContainer.innerHTML = '';
                for (let i = 0; i < totalDots; i++) {
                    const dot = document.createElement('button');
                    dot.classList.add('dot');
                    if (i === Math.floor(currentIndex / slidesPerView)) dot.classList.add('active');
                    dot.dataset.index = i;
                    dot.addEventListener('click', function() {
                        goToSlide(parseInt(this.dataset.index) * slidesPerView);
                    });
                    dotsContainer.appendChild(dot);
                }
            }
        }
        
        function goToSlide(index) {
            const maxIndex = Math.max(0, totalSlides - slidesPerView);
            currentIndex = Math.min(index, maxIndex);
            currentIndex = Math.max(0, currentIndex);
            
            const translateX = -(currentIndex * (100 / slidesPerView));
            track.style.transform = `translateX(${translateX}%)`;
            
            // Update dots
            const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
            const activeDotIndex = Math.floor(currentIndex / slidesPerView);
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === activeDotIndex);
            });
        }
        
        function nextSlide() {
            const maxIndex = Math.max(0, totalSlides - slidesPerView);
            if (currentIndex >= maxIndex) {
                goToSlide(0);
            } else {
                goToSlide(currentIndex + slidesPerView);
            }
        }
        
        function prevSlide() {
            if (currentIndex <= 0) {
                goToSlide(Math.max(0, totalSlides - slidesPerView));
            } else {
                goToSlide(currentIndex - slidesPerView);
            }
        }
        
        // Event listeners
        if (prevBtn) prevBtn.addEventListener('click', function() {
            prevSlide();
            resetAutoSlide();
        });
        
        if (nextBtn) nextBtn.addEventListener('click', function() {
            nextSlide();
            resetAutoSlide();
        });
        
        // Auto-slide
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
        
        // Pause on hover
        track.addEventListener('mouseenter', function() {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
        });
        
        track.addEventListener('mouseleave', function() {
            startAutoSlide();
        });
        
        // Window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                updateSlidesPerView();
            }, 200);
        });
        
        // Initialize
        goToSlide(0);
        startAutoSlide();
    }
    
    // Init carousel if exists
    if (document.querySelector('.partners-track')) {
        initPartnersCarousel();
    }

    // ============================================
    // 4. ADD TO CART FUNCTIONALITY
    // ============================================
    const cartButtons = document.querySelectorAll('.add-to-cart');
    const cartTotalElement = document.getElementById('cart-total');
    const cartEmpty = document.querySelector('.cart-empty');
    let cartItems = 0;
    let cartTotal = 0;

    cartButtons.forEach(button => {
        button.addEventListener('click', function () {
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

<<<<<<< HEAD
            // Visual feedback
            this.textContent = '✅ Added!';
            this.style.background = '#28a745';
            this.style.color = 'white';
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.background = '';
                this.style.color = '';
            }, 1500);
=======
            alert(productName + ' added to cart! (KSh ' + productPrice.toLocaleString() + ')');
>>>>>>> 7d0e8ba5e6a27ab5cf9177647941f7c94529e48e
        });
    });

    // ============================================
    // 5. CHECKOUT
    // ============================================
    const checkoutBtn = document.querySelector('.checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            if (cartItems === 0) {
                alert('🛒 Your cart is empty. Add some items first!');
            } else {
<<<<<<< HEAD
                alert('✅ Thank you for shopping with Denmak FC!\nTotal: KSh ' + cartTotal.toLocaleString());
                cartItems = 0;
                cartTotal = 0;
                if (cartTotalElement) {
                    cartTotalElement.textContent = 'KSh 0';
                }
                if (cartEmpty) {
                    cartEmpty.innerHTML = '<p>🛒 Your cart is empty. Start shopping!</p>';
                }
=======
                alert('Thank you for shopping with Denmak FC! Total: KSh ' + cartTotal.toLocaleString());
                cartItems = 0;
                cartTotal = 0;
                if (cartTotalElement) cartTotalElement.textContent = 'KSh 0';
                if (cartEmpty) cartEmpty.innerHTML = '<p>Your cart is empty. Start shopping!</p>';
>>>>>>> 7d0e8ba5e6a27ab5cf9177647941f7c94529e48e
            }
        });
    }

<<<<<<< HEAD
    // ============================================
    // 6. PRODUCT SIZE SELECTION
    // ============================================
    document.querySelectorAll('.product-sizes span').forEach(size => {
        size.addEventListener('click', function() {
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
        btn.addEventListener('click', function() {
            const packageName = this.closest('.package-card')?.querySelector('h3')?.textContent || 'Partnership';
            alert('📩 Thank you for your interest in our ' + packageName + ' package!\nA representative will contact you shortly.');
        });
    });

    // ============================================
    // 8. SMOOTH SCROLLING
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
=======
    // ---------- Smooth Scrolling ----------
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
>>>>>>> 7d0e8ba5e6a27ab5cf9177647941f7c94529e48e
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

<<<<<<< HEAD
=======
    // ---------- Product Size Selection ----------
    document.querySelectorAll('.product-sizes span').forEach(size => {
        size.addEventListener('click', function () {
            const siblings = this.parentElement.querySelectorAll('span');
            siblings.forEach(s => { s.style.background = ''; s.style.color = ''; });
            this.style.background = '#f9d423';
            this.style.color = '#0a0a2e';
        });
    });

    // ---------- Partnership Inquire Buttons ----------
    document.querySelectorAll('.package-card .btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const packageName = this.closest('.package-card').querySelector('h3').textContent;
            alert('Thank you for your interest in our ' + packageName + ' package! A representative will contact you shortly.');
        });
    });

>>>>>>> 7d0e8ba5e6a27ab5cf9177647941f7c94529e48e
    console.log('🏆 Denmak FC Maganyakulo - Website Loaded');
    console.log('📱 "Hii ni Denmak wewe, kataa uone"');
});