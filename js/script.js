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

    // ============================================
    // 8. DYNAMIC MATCHES & FIXTURES LOADER (matches.json)
    // ============================================
    initMatches();

    function initMatches() {
        const hasNextMatch = document.querySelector('.next-match');
        const hasResults = document.querySelector('.results-grid');
        const hasStandings = document.querySelector('.standings');
        const hasFixtures = document.querySelector('.fixture-list-grid');

        if (!hasNextMatch && !hasResults && !hasStandings && !hasFixtures) {
            return;
        }

        console.log('⚽ Loading matches data...');

        // Detect correct relative path whether in root or /pages/
        const jsonPath = window.location.pathname.includes('/pages/') 
            ? '../data/matches.json' 
            : 'data/matches.json';

        // Embedded fallback data for offline / file:// protocol
        const fallbackData = {
            league: {
                name: "FKF Division Two Northern Zone",
                pool: "Pool A",
                season: "2025/2026",
                clubStats: { points: 70, position: 1, matches: 28, won: 22, drawn: 4, lost: 2, goalDifference: "+36" }
            },
            nextMatch: {
                homeTeam: "Denmak FC",
                awayTeam: "Rwafa FC",
                date: "August 8, 2026",
                time: "3:00 PM EAT",
                venue: "Kombani Ground, Kombani",
                competition: "FKF Division Two - Pool A",
                ticketInfo: "Free Entry / VIP KSh 200"
            },
            fixtures: [
                { id: "fix-1", date: "Aug 8, 2026", time: "3:00 PM", homeTeam: "Denmak FC", awayTeam: "Rwafa FC", venue: "Kombani Ground" },
                { id: "fix-2", date: "Aug 17, 2026", time: "2:00 PM", homeTeam: "Young Bulls", awayTeam: "Denmak FC", venue: "Mombasa Sports Club" },
                { id: "fix-3", date: "Aug 24, 2026", time: "3:00 PM", homeTeam: "Denmak FC", awayTeam: "Wayzata Boys", venue: "Maganyakulo Ground" },
                { id: "fix-4", date: "Sep 2, 2026", time: "3:00 PM", homeTeam: "Denmak FC", awayTeam: "Kisumu Ndogo", venue: "Maganyakulo Ground" },
                { id: "fix-5", date: "Sep 10, 2026", time: "3:00 PM", homeTeam: "Good Hope", awayTeam: "Denmak FC", venue: "Msambweni Ground" }
            ],
            results: [
                { date: "Jul 25, 2026", opponent: "Spaki Youth", location: "A", score: "0 - 3", status: "W", outcome: "win" },
                { date: "Jul 18, 2026", opponent: "Ubuntu FC", location: "H", score: "3 - 1", status: "W", outcome: "win" },
                { date: "Jul 11, 2026", opponent: "Matano Mane", location: "H", score: "2 - 0", status: "W/O", outcome: "win" },
                { date: "Jul 5, 2026", opponent: "Inter Dabaso", location: "H", score: "3 - 0", status: "W", outcome: "win" },
                { date: "Jun 28, 2026", opponent: "Junior FC", location: "A", score: "1 - 2", status: "W", outcome: "win" },
                { date: "Jun 21, 2026", opponent: "Congo Boyz", location: "H", score: "2 - 1", status: "W", outcome: "win" }
            ],
            standings: [
                { rank: 1, team: "Denmak FC", played: 28, won: 22, drawn: 4, lost: 2, gd: "+36", points: 70, isClub: true },
                { rank: 2, team: "Rwafa FC", played: 30, won: 16, drawn: 12, lost: 2, gd: "+33", points: 60, isClub: false },
                { rank: 3, team: "Yanga FC KE", played: 28, won: 17, drawn: 5, lost: 6, gd: "+18", points: 56, isClub: false },
                { rank: 4, team: "Kisumu Ndogo", played: 31, won: 14, drawn: 11, lost: 6, gd: "+19", points: 53, isClub: false },
                { rank: 5, team: "Good Hope", played: 27, won: 15, drawn: 7, lost: 5, gd: "+33", points: 52, isClub: false },
                { rank: 6, team: "Sparki Youth", played: 29, won: 13, drawn: 8, lost: 8, gd: "+12", points: 47, isClub: false },
                { rank: 7, team: "Ubuntu FC", played: 28, won: 11, drawn: 9, lost: 8, gd: "+5", points: 42, isClub: false },
                { rank: 8, team: "Young Bulls", played: 28, won: 10, drawn: 8, lost: 10, gd: "0", points: 38, isClub: false }
            ]
        };

        fetch(jsonPath)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                window.DenmakMatches = data;
                applyMatchData(data);
                console.log('✅ Matches data loaded dynamically from JSON!');
            })
            .catch(err => {
                console.warn('⚠️ Could not fetch matches.json (likely file:// protocol or offline). Using embedded data.', err.message);
                window.DenmakMatches = fallbackData;
                applyMatchData(fallbackData);
            });
    }

    function applyMatchData(data) {
        // 1. Update Hero stats on homepage
        if (data.league && data.league.clubStats) {
            const statNumbers = document.querySelectorAll('.hero-stats .stat-item .stat-number');
            if (statNumbers.length >= 3) {
                statNumbers[0].textContent = data.league.clubStats.points;
                statNumbers[1].textContent = `#${data.league.clubStats.position}`;
                statNumbers[2].textContent = data.league.clubStats.matches;
            }
        }

        // 2. Update Next Match / Featured Fixture on homepage
        if (data.nextMatch) {
            const featuredCard = document.querySelector('.next-match .match-card');
            if (featuredCard) {
                featuredCard.innerHTML = `
                    <div class="match-details">
                        <span class="match-date">📅 ${data.nextMatch.date}</span>
                        <span class="match-time">⏰ ${data.nextMatch.time}</span>
                        <span class="match-venue">📍 ${data.nextMatch.venue}</span>
                    </div>
                    <div class="match-teams">
                        <div class="team home">
                            <span class="team-name">${data.nextMatch.homeTeam}</span>
                            <span class="team-badge"></span>
                        </div>
                        <span class="vs">VS</span>
                        <div class="team away">
                            <span class="team-badge"></span>
                            <span class="team-name">${data.nextMatch.awayTeam}</span>
                        </div>
                    </div>
                    ${data.nextMatch.ticketInfo ? `<div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.85; text-align: center;">🎟️ ${data.nextMatch.ticketInfo}</div>` : ''}
                `;
            }
        }

        // 3. Update Recent Results on Homepage (latest 4)
        const homeResultsGrid = document.querySelector('.recent-results .results-grid');
        if (homeResultsGrid && data.results) {
            const topResults = data.results.slice(0, 4);
            homeResultsGrid.innerHTML = topResults.map(r => `
                <div class="result-card ${r.outcome || 'win'}">
                    <span class="result-score">${r.score}</span>
                    <span class="result-opponent">vs ${r.opponent} ${r.location ? `(${r.location})` : ''}</span>
                    <span class="result-date">${r.date}</span>
                    <span class="result-status">${r.status === 'W' ? '✅ Win' : r.status === 'W/O' ? '✅ Walkover' : r.status === 'D' ? '🤝 Draw' : '❌ Loss'}</span>
                </div>
            `).join('');
        }

        // 4. Update Standings Table on Match Centre page
        const standingsTbody = document.querySelector('.standings tbody');
        if (standingsTbody && data.standings) {
            standingsTbody.innerHTML = data.standings.map(row => `
                <tr class="${row.isClub ? 'highlight' : ''}">
                    <td>${row.rank}</td>
                    <td><strong>${row.team}</strong>${row.isClub ? ' ⭐' : ''}</td>
                    <td>${row.played}</td>
                    <td>${row.won}</td>
                    <td>${row.drawn}</td>
                    <td>${row.lost}</td>
                    <td>${row.gd}</td>
                    <td><strong>${row.points}</strong></td>
                </tr>
            `).join('');
        }

        // 5. Update Upcoming Fixtures on Match Centre page
        const fixturesGrid = document.querySelector('.fixture-list-grid');
        if (fixturesGrid && data.fixtures) {
            fixturesGrid.innerHTML = data.fixtures.map(f => `
                <div class="fixture-card">
                    <span class="fixture-date">📅 ${f.date}</span>
                    <span class="fixture-time">⏰ ${f.time}</span>
                    <div class="fixture-teams">
                        <span class="home-team">${f.homeTeam}</span>
                        <span class="vs">vs</span>
                        <span class="away-team">${f.awayTeam}</span>
                    </div>
                    ${f.venue ? `<div style="font-size: 0.85rem; color: #888; margin-top: 8px;">📍 ${f.venue}</div>` : ''}
                </div>
            `).join('');
        }

        // 6. Update Recent Results on Match Centre page
        const matchesResultsGrid = document.querySelector('.results-section .results-grid');
        if (matchesResultsGrid && data.results) {
            matchesResultsGrid.innerHTML = data.results.map(r => `
                <div class="result-card ${r.outcome || 'win'}">
                    <span class="result-score">${r.score}</span>
                    <span class="result-opponent">vs ${r.opponent} (${r.location})</span>
                    <span class="result-date">${r.date}</span>
                    <span class="result-status">${r.status}</span>
                </div>
            `).join('');
        }
    }

    console.log('🏆 Denmak FC - Ready!');
});