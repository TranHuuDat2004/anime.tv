let slideIndex = 1;
let slideInterval;
const AUTO_SLIDE_DELAY = 7000; // 7 giây

// Hàm khởi tạo và hiển thị slide đầu tiên
function initializeSlideshow() {
    const slides = document.getElementsByClassName("hero-slide");
    if (slides.length > 0) {
        showSlides(slideIndex);
        setAutoSlide();
    }
}

// Hàm để chuyển đến slide cụ thể (khi click nút prev/next)
function plusSlides(n) {
    clearTimeout(slideInterval);
    showSlides(slideIndex += n);
    setAutoSlide();
}

// Hàm để chuyển đến slide cụ thể (khi click vào dot)
function currentSlide(n) {
    clearTimeout(slideInterval);
    showSlides(slideIndex = n);
    setAutoSlide();
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("hero-slide");
    const dots = document.getElementsByClassName("dot");

    if (slides.length === 0) return;

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }

    slides[slideIndex - 1].style.display = "block";
    if (dots.length > 0 && dots[slideIndex - 1]) {
        dots[slideIndex - 1].className += " active-dot";
    }
}

// Hàm tự động chuyển slide (được gọi bởi setAutoSlide)
function autoSlide() {
    slideIndex++;
    showSlides(slideIndex); // showSlides sẽ xử lý việc quay vòng slideIndex
    setAutoSlide(); // Lập lịch cho lần chuyển tiếp theo
}

// Hàm thiết lập hoặc reset bộ đếm thời gian tự động chuyển slide
function setAutoSlide() {
    clearTimeout(slideInterval); // Xóa interval cũ (nếu có)
    const slides = document.getElementsByClassName("hero-slide");
    if (slides.length > 1) { // Chỉ tự động chuyển nếu có nhiều hơn 1 slide
        slideInterval = setTimeout(autoSlide, AUTO_SLIDE_DELAY);
    }
}

// Khởi động slideshow khi trang đã tải xong
window.onload = initializeSlideshow;