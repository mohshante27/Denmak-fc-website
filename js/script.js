/**
 * Denmak FC - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {

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
        }
    });

    // ---------- Add to Cart Functionality ----------
    const cartButtons = document.querySelectorAll('.add-to-cart');
    const cartTotalElement = document.getElementById('cart-total');
    const cartEmpty = document.querySelector('.cart-empty');
    let cartItems = 0;
    let cartTotal = 0;

    cartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPriceText = productCard.querySelector('.product-price').textContent;
            const productPrice = parseInt(productPriceText.replace('KSh ', '').replace(',', ''));

            cartItems++;
            cartTotal += productPrice;

            if (cartTotalElement) {
                cartTotalElement.textContent = 'KSh ' + cartTotal.toLocaleString();
            }

            if (cartEmpty) {
                cartEmpty.innerHTML = '<p>You have ' + cartItems + ' item(s) in your cart</p>';
            }

            alert(productName + ' added to cart! (KSh ' + productPrice.toLocaleString() + ')');
        });
    });

    // ---------- Checkout Button ----------
    const checkoutBtn = document.querySelector('.checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            if (cartItems === 0) {
                alert('Your cart is empty. Add some items first!');
            } else {
                alert('Thank you for shopping with Denmak FC! Total: KSh ' + cartTotal.toLocaleString());
                cartItems = 0;
                cartTotal = 0;
                if (cartTotalElement) cartTotalElement.textContent = 'KSh 0';
                if (cartEmpty) cartEmpty.innerHTML = '<p>Your cart is empty. Start shopping!</p>';
            }
        });
    }

    // ---------- Smooth Scrolling ----------
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

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

    console.log('🏆 Denmak FC Maganyakulo - Website Loaded');
    console.log('📱 "Hii ni Denmak wewe, kataa uone"');
});