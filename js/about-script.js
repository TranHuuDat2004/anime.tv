// js/about-script.js

document.addEventListener('DOMContentLoaded', function() {
    console.log("Trang Giới Thiệu (about.html) đã tải xong!");

    // Ví dụ: Nếu bạn muốn thêm một hiệu ứng nhỏ khi hover vào các mục công nghệ
    const techItems = document.querySelectorAll('.tech-list li');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // item.style.backgroundColor = 'rgba(var(--primary-color-rgb), 0.1)'; // Cần biến --primary-color-rgb
        });
        item.addEventListener('mouseleave', function() {
            // item.style.backgroundColor = 'transparent';
        });
    });

    // Bạn có thể đặt code cập nhật năm ở đây nếu không muốn nó ở file script chung
    // const yearSpan = document.getElementById('footerCurrentYear'); // Giả sử footer có trong about.html
    // if (yearSpan) {
    //     yearSpan.textContent = new Date().getFullYear();
    // }

    // Các chức năng khác rất cụ thể cho trang About (nếu có)
    // Ví dụ:
    // - Xử lý một slideshow nhỏ giới thiệu các thành viên (nếu là dự án nhóm)
    // - Hiệu ứng khi cuộn trang đến một section nhất định
});

// Nếu có các hàm helper hoặc logic phức tạp hơn chỉ dùng cho trang này, bạn có thể định nghĩa chúng ở đây.