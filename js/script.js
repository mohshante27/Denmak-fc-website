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
    // 3. CAROUSEL INITIALIZER (PARTNERS & NEWS)
    // ============================================
    setTimeout(function() {
        initAllCarousels();
    }, 300);

    function initAllCarousels() {
        console.log('🔄 Initializing carousels (Partners & News)...');
        const carousels = document.querySelectorAll('.partners-carousel-wrapper, .news-carousel-wrapper');
        carousels.forEach(wrapper => setupCarousel(wrapper));
    }

    function setupCarousel(wrapper) {
        const track = wrapper.querySelector('.partners-track, .news-track');
        if (!track) return;

        const slides = Array.from(track.children);
        if (slides.length === 0) return;

        const prevBtn = wrapper.querySelector('.carousel-btn.prev');
        const nextBtn = wrapper.querySelector('.carousel-btn.next');
        const dotsContainer = wrapper.parentElement.querySelector('.carousel-dots, .news-carousel-dots');

        let currentIndex = 0;
        let autoSlideInterval = null;
        let isAnimating = false;

        function getSlidesPerView() {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1024) return 2;
            return 3;
        }

        function getMaxIndex() {
            return Math.max(0, slides.length - getSlidesPerView());
        }

        function updateSlidePosition() {
            const slide = slides[0];
            if (!slide) return;
            const style = window.getComputedStyle(track);
            const gap = parseFloat(style.gap) || 30;
            const slideWidth = slide.getBoundingClientRect().width;
            const offset = currentIndex * (slideWidth + gap);
            track.style.transform = 'translateX(-' + offset + 'px)';

            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.dot');
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
            }
        }

        function goToSlide(index) {
            if (isAnimating) return;
            isAnimating = true;
            const maxIndex = getMaxIndex();
            currentIndex = Math.max(0, Math.min(index, maxIndex));
            updateSlidePosition();
            setTimeout(function() {
                isAnimating = false;
            }, 600);
        }

        function nextSlide() {
            if (isAnimating) return;
            const maxIndex = getMaxIndex();
            if (currentIndex >= maxIndex) {
                goToSlide(0);
            } else {
                goToSlide(currentIndex + 1);
            }
        }

        function prevSlide() {
            if (isAnimating) return;
            const maxIndex = getMaxIndex();
            if (currentIndex <= 0) {
                goToSlide(maxIndex);
            } else {
                goToSlide(currentIndex - 1);
            }
        }

        function buildDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            const maxIndex = getMaxIndex();
            const totalDots = maxIndex + 1;
            if (totalDots <= 1) return;

            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('button');
                dot.className = 'dot' + (i === currentIndex ? ' active' : '');
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                dot.addEventListener('click', function() {
                    goToSlide(i);
                    resetAutoSlide();
                });
                dotsContainer.appendChild(dot);
            }
        }

        function startAutoSlide() {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
            if (getMaxIndex() > 0) {
                autoSlideInterval = setInterval(nextSlide, 4500);
            }
        }

        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        }

        function resetAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }

        // Button event listeners with cloning to avoid duplicate bindings
        if (prevBtn) {
            const newPrev = prevBtn.cloneNode(true);
            prevBtn.parentNode.replaceChild(newPrev, prevBtn);
            newPrev.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                prevSlide();
                resetAutoSlide();
            });
        }

        if (nextBtn) {
            const newNext = nextBtn.cloneNode(true);
            nextBtn.parentNode.replaceChild(newNext, nextBtn);
            newNext.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                nextSlide();
                resetAutoSlide();
            });
        }

        // Pause on hover
        wrapper.addEventListener('mouseenter', stopAutoSlide);
        wrapper.addEventListener('mouseleave', startAutoSlide);

        // Touch swipe support
        let touchStartX = 0;
        track.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });

        track.addEventListener('touchend', function(e) {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) {
                if (diff > 0) nextSlide();
                else prevSlide();
                resetAutoSlide();
            }
        }, { passive: true });

        // Resize handler
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                const maxIndex = getMaxIndex();
                if (currentIndex > maxIndex) currentIndex = maxIndex;
                buildDots();
                updateSlidePosition();
            }, 200);
        });

        // Initialize
        buildDots();
        updateSlidePosition();
        startAutoSlide();
        console.log('✅ Carousel initialized for:', wrapper.className);
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
                name: "FKF Division 1",
                pool: "Zone A",
                season: "2026/2027",
                clubStats: { points: 0, position: 9, matches: 0, won: 0, drawn: 0, lost: 0, goalDifference: "0" }
            },
            nextMatch: {
                homeTeam: "Congo Boys",
                awayTeam: "Denmak FC",
                date: "November 14, 2026",
                time: "3:00 PM EAT",
                venue: "Serani Ground, Mombasa",
                competition: "FKF Division 1 Zone A",
                ticketInfo: "Free Entry"
            },
            fixtures: [
                { id: "fix-1", date: "Nov 14, 2026", time: "3:00 PM", homeTeam: "Congo Boys", awayTeam: "Denmak FC", venue: "Serani Ground", competition: "FKF Division 1 Zone A" },
                { id: "fix-2", date: "Nov 18, 2026", time: "2:00 PM", homeTeam: "Young Bulls", awayTeam: "Denmak FC", venue: "Mombasa Sports Club", competition: "FKF Division 1 Zone A" },
                { id: "fix-3", date: "Nov 22, 2026", time: "3:00 PM", homeTeam: "Denmak FC", awayTeam: "Wayzata Boys", venue: "Maganyakulo Ground", competition: "FKF Division 1 Zone A" }
            ],
            results: [
                { date: "Jul 25, 2026", opponent: "Spaki Youth", location: "A", score: "0 - 3", status: "W", outcome: "win" },
                { date: "Jul 18, 2026", opponent: "Ubuntu FC", location: "H", score: "3 - 1", status: "W", outcome: "win" },
                { date: "Jul 11, 2026", opponent: "Matano Mane", location: "H", score: "2 - 0", status: "W/O", outcome: "win" },
                { date: "Jul 5, 2026", opponent: "Inter Dabaso", location: "H", score: "3 - 0", status: "W", outcome: "win" },
                { date: "Jul 25, 2026", opponent: "Junior FC", location: "A", score: "1 - 2", status: "W", outcome: "win" }
            ],
            standings: [
                { rank: 1, team: "Teita Estate", played: 1, gd: "+1", points: 3, isClub: false },
                { rank: 2, team: "Gituru", played: 1, gd: "+1", points: 3, isClub: false },
                { rank: 3, team: "KAPA", played: 1, gd: "+1", points: 3, isClub: false },
                { rank: 4, team: "Kahawa United", played: 1, gd: "0", points: 1, isClub: false },
                { rank: 5, team: "Simba Apparel", played: 1, gd: "0", points: 1, isClub: false },
                { rank: 6, team: "Bumbani Stars", played: 0, gd: "0", points: 0, isClub: false },
                { rank: 7, team: "Congo Boys", played: 0, gd: "0", points: 0, isClub: false },
                { rank: 8, team: "Delmonte", played: 0, gd: "0", points: 0, isClub: false },
                { rank: 9, team: "Denmak FC", played: 0, gd: "0", points: 0, isClub: true },
                { rank: 10, team: "Green Berets", played: 0, gd: "0", points: 0, isClub: false },
                { rank: 11, team: "Kibra United", played: 0, gd: "0", points: 0, isClub: false },
                { rank: 12, team: "T15 - A", played: 0, gd: "0", points: 0, isClub: false },
                { rank: 13, team: "T16 - A", played: 0, gd: "0", points: 0, isClub: false },
                { rank: 14, team: "Zetech Titans", played: 1, gd: "-1", points: 0, isClub: false, relegation: true },
                { rank: 15, team: "Royal Fresh", played: 1, gd: "-1", points: 0, isClub: false, relegation: true },
                { rank: 16, team: "Strathmore Uni.", played: 1, gd: "-1", points: 0, isClub: false, relegation: true }
            ]
        };

        // 1. If loaded via <script src="data/matches.js">, apply immediately (works 100% locally under file://)
        if (typeof window.DenmakMatchesData !== 'undefined') {
            window.DenmakMatches = window.DenmakMatchesData;
            applyMatchData(window.DenmakMatchesData);
            console.log('✅ Matches data loaded from data/matches.js!');
            return;
        }

        // 2. If running on a web server (http/https), fetch matches.json
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
            const numCols = document.querySelectorAll('.standings thead tr th').length;
            if (numCols <= 5) {
                standingsTbody.innerHTML = data.standings.map(row => `
                    <tr class="${row.isClub ? 'highlight' : ''} ${row.relegation ? 'relegation' : ''}">
                        <td>${row.rank}</td>
                        <td><strong>${row.team}</strong>${row.isClub ? ' ⭐' : ''}</td>
                        <td>${row.played}</td>
                        <td>${row.gd}</td>
                        <td><strong>${row.points}</strong></td>
                    </tr>
                `).join('');
            } else {
                standingsTbody.innerHTML = data.standings.map(row => `
                    <tr class="${row.isClub ? 'highlight' : ''} ${row.relegation ? 'relegation' : ''}">
                        <td>${row.rank}</td>
                        <td><strong>${row.team}</strong>${row.isClub ? ' ⭐' : ''}</td>
                        <td>${row.played}</td>
                        <td>${row.won != null ? row.won : '-'}</td>
                        <td>${row.drawn != null ? row.drawn : '-'}</td>
                        <td>${row.lost != null ? row.lost : '-'}</td>
                        <td>${row.gd}</td>
                        <td><strong>${row.points}</strong></td>
                    </tr>
                `).join('');
            }
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