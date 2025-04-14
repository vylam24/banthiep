document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search"); // Ô tìm kiếm
    const productSlides = document.querySelectorAll(".product-slide"); // Danh sách sản phẩm

    // Lắng nghe sự kiện nhập liệu trong ô tìm kiếm
    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase(); // Lấy giá trị tìm kiếm và chuyển thành chữ thường

        productSlides.forEach((slide) => {
            const productName = slide.querySelector("h3").textContent.toLowerCase(); // Lấy tên sản phẩm và chuyển thành chữ thường

            // Kiểm tra nếu tên sản phẩm chứa từ khóa tìm kiếm
            if (productName.includes(searchTerm)) {
                slide.style.display = "block"; // Hiển thị sản phẩm
            } else {
                slide.style.display = "none"; // Ẩn sản phẩm
            }
        });
    });
    const noResultMessage = document.createElement("p");
noResultMessage.textContent = "Không tìm thấy sản phẩm nào.";
noResultMessage.style.display = "none";
document.querySelector(".slider-container").appendChild(noResultMessage);

searchInput.addEventListener("input", function () {
    let hasResult = false;

    productSlides.forEach((slide) => {
        const productName = slide.querySelector("h3").textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            slide.style.display = "block";
            hasResult = true;
        } else {
            slide.style.display = "none";
        }
    });

    noResultMessage.style.display = hasResult ? "none" : "block";
});
});