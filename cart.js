document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartDisplay() {
        const cartItems = document.querySelector('.cart-items');
        const subtotalElement = document.querySelector('.summary-item:first-child span:last-child');
        const totalElement = document.querySelector('.summary-item.total span:last-child');
        const checkoutButton = document.querySelector('.checkout-button');

        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <p>Your cart is empty</p>
                    <a href="index.html" class="continue-shopping">Continue Shopping</a>
                </div>
            `;
            subtotalElement.textContent = '$0.00';
            totalElement.textContent = '$0.00';
            checkoutButton.disabled = true;
        } else {
            let cartHTML = '';
            let subtotal = 0;

            cart.forEach(item => {
                subtotal += item.price * item.quantity;
                cartHTML += `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="item-details">
                            <h3>${item.name}</h3>
                            <p class="price">$${item.price.toFixed(2)}</p>
                            <div class="quantity-controls">
                                <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                            </div>
                        </div>
                        <button onclick="removeItem('${item.id}')" class="remove-item">×</button>
                    </div>
                `;
            });

            cartItems.innerHTML = cartHTML;
            subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
            const total = subtotal;
            totalElement.textContent = `$${total.toFixed(2)}`;
            checkoutButton.disabled = false;
        }
    }

    window.updateQuantity = function(itemId, newQuantity) {
        if (newQuantity < 1) {
            removeItem(itemId);
            return;
        }

        const itemIndex = cart.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            cart[itemIndex].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    };

    window.removeItem = function(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    };

    updateCartDisplay();
});