document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCountElement = document.querySelector('.cart-count');
    const cartContainer = document.querySelector('#cart-items');
    const clearCartButton = document.querySelector('#clear-cart');
    const totalPriceElement = document.querySelector('.empty-cart span');

    // --- ADD TO CART FUNCTIONALITY (for all pages with add-to-cart buttons) ---
    if (addToCartButtons) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                const productName = this.getAttribute('data-name');
                const productPrice = parseFloat(this.getAttribute('data-price'));
                const productImage = this.getAttribute('data-image');
                const product = {
                    name: productName,
                    price: productPrice,
                    image: productImage
                };
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const existingProduct = cart.find(item => item.name === productName);
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    product.quantity = 1;
                    cart.push(product);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                alert('Sản phẩm đã được thêm vào giỏ hàng!');
            });
        });
    }

    // --- UPDATE CART COUNT (for all pages) ---
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
        }
    }

    function renderCart() {
        if (!cartContainer) return;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContainer.innerHTML = '';
        if (cart.length === 0) {
            cartContainer.innerHTML = '<tr><td colspan="7" class="empty-cart">Giỏ hàng của bạn hiện tại trống.</td></tr>';
            if (totalPriceElement) totalPriceElement.textContent = '';
        } else {
            cart.forEach((item, index) => {
                const cartRow = document.createElement('tr');
                const totalItemPrice = item.price * item.quantity;
                cartRow.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td><img src="${item.image}" alt="${item.name}" width="100"></td>
                    <td>${item.price} VNĐ</td>
                    <td>
                        <button class="decrease-qty" data-index="${index}">-</button>
                        <span class="item-qty">${item.quantity}</span>
                        <button class="increase-qty" data-index="${index}">+</button>
                    </td>
                    <td>${totalItemPrice} VNĐ</td>
                    <td><button class="remove-item" data-index="${index}">Xóa</button></td>
                `;
                cartContainer.appendChild(cartRow);
            });
            // Tổng thành tiền
            const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            if (totalPriceElement) totalPriceElement.textContent = `Tổng giá bán: ${totalPrice.toLocaleString()} VNĐ`;
            // Hiển thị tổng thành tiền ở ngoài bảng nếu có
        const cartTotal = document.getElementById('cart-total');
        if (cartTotal) cartTotal.textContent = `Tổng thành tiền: ${totalPrice.toLocaleString()} VNĐ`;
            // Xóa từng sản phẩm
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function () {
                    const productIndex = parseInt(this.getAttribute('data-index'));
                    removeItemFromCart(productIndex);
                });
            });
    
            // Tăng số lượng
            document.querySelectorAll('.increase-qty').forEach(button => {
                button.addEventListener('click', function () {
                    const productIndex = parseInt(this.getAttribute('data-index'));
                    changeQuantity(productIndex, 1);
                });
            });
    
            // Giảm số lượng
            document.querySelectorAll('.decrease-qty').forEach(button => {
                button.addEventListener('click', function () {
                    const productIndex = parseInt(this.getAttribute('data-index'));
                    changeQuantity(productIndex, -1);
                });
            });
        }
    }
    
    function changeQuantity(index, delta) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart[index]) {
            cart[index].quantity += delta;
            if (cart[index].quantity < 1) cart[index].quantity = 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            renderCart();
        }
    }
    function removeItemFromCart(index) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    }

    // --- CLEAR CART (only on cart page) ---
    if (clearCartButton) {
        clearCartButton.addEventListener('click', function () {
            if (confirm('Bạn có chắc chắn muốn xoá tất cả sản phẩm trong giỏ hàng?')) {
                localStorage.removeItem('cart');
                renderCart();
                updateCartCount();
            }
        });
    }
  
    // --- INITIALIZE ---
    updateCartCount();
    if (cartContainer) renderCart();
});
document.addEventListener('DOMContentLoaded', function () {
    // ...existing code...

    // Modal đặt hàng
    const orderBtn = document.getElementById('order-btn');
    const orderModal = document.getElementById('order-modal');
    const closeModal = document.querySelector('.close-modal');
    const orderForm = document.getElementById('order-form');

    if (orderBtn && orderModal && closeModal && orderForm) {
        orderBtn.addEventListener('click', function () {
            orderModal.style.display = 'block';
        });
        closeModal.addEventListener('click', function () {
            orderModal.style.display = 'none';
        });
        window.onclick = function(event) {
            if (event.target == orderModal) orderModal.style.display = 'none';
        };
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Lưu thông tin khách hàng vào localStorage (hoặc gửi lên server)
            const info = {
                name: document.getElementById('customer-name').value,
                phone: document.getElementById('customer-phone').value,
                email: document.getElementById('customer-email').value,
                address: document.getElementById('customer-address').value
            };
            localStorage.setItem('orderInfo', JSON.stringify(info));
            orderModal.style.display = 'none';
            window.location.href = 'hoadon.html'; // chuyển đến trang hóa đơn
        });
    }
});