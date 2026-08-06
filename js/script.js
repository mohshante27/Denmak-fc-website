/**
 * Denmak FC - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {

    // ---------- Mobile Dropdown Toggle ----------
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.classList.toggle('active');
            }
        });
    });

    // ---------- Add to Cart Functionality ----------
    const cartButtons = document.querySelectorAll('.add-to-cart');
    const cartTotalElement = document.getElementById('cart-total');
    const cartEmpty = document.querySelector('.cart-empty');
    let cartItems = 0;
    let cartTotal = 0;

    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPriceText = productCard.querySelector('.product-price').textContent;
            const productPrice = parseInt(productPriceText.replace('KSh ', '').replace(',', ''));

            // Update cart
            cartItems++;
            cartTotal += productPrice;

            // Update display
            if (cartTotalElement) {
                cartTotalElement.textContent = 'KSh ' + cartTotal.toLocaleString();
            }

            if (cartEmpty) {
                cartEmpty.innerHTML = '<p>You have ' + cartItems + ' item(s) in your cart</p>';
            }

            // Alert feedback
            alert(productName + ' added to cart! (KSh ' + productPrice.toLocaleString() + ')');
        });
    });

    // ---------- Checkout Button ----------
    const checkoutBtn = document.querySelector('.checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cartItems === 0) {
                alert('Your cart is empty. Add some items first!');
            } else {
                alert('Thank you for shopping with Denmak FC! Total: KSh ' + cartTotal.toLocaleString());
                // Reset cart
                cartItems = 0;
                cartTotal = 0;
                if (cartTotalElement) {
                    cartTotalElement.textContent = 'KSh 0';
                }
                if (cartEmpty) {
                    cartEmpty.innerHTML = '<p>Your cart is empty. Start shopping!</p>';
                }
            }
        });
    }

    // ---------- Smooth Scrolling ----------
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
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

    // ---------- Product Size Selection ----------
    const sizes = document.querySelectorAll('.product-sizes span');

    sizes.forEach(size => {
        size.addEventListener('click', function() {
            // Remove selected class from siblings
            const siblings = this.parentElement.querySelectorAll('span');
            siblings.forEach(s => s.style.background = '');
            siblings.forEach(s => s.style.color = '');

            // Highlight selected
            this.style.background = '#f9d423';
            this.style.color = '#0a0a2e';
        });
    });

    // ---------- Partnership Inquire Buttons ----------
    const inquireBtns = document.querySelectorAll('.package-card .btn');

    inquireBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const packageName = this.closest('.package-card').querySelector('h3').textContent;
            alert('Thank you for your interest in our ' + packageName + ' package! A representative will contact you shortly.');
        });
    });

    console.log('🏆 Denmak FC Maganyakulo - Website Loaded');
    console.log('📱 "Hii ni Denmark wewe, kataa uone"');
});