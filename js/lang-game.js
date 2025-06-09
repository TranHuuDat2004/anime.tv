// js/i18n-game.js (Giữ nguyên cấu trúc của bạn, chỉ cần đảm bảo các key khớp)
const translations = {
    en: {
        docTitle: "Puzzle Game - ANIME.TV",
        // Navbar (Sử dụng data-translate-nav)
        "home": "Home",
        "imageGallery": "Image Gallery",
        "gifCollection": "GIF Collection",
        "puzzleGame": "Puzzle Game",
        "login": "Login",

        gameTitle: "Jigsaw Puzzle",
        gameSubtitle: "Click an image to rotate. Drag and drop images to the correct position.",
        howToPlayButton: "How to Play",
        sidebarTitle: "Puzzle Tips",
        sidebarContentHTML: `<p>Welcome to the puzzle challenge!</p>
                             <p><strong>Get started:</strong> Choose an image you like below.</p>
                             <p><strong>Familiarize with pieces:</strong> The pieces are mixed up and rotated. Don't worry, click on them to rotate them to the correct orientation.</p>
                             <p><strong>Arrange them:</strong> Drag each piece to the correct cell on the 3x3 grid. Refer to the original image on the left.</p>
                             <p><strong>Complete:</strong> When the picture is fully assembled (correct position, correct angle), you are the winner!</p>
                             <hr>
                             <p><strong>Challenge yourself:</strong></p>
                             <p>You can play in <strong>Classic</strong> mode to see how long you take, or try <strong>Countdown</strong> mode (20-60 seconds) for an extra thrill!</p>
                             <p>Enjoy your relaxing moments!</p>`,
        modeTitle: "Game Mode:",
        modeClassic: "Classic (Count Up)",
        modeCountdown: "Countdown",
        modeSeconds: "Seconds:",
        secondsUnit: "s", // Giữ "s" cho ngắn gọn
        refTitle: "Original Image",
        refAlt: "Reference original image",
        timerLabelPrefix: "Time: ", // Quan trọng: game.js có thể dùng key này
        piecesTitle: "Puzzle Pieces",
        selectPuzzleTitle: "Choose Another Puzzle",
        // Footer (Sử dụng data-translate-footer)
        "about": "About Us",
        "help": "Help/FAQ",
        "terms": "Terms of Service",
        "privacy": "Privacy Policy",
        "copyright": "© <span id='currentYear'></span> ANIME.TV. Based on an idea from Crunchyroll.",

        winModalTitle: "🎉 Congratulations! 🎉",
        winModalBodyHTML: "You have completed the puzzle! <br>Your time is: <strong id='final-time'></strong>",
        winModalClose: "Close",
        winModalPlayAgain: "Play Again",
        loseModalTitle: "Too Bad! Time's Up",
        loseModalBodyHTML: "You didn't complete the puzzle in time. <br>Try harder next time!",
        loseModalClose: "Close",
        loseModalPlayAgain: "Play Again"
    },
    vi: {
        docTitle: "Game Xếp Hình - ANIME.TV",
        "home": "Trang Chủ",
        "imageGallery": "Ảnh Anime",
        "gifCollection": "Bộ Sưu Tập GIF",
        "puzzleGame": "Game Xếp Hình",
        "login": "Đăng Nhập",

        gameTitle: "Game Xếp Hình",
        gameSubtitle: "Click vào ảnh để xoay. Kéo thả ảnh vào đúng vị trí.",
        howToPlayButton: "Hướng dẫn",
        sidebarTitle: "Bí Kíp Xếp Hình",
        sidebarContentHTML: `<p>Chào mừng bạn đến với thử thách xếp hình!</p>
                             <p><strong>Bắt đầu nào:</strong> Hãy chọn một bức ảnh bạn thích ở phía dưới nhé.</p>
                             <p><strong>Làm quen mảnh ghép:</strong> Các mảnh ghép đang bị lộn xộn và xoay tứ tung. Đừng lo, hãy click vào chúng để xoay về đúng chiều.</p>
                             <p><strong>Xếp thôi:</strong> Dùng chuột kéo từng mảnh ghép vào đúng ô trên bảng 3x3. Hãy nhìn ảnh gốc bên trái để tham khảo nhé.</p>
                             <p><strong>Hoàn thành:</strong> Khi bức tranh hiện ra hoàn chỉnh (đúng vị trí, đúng góc), bạn là người chiến thắng!</p>
                             <hr>
                             <p><strong>Thử thách bản thân:</strong></p>
                             <p>Bạn có thể chơi chế độ <strong>Cổ điển</strong> để xem mình xếp trong bao lâu, hoặc thử chế độ <strong>Đếm ngược</strong> (20-60 giây) để tăng phần gay cấn!</p>
                             <p>Chúc bạn có những phút giây thư giãn!</p>`,
        modeTitle: "Chế độ chơi:",
        modeClassic: "Cổ điển",
        modeCountdown: "Đếm ngược",
        modeSeconds: "Giây:",
        secondsUnit: "giây",
        refTitle: "Ảnh Gốc",
        refAlt: "Ảnh gốc tham khảo",
        timerLabelPrefix: "Thời gian: ",
        piecesTitle: "Các Mảnh Ghép",
        selectPuzzleTitle: "Chọn Ảnh Khác",
        "about": "Về chúng tôi",
        "help": "Trợ giúp/FAQ",
        "terms": "Điều khoản sử dụng",
        "privacy": "Chính sách riêng tư",
        "copyright": "© <span id='currentYear'></span> ANIME.TV. Dựa trên ý tưởng từ Crunchyroll.",

        winModalTitle: "🎉 Chúc Mừng! 🎉",
        winModalBodyHTML: "Bạn đã hoàn thành bức tranh! <br>Thời gian của bạn là: <strong id='final-time'></strong>",
        winModalClose: "Đóng",
        winModalPlayAgain: "Chơi Lại",
        loseModalTitle: "Rất Tiếc! Đã Hết Giờ",
        loseModalBodyHTML: "Bạn đã không hoàn thành bức tranh trong thời gian quy định.<br>Hãy cố gắng hơn ở lần chơi sau nhé!",
        loseModalClose: "Đóng",
        loseModalPlayAgain: "Chơi Lại"
    }
};

function setLanguage(lang) {
    if (!translations[lang]) {
        console.error("Language not supported:", lang);
        return;
    }
    document.documentElement.lang = lang;
    const langTranslations = translations[lang];

    // Dịch các element có data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (langTranslations[key] !== undefined) {
            if (key.endsWith('HTML')) {
                element.innerHTML = langTranslations[key];
            } else if (element.tagName === 'TITLE' || element.tagName === 'H1' || element.tagName === 'H5' || element.tagName === 'P' || element.tagName === 'LABEL' || element.tagName === 'STRONG' || element.classList.contains('seconds-unit-text')) {
                 element.textContent = langTranslations[key];
            } else if (element.tagName === 'IMG' && element.hasAttribute('alt')) {
                 element.alt = langTranslations[key];
            } else if (element.tagName === 'BUTTON' && !element.innerHTML.includes('<svg')) { // Chỉ đổi text nếu không có SVG bên trong
                 element.textContent = langTranslations[key];
            }
        } else {
            console.warn(`Translation key "${key}" not found for language "${lang}".`);
        }
    });

    // Dịch các element có data-translate-nav (cho navbar)
     document.querySelectorAll('[data-translate-nav]').forEach(element => {
        const key = element.getAttribute('data-translate-nav');
        if (langTranslations[key] !== undefined) {
             element.textContent = langTranslations[key];
        }
    });
     // Dịch các element có data-translate-footer (cho footer)
     document.querySelectorAll('[data-translate-footer]').forEach(element => {
        const key = element.getAttribute('data-translate-footer');
        if (langTranslations[key] !== undefined) {
             if (key === 'copyright' && lang === 'vi') { // Xử lý riêng cho copyright tiếng Việt
                element.innerHTML = langTranslations[key].replace('<span id=\'currentYear\'></span>', `<span id='currentYear'>${new Date().getFullYear()}</span>`);
             } else if (key === 'copyright' && lang === 'en') {
                element.innerHTML = langTranslations[key].replace('<span id=\'currentYear\'></span>', `<span id='currentYear'>${new Date().getFullYear()}</span>`);
             }
             else {
                element.textContent = langTranslations[key];
             }
        }
    });


    // Cập nhật timer display nếu game.js có hàm này
    if (typeof window.updateTimerDisplayLanguage === 'function') {
        window.updateTimerDisplayLanguage(langTranslations.timerLabelPrefix || "Thời gian: ");
    } else { // Fallback nếu game.js không có hàm đó
        const timerDisplay = document.getElementById('timer-display');
        if (timerDisplay && timerDisplay.textContent.includes(':')) {
            const currentTime = timerDisplay.textContent.split(':').slice(1).join(':').trim();
            timerDisplay.textContent = (langTranslations.timerLabelPrefix || "Thời gian: ") + currentTime;
        }
    }


    document.querySelectorAll('.lang-switcher .lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) btn.classList.add('active');
    });
    localStorage.setItem('preferredLanguage', lang);
}

document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    const langButtons = document.querySelectorAll('.lang-switcher .lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const selectedLang = event.target.closest('.lang-btn').getAttribute('data-lang');
            setLanguage(selectedLang);
        });
    });

    const browserLang = navigator.language.split('-')[0];
    const preferredLang = localStorage.getItem('preferredLanguage') || (translations[browserLang] ? browserLang : 'vi');
    setLanguage(preferredLang);
});