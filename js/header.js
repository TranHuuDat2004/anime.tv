// js/header.js
document.addEventListener('DOMContentLoaded', function () {
    const headerPlaceholder = document.getElementById('header-placeholder');

    if (headerPlaceholder) {
        const headerHTML = `
        <header>
            <nav class="navbar">
                <div class="container">
                    <a href="index.html" class="navbar-logo"><img src="images/logo.png" alt="ANIME.TV Logo" height="50"></a>
                    <button class="hamburger" id="hamburger" aria-label="Toggle navigation">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                    <div class="navbar-menu" id="navbarMenu">
                <ul class="navbar-nav">
                    <li><a href="index.html">Trang Chủ</a></li>
                    <li><a href="image-gallery.html">Ảnh Anime</a></li>
                    <li><a href="gif-collection.html">GIF Collection</a></li>
                    <li><a href="manga.html">Manga</a></li>
                    <li><a href="game.html">Games</a></li>
                    <li><a href="ranking.html" class="active">Bảng xếp hạng</a></li> <!-- Active link -->
                    <li><a href="about.html">Giới thiệu</a></li>
                    <li><a href="version.html">Phiên Bản</a></li>
                    <li style="padding-right: 40px;"><a href="search.html">Tìm kiếm</a></li>
                
                            <!-- <li style="padding-left: 40px;"><a  href="#" id="loginButton" class="login-button">Đăng Nhập</a></li> -->
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        <div id="featureNotification" class="notification" style="display: none;"> <!-- Mặc định ẩn -->
            Tính năng này đang được cập nhật!
        </div>
        `;

        headerPlaceholder.innerHTML = headerHTML;

        // Logic để thêm class 'active' cho link menu của trang hiện tại
        // và xử lý hamburger menu
        initializeNavbar();

        // (Tùy chọn) Logic để hiển thị notification
        // initializeNotification();

    } else {
        console.warn('Header placeholder with ID "header-placeholder" not found. Header will not be loaded.');
    }
});

function initializeNavbar() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html"; // Lấy tên file, hoặc index.html nếu rỗng
    const navLinks = document.querySelectorAll('#navbarMenu .navbar-nav li a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split("/").pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
            // Nếu muốn highlight cả thẻ li cha
            // if (link.parentElement.tagName === 'LI') {
            //     link.parentElement.classList.add('active-li'); // Thêm class mới nếu cần style riêng cho li
            // }
        } else {
            link.classList.remove('active');
            // if (link.parentElement.tagName === 'LI') {
            //     link.parentElement.classList.remove('active-li');
            // }
        }
    });

    // Logic cho hamburger menu (nếu bạn chưa có file navbar.js riêng)
    // const hamburger = document.getElementById('hamburger');
    // const navbarMenu = document.getElementById('navbarMenu');

    // if (hamburger && navbarMenu) {
    //     hamburger.addEventListener('click', () => {
    //         navbarMenu.classList.toggle('active'); // Class 'active' này sẽ dùng CSS để hiển thị menu
    //         hamburger.classList.toggle('is-active'); // Class cho hiệu ứng nút hamburger
    //     });
    // }
}

// (Tùy chọn) Nếu bạn muốn kiểm soát notification từ JS
// function initializeNotification() {
//     const notification = document.getElementById('featureNotification');
//     if (notification) {
//         // Ví dụ: hiển thị thông báo trong 5 giây rồi ẩn
//         // setTimeout(() => {
//         //     notification.style.display = 'block';
//         //     setTimeout(() => {
//         //         notification.style.display = 'none';
//         //     }, 5000);
//         // }, 1000);

//         // Hoặc bạn có thể có một cơ chế khác để quyết định khi nào hiển thị nó
//         // Ví dụ: dựa trên một cờ trong localStorage
//         // if (localStorage.getItem('showFeatureNotification') === 'true') {
//         //     notification.style.display = 'block';
//         //     localStorage.removeItem('showFeatureNotification'); // Chỉ hiển thị một lần
//         // }
//     }
// }