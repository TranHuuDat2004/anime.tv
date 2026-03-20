// js/footer.js
document.addEventListener('DOMContentLoaded', function() {
    const footerHTML = `
    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-column footer-about">
                    <a href="index.html" class="footer-logo-link">
                        <img src="images/logo.png" alt="ANIME.TV Logo" class="footer-logo">
                    </a>
                    <p class="footer-tagline">ANIME.TV - Stream Your Dreams. Nơi đam mê Anime và Manga được chia sẻ và khám phá.</p>
                    <p class="footer-note">Trang web được xây dựng với mục đích rèn luyện, học hỏi và không có tính thương mại hóa.</p>
                </div>

                <div class="footer-column">
                    <h4>Khám Phá</h4>
                    <ul>
                        <li><a href="index.html">Trang Chủ</a></li>
                        <li><a href="manga.html">Truyện Tranh</a></li>
                        <li><a href="image-gallery.html">Ảnh Anime</a></li>
                        <li><a href="gif-collection.html">GIF Collection</a></li>
                        <li><a href="game.html">Game Xếp Hình</a></li>
                    </ul>
                </div>

                <div class="footer-column">
                    <h4>Thông Tin</h4>
                    <ul>
                        <li><a href="about.html">Về ANIME.TV</a></li>
                        <li><a href="version.html">Lịch sử phiên bản</a></li>
                        <li><a href="faq.html">Trợ giúp / FAQ</a></li>
                        <li><a href="terms-of-service.html">Điều khoản sử dụng</a></li>
                        <li><a href="privacy-policy.html">Chính sách riêng tư</a></li>
                    </ul>
                </div>

                <div class="footer-column footer-social">
                    <h4>Kết Nối</h4>
                    <div class="social-icons">
                        <a href="#" title="Facebook" target="_blank" rel="noopener noreferrer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#F28C38" xmlns="http://www.w3.org/2000/svg"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" /></svg>
                        </a>
                        <a href="#" title="Twitter" target="_blank" rel="noopener noreferrer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#F28C38" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </a>
                        <a href="https://github.com/TranHuuDat2004/" title="GitHub" target="_blank" rel="noopener noreferrer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#F28C38" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.375.81 1.11.81 2.235 0 1.615-.015 2.91-.015 3.3 0 .315.21.69.825.57C20.565 21.8 24 17.303 24 12c0-6.627-5.373-12-12-12z" /></svg>
                        </a>
                        <a href="https://www.linkedin.com/in/tranhuudat2004" title="LinkedIn" target="_blank" rel="noopener noreferrer"> <!-- Sửa lại link LinkedIn của bạn -->
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#F28C38" xmlns="http://www.w3.org/2000/svg"><path d="M22.23 0H1.77C.79 0 0 .774 0 1.729v20.542C0 23.226.79 24 1.77 24h20.46c.98 0 1.77-.774 1.77-1.729V1.729C24 .774 23.21 0 22.23 0zM7.12 20.452H3.558V9.043h3.562v11.409zM5.34 7.757c-1.14 0-2.062-.928-2.062-2.064 0-1.135.923-2.062 2.062-2.062 1.135 0 2.062.927 2.062 2.062 0 1.136-.927 2.064-2.062 2.064zm15.112 12.695h-3.558v-5.57c0-1.328-.027-3.037-1.852-3.037-1.852 0-2.136 1.446-2.136 2.94v5.667H9.34V9.043h3.414v1.55h.048c.476-.898 1.638-1.846 3.37-1.846 3.605 0 4.27 2.373 4.27 5.46v6.245z" /></svg>
                        </a>
                    </div>
                    <p class="mt-3">Email liên hệ: <a href="mailto:huudat2004.anime@gmail.com">huudat2004.anime@gmail.com</a></p>
                </div>
            </div>

            <div class="footer-bottom">
                <p>© <span id="footerCurrentYear">${new Date().getFullYear()}</span> ANIME.TV. Dựa trên ý tưởng từ Crunchyroll. Phát triển bởi Trần Hữu Đạt.</p>
            </div>
        </div>
    </footer>
    `;

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    } else {
        console.warn('Footer placeholder with ID "footer-placeholder" not found. Footer will not be loaded.');
    }
});