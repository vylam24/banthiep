document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector('.product-slider');
    const slides = document.querySelectorAll('.product-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
  
    let currentIndex = 0;
    const slidesPerView = 4; // Số lượng slide hiển thị cùng lúc
    const totalSlides = slides.length; // Tổng số slide
    const slideWidth = slides[0].getBoundingClientRect().width; // Chiều rộng của một slide
  
    // Set width cho container nếu cần
    slider.style.width = `${slideWidth * totalSlides}px`;
  
    nextBtn.addEventListener('click', () => {
      if (currentIndex < totalSlides - slidesPerView) {
        currentIndex++;
        updateSlider();
      } else {
        currentIndex = 0; // Quay lại slide đầu tiên nếu đã ở cuối
        updateSlider();
      }
    });
  
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      } else {
        currentIndex = totalSlides - slidesPerView; // Quay lại slide cuối cùng nếu đã ở đầu
        updateSlider();
      }
    });
  
    function updateSlider() {
      const translateX = -slideWidth * currentIndex;
      slider.style.transform = `translateX(${translateX}px)`;
    }
  });