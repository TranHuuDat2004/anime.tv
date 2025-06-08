// Đặt ở cuối file script.js chung hoặc trong file navbar.js riêng

document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.getElementById('navbarToggler');
    const navbarCollapse = document.getElementById('navbarCollapse');

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show'); // Thêm/xóa class 'show'
            navbarToggler.classList.toggle('active'); // Thêm/xóa class 'active' cho nút (để đổi icon thành X)
        });
    }

    // (Phần xử lý notification cho loginButton vẫn giữ nguyên ở đây nếu đây là script chung)
    const loginButton = document.getElementById('loginButton');
    const notificationElement = document.getElementById('featureNotification');
    let notificationTimeout;

    if (loginButton && notificationElement) {
        loginButton.addEventListener('click', function(event) {
            event.preventDefault();
            if (notificationTimeout) {
                clearTimeout(notificationTimeout);
            }
            notificationElement.textContent = "Tính năng Đăng Nhập đang được cập nhật!";
            notificationElement.classList.remove('hide');
            notificationElement.classList.add('show');
            notificationTimeout = setTimeout(() => {
                notificationElement.classList.remove('show');
                notificationElement.classList.add('hide');
            }, 3000);
        });
    }
});