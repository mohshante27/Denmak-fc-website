/**
 * Denmak FC - Main JavaScript (DEFENSIVE / ISOLATED)
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log('🏆 Denmak FC - Script Loaded');

    // Helper: run each feature in isolation so one error can't kill the rest
    function safe(name, fn) {
        try { fn(); console.log('✅ ' + name + ' OK'); }
        catch (e) { console.error('❌ ' + name + ' FAILED:', e); }
    }

    // ============================================
    // 1. HAMBURGER MENU
    // ============================================
    safe('Hamburger', function () {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        if (!hamburger || !navMenu) return;

        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
    });

    // ============================================
    // 2. MOBILE DROPDOWN
    // ============================================
    safe('Dropdown', function () {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector(':scope > a');
            if (!link) return;
            link.addEventListener('click', function (e) {
                if (window.innerWidth <= 768) {
                    const href = this.getAttribute('href');
                    if (!href || href === '#' || href.indexOf('revenue.html') !== -1) {
                        e.preventDefault();
                    }
                    dropdowns.forEach(o => { if (o !== dropdown) o.classList.remove('active'); });
                    dropdown.classList.toggle('active');
                }
            });
        });
        document.addEventListener('click', function (e) {
            if (window.innerWidth <= 768 && !e.target.closest('.dropdown')) {
                dropdowns.forEach(d => d.classList.remove('active'));
            }
        });
    });

    // ============================================
    // 3. CAROUSEL ENGINE
    // ============================================
    safe('Carousel Engine', function () {
        function initScrollCarousel(wrapper) {
            const track = wrapper.querySelector('.partners-track, .news-track');
            if (!track) return;

            const slides = track.querySelectorAll('.partner-logo, .news-card');
            if (slides.length === 0) return;

            const prevBtn = wrapper.querySelector('.carousel-btn.prev');
            const nextBtn = wrapper.querySelector('.carousel-btn.next');

            // dots: look in parent, then wrapper
            let dotsContainer = null;
            if (wrapper.parentElement) {
                dotsContainer = wrapper.parentElement.querySelector('.carousel-dots, .news-carousel-dots');
            }
            if (!dotsContainer) {
                dotsContainer = wrapper.querySelector('.carousel-dots, .news-carousel-dots');
            }

            let autoSlideTimer = null;
            let isUserInteracting = false;

            function getScrollStep() {
                const first = slides[0];
                if (!first) return track.clientWidth;
                const style = window.getComputedStyle(track);
                const gap = parseFloat(style.gap) || 25;
                const visible = window.innerWidth <= 768 ? 1 : (window.innerWidth <= 1024 ? 2 : 3);
                return (first.offsetWidth + gap) * visible;
            }

            function scrollNext() {
                const maxScroll = track.scrollWidth - track.clientWidth;
                if (track.scrollLeft >= maxScroll - 20) {
                    track.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
                }
            }

            function scrollPrev() {
                if (track.scrollLeft <= 20) {
                    track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
                } else {
                    track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
                }
            }

            if (nextBtn) nextBtn.addEventListener('click', function (e) {
                e.preventDefault(); e.stopPropagation();
                scrollNext(); resetAutoSlide();
            });
            if (prevBtn) prevBtn.addEventListener('click', function (e) {
                e.preventDefault(); e.stopPropagation();
                scrollPrev(); resetAutoSlide();
            });

            function startAutoSlide() {
                stopAutoSlide();
                autoSlideTimer = setInterval(() => {
                    if (!isUserInteracting) scrollNext();
                }, 4000);
            }
            function stopAutoSlide() {
                if (autoSlideTimer) { clearInterval(autoSlideTimer); autoSlideTimer = null; }
            }
            function resetAutoSlide() { stopAutoSlide(); startAutoSlide(); }

            track.addEventListener('mouseenter', () => { isUserInteracting = true; });
            track.addEventListener('mouseleave', () => { isUserInteracting = false; });
            track.addEventListener('touchstart', () => { isUserInteracting = true; }, { passive: true });
            track.addEventListener('touchend', () => { setTimeout(() => { isUserInteracting = false; }, 2500); }, { passive: true });

            // Dots
            if (dotsContainer) {
                function buildDots() {
                    const step = track.clientWidth || 1;
                    const totalPages = Math.max(1, Math.ceil(track.scrollWidth / step));
                    if (dotsContainer.children.length !== totalPages) {
                        dotsContainer.innerHTML = '';
                        if (totalPages > 1) {
                            for (let i = 0; i < totalPages; i++) {
                                const dot = document.createElement('button');
                                dot.className = 'dot' + (i === 0 ? ' active' : '');
                                dot.setAttribute('aria-label', 'Page ' + (i + 1));
                                dot.addEventListener('click', function (e) {
                                    e.preventDefault();
                                    track.scrollTo({ left: i * step, behavior: 'smooth' });
                                    resetAutoSlide();
                                });
                                dotsContainer.appendChild(dot);
                            }
                        }
                    }
                }
                function updateDotsActive() {
                    const step = track.clientWidth || 1;
                    const idx = Math.min(
                        dotsContainer.children.length - 1,
                        Math.round(track.scrollLeft / step)
                    );
                    Array.from(dotsContainer.children).forEach((d, i) => {
                        d.classList.toggle('active', i === idx);
                    });
                }
                buildDots();
                track.addEventListener('scroll', () => {
                    requestAnimationFrame(updateDotsActive);
                }, { passive: true });
                setTimeout(updateDotsActive, 150);
            }

            startAutoSlide();
            console.log('✅ Carousel ready:', wrapper.className);
        }

        function initAllCarousels() {
            document.querySelectorAll('.partners-carousel-wrapper, .news-carousel-wrapper')
                .forEach(wrapper => {
                    if (!wrapper.dataset.carouselReady) {
                        wrapper.dataset.carouselReady = 'true';
                        try { initScrollCarousel(wrapper); }
                        catch (e) { console.error('Carousel failed:', wrapper.className, e); }
                    }
                });
        }

        initAllCarousels();
        setTimeout(initAllCarousels, 300);
    });

    // ============================================
    // 4. CART / ADD TO CART
    // ============================================
    safe('Cart', function () {
        const buttons = document.querySelectorAll('.add-to-cart');
        if (buttons.length === 0) return;

        const totalEl = document.getElementById('cart-total');
        const emptyEl = document.querySelector('.cart-empty');
        let count = 0, total = 0;

        buttons.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const card = this.closest('.product-card');
                if (!card) return;
                const priceText = card.querySelector('.product-price')?.textContent || 'KSh 0';
                const price = parseInt(priceText.replace(/[^\d]/g, ''), 10) || 0;
                count++; total += price;
                if (totalEl) totalEl.textContent = 'KSh ' + total.toLocaleString();
                if (emptyEl) emptyEl.innerHTML = '<p>🛒 You have ' + count + ' item(s) in your cart</p>';
                const orig = this.textContent;
                this.textContent = '✅ Added!';
                this.style.background = '#28a745';
                this.style.color = 'white';
                setTimeout(() => { this.textContent = orig; this.style.background = ''; this.style.color = ''; }, 1500);
            });
        });

        const checkout = document.querySelector('.checkout');
        if (checkout) checkout.addEventListener('click', function (e) {
            e.preventDefault();
            if (count === 0) { alert('🛒 Your cart is empty!'); return; }
            alert('✅ Thank you! Total: KSh ' + total.toLocaleString());
            count = 0; total = 0;
            if (totalEl) totalEl.textContent = 'KSh 0';
            if (emptyEl) emptyEl.innerHTML = '<p>🛒 Your cart is empty. Start shopping!</p>';
        });
    });

    // ============================================
    // 5. PRODUCT SIZES
    // ============================================
    safe('Product Sizes', function () {
        document.querySelectorAll('.product-sizes span').forEach(size => {
            size.addEventListener('click', function (e) {
                e.preventDefault();
                this.parentElement.querySelectorAll('span').forEach(s => {
                    s.style.background = ''; s.style.color = ''; s.style.borderColor = '#ddd';
                });
                this.style.background = '#f9d423';
                this.style.color = '#0a0a2e';
                this.style.borderColor = '#f9d423';
            });
        });
    });

    // ============================================
    // 6. PARTNERSHIP INQUIRE BUTTONS
    // ============================================
    safe('Inquire Buttons', function () {
        document.querySelectorAll('.package-card .btn, .inquire-btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const card = this.closest('.package-card');
                const pkg = this.dataset.package || (card?.querySelector('h3')?.textContent || 'Partnership');
                alert('📩 Thank you for your interest in our ' + pkg + ' package!\n\nWe will contact you shortly. You can also reach us at fcdenmak@gmail.com or +254 118 514 735.');
            });
        });
    });

    // ============================================
    // 7. MATCHES (isolated, at the end)
    // ============================================
    safe('Matches', function () {
        const hasNext = document.querySelector('.next-match');
        const hasResults = document.querySelector('.results-grid');
        const hasStandings = document.querySelector('.standings');
        const hasFixtures = document.querySelector('.fixture-list-grid');
        if (!hasNext && !hasResults && !hasStandings && !hasFixtures) return;

        const jsonPath = window.location.pathname.includes('/pages/')
            ? '../data/matches.json'
            : 'data/matches.json';

        const fallback = {
            league: { clubStats: { points: 0, position: 9, matches: 0 } },
            nextMatch: {
                homeTeam: 'Congo Boys', awayTeam: 'Denmak FC',
                date: 'November 14, 2026', time: '3:00 PM EAT',
                venue: 'Serani Ground, Mombasa', ticketInfo: 'Free Entry'
            },
            fixtures: [],
            results: [],
            standings: []
        };

        function apply(data) {
            if (data.league && data.league.clubStats) {
                const nums = document.querySelectorAll('.hero-stats .stat-item .stat-number');
                if (nums.length >= 3) {
                    nums[0].textContent = data.league.clubStats.points;
                    nums[1].textContent = '#' + data.league.clubStats.position;
                    nums[2].textContent = data.league.clubStats.matches;
                }
            }
            // ... (rest of your applyMatchData logic — leave as-is)
        }

        if (typeof window.DenmakMatchesData !== 'undefined') {
            apply(window.DenmakMatchesData);
            return;
        }

        fetch(jsonPath)
            .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
            .then(apply)
            .catch(err => {
                console.warn('Matches JSON unavailable, using fallback:', err.message);
                apply(fallback);
            });
    });

    console.log('🏆 Denmak FC - Ready!');
});