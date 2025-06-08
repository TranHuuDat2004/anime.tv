// notification.js

// --- Xử lý Notification cho nút Đăng Nhập ---
const loginButton = document.getElementById('loginButton');
const notificationElement = document.getElementById('featureNotification');
let notificationTimeout; // Biến để lưu timeout

if (loginButton && notificationElement) {
    loginButton.addEventListener('click', function (event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>

        // Xóa timeout cũ nếu có (để tránh nhiều notification chồng chéo)
        if (notificationTimeout) {
            clearTimeout(notificationTimeout);
        }

        // Hiển thị notification
        notificationElement.textContent = "Tính năng Đăng Nhập đang được cập nhật!"; // Bạn có thể tùy chỉnh nội dung
        notificationElement.classList.remove('hide'); // Xóa class hide (nếu có từ lần trước)
        notificationElement.classList.add('show');

        // Tự động ẩn notification sau một khoảng thời gian
        notificationTimeout = setTimeout(() => {
            notificationElement.classList.remove('show');
            notificationElement.classList.add('hide');
        }, 3000); // Ẩn sau 3 giây (3000ms)
    });
}
// --- Kết thúc xử lý Notification ---