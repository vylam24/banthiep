document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector('.product-slider');
    const slides = document.querySelectorAll('.product-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
  
    let currentIndex = 0;
    const slidesPerView = 4;
    const totalSlides = slides.length;
    const slideWidth = slides[0].getBoundingClientRect().width;
  
    // Set width cho container nếu cần
    slider.style.width = `${slideWidth * totalSlides}px`;
  
    nextBtn.addEventListener('click', () => {
      if (currentIndex < totalSlides - slidesPerView) {
        currentIndex++;
        updateSlider();
      }
    });
  
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });
  
    function updateSlider() {
      const translateX = -slideWidth * currentIndex;
      slider.style.transform = `translateX(${translateX}px)`;
    }
  });
  