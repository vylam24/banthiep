document.addEventListener("DOMContentLoaded", function () {
    const cartCount = document.querySelector(".cart-count"); // Số lượng sản phẩm trong giỏ hàng
    const cartItems = document.getElementById("cart-items"); // Bảng hiển thị sản phẩm trong giỏ hàng
    const cartTotal = document.querySelector(".empty-cart span.text-danger"); // Tổng giá trị giỏ hàng
    const btnClearCart = document.querySelector(".btn-danger"); // Nút xóa tất cả
    const btnUpdateCart = document.querySelector(".btn-primary"); // Nút cập nhật giỏ hàng
    const btnCheckout = document.querySelector(".btn-success"); // Nút đặt hàng

    // Lấy giỏ hàng từ localStorage hoặc khởi tạo mảng rỗng
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Hàm hiển thị giỏ hàng
    function renderCart() {
        cartItems.innerHTML = ""; // Xóa nội dung cũ
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <tr>
                    <td colspan="7" class="empty-cart">Tổng giá bán: <span class="text-danger">Liên hệ</span></td>
                </tr>
            `;
            btnCheckout.disabled = true; // Vô hiệu hóa nút Đặt hàng nếu giỏ hàng trống
            return;
        }

        let total = 0;
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            cartItems.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td><img src="${item.image}" alt="${item.name}" class="cart-item-image"></td>
                    <td>${item.price.toLocaleString()} VNĐ</td>
                    <td>
                        <input type="number" class="cart-quantity" data-id="${item.name}" value="${item.quantity}" min="1">
                    </td>
                    <td>${itemTotal.toLocaleString()} VNĐ</td>
                    <td><button class="btn btn-sm btn-danger delete-btn" data-id="${item.name}">Xóa</button></td>
                </tr>
            `;
        });

        cartTotal.textContent = `${total.toLocaleString()} VNĐ`;
        btnCheckout.disabled = false; // Kích hoạt nút Đặt hàng nếu giỏ hàng không trống
    }

    // Hàm cập nhật số lượng hiển thị trong giỏ hàng
    function updateCartCount() {
        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalQuantity;
    }

    // Hàm thêm sản phẩm vào giỏ hàng
    function addToCart(productElement) {
        const productName = productElement.querySelector("h3").textContent;
        const productPrice = productElement.querySelector("p").textContent.replace("Giá: ", "").replace(" VNĐ", "").replace(".", "");
        const productImage = productElement.querySelector("img").src;

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingProduct = cart.find((item) => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity += 1; // Tăng số lượng nếu sản phẩm đã tồn tại
        } else {
            // Thêm sản phẩm mới vào giỏ hàng
            cart.push({
                name: productName,
                price: parseInt(productPrice),
                image: productImage,
                quantity: 1,
            });
        }

        // Lưu giỏ hàng vào localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Cập nhật giao diện
        updateCartCount();
        renderCart();
    }

    // Hàm xóa sản phẩm
    function deleteItem(productName) {
        cart = cart.filter((item) => item.name !== productName);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }

    // Hàm xóa tất cả sản phẩm
    function clearCart() {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }

    // Lắng nghe sự kiện click trên toàn bộ trang
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("button")) {
            // Thêm sản phẩm vào giỏ hàng
            const productElement = e.target.closest(".product-slide");
            addToCart(productElement);
            window.location.href = "cart.html"; // Chuyển hướng sang trang giỏ hàng
        }

        if (e.target.classList.contains("delete-btn")) {
            // Xóa sản phẩm khỏi giỏ hàng
            const productName = e.target.dataset.id;
            deleteItem(productName);
        }

        if (e.target === btnClearCart) {
            // Xóa tất cả sản phẩm
            if (confirm("Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?")) {
                clearCart();
            }
        }

        if (e.target === btnCheckout) {
            // Đặt hàng
            alert("Cảm ơn bạn đã đặt hàng!");
            clearCart();
        }
    });

    // Lắng nghe sự kiện thay đổi số lượng
    cartItems.addEventListener("input", function (e) {
        if (e.target.classList.contains("cart-quantity")) {
            const productName = e.target.dataset.id;
            const quantity = parseInt(e.target.value);
            const item = cart.find((item) => item.name === productName);
            if (item && quantity > 0) {
                item.quantity = quantity;
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
                updateCartCount();
            }
        }
    });

    // Hiển thị giỏ hàng ban đầu
    renderCart();
    updateCartCount();
});