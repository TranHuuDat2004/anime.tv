// script.js (cho index.html)

// --- SLIDESHOW LOGIC (đã có từ trước, có thể cần điều chỉnh nhẹ) ---
let slideIndex = 1;
let slideInterval;
const AUTO_SLIDE_DELAY = 7000; // 7 giây

function plusSlides(n) {
    clearTimeout(slideInterval);
    showSlides(slideIndex += n);
    setAutoSlide();
}

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

function autoSlide() {
    slideIndex++;
    showSlides(slideIndex);
    setAutoSlide();
}

function setAutoSlide() {
    clearTimeout(slideInterval);
    const slides = document.getElementsByClassName("hero-slide");
    if (slides.length > 1) {
        slideInterval = setTimeout(autoSlide, AUTO_SLIDE_DELAY);
    }
}
// --- END SLIDESHOW LOGIC ---


// --- HÀM TẠO SLIDESHOW TỪ DATA ---
function createSlideshow(slideshowContainerId, animeList) {
    const slideshowContainer = document.getElementById(slideshowContainerId);
    if (!slideshowContainer) return;

    slideshowContainer.innerHTML = ''; // Xóa nội dung cũ (nếu có)

    const slidesData = animeList.slice(0, Math.min(animeList.length, 7));

    slidesData.forEach((anime, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'hero-slide fade';

        const bgImage = document.createElement('img');
        bgImage.src = anime.bannerImage || 'https://via.placeholder.com/1920x800?text=Banner+Image';
        bgImage.alt = anime.title;
        bgImage.className = 'hero-slide-bg';
        slideDiv.appendChild(bgImage);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'hero-content';

        if (anime.logoImage) {
            const logoImg = document.createElement('img');
            logoImg.src = anime.logoImage;
            logoImg.alt = `${anime.title} Logo`;
            logoImg.className = 'hero-anime-logo';
            contentDiv.appendChild(logoImg);
        } else {
            const titleH2 = document.createElement('h2');
            titleH2.textContent = anime.title;
            contentDiv.appendChild(titleH2);
        }

        if (anime.crunchyrollTags && anime.crunchyrollTags.length > 0) {
            const metaP = document.createElement('p');
            metaP.className = 'hero-meta';
            metaP.textContent = anime.crunchyrollTags.join(' • ');
            contentDiv.appendChild(metaP);
        }

        const descriptionP = document.createElement('p');
        descriptionP.className = 'hero-description';
        if (anime.description) {
            descriptionP.textContent = anime.description.substring(0, 180) + (anime.description.length > 180 ? "..." : "");
        }
        contentDiv.appendChild(descriptionP);

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'hero-actions';

        const watchButton = document.createElement('a');
        watchButton.className = 'btn btn-primary';
        // Luôn dẫn đến trang chi tiết
        watchButton.href = `anime-detail.html?id=${anime.id}`;
        watchButton.textContent = "XEM CHI TIẾT"; // Đổi văn bản nút
        // Không cần target="_blank" vì là link nội bộ

        actionsDiv.appendChild(watchButton);

        const watchlistButton = document.createElement('button');
        watchlistButton.className = 'btn btn-secondary btn-icon-only';
        watchlistButton.setAttribute('aria-label', 'Add to Watchlist');
        watchlistButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
        `;
        actionsDiv.appendChild(watchlistButton);

        contentDiv.appendChild(actionsDiv);
        slideDiv.appendChild(contentDiv);
        slideshowContainer.appendChild(slideDiv);
    });

    // Thêm nút Prev/Next nếu có nhiều hơn 1 slide
    if (slidesData.length > 1) {
        const prevButton = document.createElement('a');
        prevButton.className = 'prev';
        prevButton.innerHTML = '❮';
        prevButton.onclick = function () { plusSlides(-1); };
        slideshowContainer.appendChild(prevButton);

        const nextButton = document.createElement('a');
        nextButton.className = 'next';
        nextButton.innerHTML = '❯';
        nextButton.onclick = function () { plusSlides(1); };
        slideshowContainer.appendChild(nextButton);
    }

    // Thêm chấm tròn chỉ báo nếu có nhiều hơn 1 slide
    if (slidesData.length > 1) {
        const dotsDiv = document.createElement('div');
        dotsDiv.className = 'slide-dots';
        slidesData.forEach((_, index) => {
            const dotSpan = document.createElement('span');
            dotSpan.className = 'dot';
            dotSpan.onclick = function () { currentSlide(index + 1); };
            dotsDiv.appendChild(dotSpan);
        });
        slideshowContainer.appendChild(dotsDiv);
    }

    // Khởi chạy slideshow
    if (slidesData.length > 0) {
        slideIndex = 1; // Reset slideIndex
        showSlides(slideIndex);
        setAutoSlide();
    }
}

// --- HÀM TẠO ANIME CARD CHO GRID ---
function createAnimeCard(anime) {
    const card = document.createElement('div');
    card.className = 'anime-card';

    const link = document.createElement('a');
    link.href = `anime-detail.html?id=${anime.id}`;

    const img = document.createElement('img');
    img.src = anime.posterImage || 'https://via.placeholder.com/200x300?text=Poster';
    img.alt = anime.title;
    link.appendChild(img);

    const overlay = document.createElement('div');
    overlay.className = 'anime-card-overlay';
    const playIcon = document.createElement('span');
    playIcon.className = 'play-icon';
    playIcon.innerHTML = '►';
    overlay.appendChild(playIcon);
    link.appendChild(overlay);

    card.appendChild(link);

    const titleLink = document.createElement('a');
    titleLink.href = `anime-detail.html?id=${anime.id}`;
    const titleH3 = document.createElement('h3');
    titleH3.appendChild(titleLink);
    titleLink.textContent = anime.title;
    card.appendChild(titleH3);

    const infoP = document.createElement('p');
    // Hiển thị thông tin loại và số tập nếu có
    let infoText = anime.type || '';
    if (anime.episodes && anime.episodes.seasons && anime.episodes.seasons.length > 0) {
        const firstSeason = anime.episodes.seasons[0];
        if (firstSeason.episodes.length > 0) {
            infoText += (infoText ? ' • ' : '') + `${firstSeason.episodes.length} Tập`;
        }
    } else if (anime.episodes && typeof anime.episodes.total === 'number') {
        infoText += (infoText ? ' • ' : '') + `${anime.episodes.total} Tập`;
    }

    infoP.textContent = infoText || 'Thông tin chưa cập nhật';
    card.appendChild(infoP);

    return card;
}

function populateAnimeGrid(gridId, animeList, count = 6) { // Mặc định hiển thị 6 card
    const gridContainer = document.getElementById(gridId);
    if (!gridContainer) return;

    gridContainer.innerHTML = ''; // Xóa nội dung cũ

    // Lấy một số lượng anime nhất định, có thể xáo trộn hoặc lấy theo tiêu chí
    const displayAnime = animeList.slice(0, Math.min(animeList.length, count));

    displayAnime.forEach(anime => {
        const card = createAnimeCard(anime);
        gridContainer.appendChild(card);
    });
}


// --- KHỞI CHẠY KHI TRANG TẢI XONG ---
document.addEventListener('DOMContentLoaded', function () {

    // Hàm tải danh sách anime tóm tắt
    async function fetchAnimeList() {
        try {
            const response = await fetch('data/anime-list.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error("Lỗi khi tải danh sách anime:", error);
            return [];
        }
    }

    // Hàm tải dữ liệu chi tiết cho một anime
    async function fetchAnimeDetails(animeId) {
        try {
            const response = await fetch(`data/anime/${animeId}.json`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Lỗi khi tải chi tiết cho anime ${animeId}:`, error);
            return null; // Trả về null nếu có lỗi
        }
    }

    // Hàm hiển thị thông báo lỗi
    function displayNoDataMessage() {
        const slideshowContainer = document.getElementById('mainSlideshow');
        if (slideshowContainer) slideshowContainer.innerHTML = "<p style='text-align:center; padding: 50px; color: white;'>Không có dữ liệu anime để hiển thị.</p>";
        const grids = ['topPicksGrid', 'seriesAnimeGrid', 'movieAnimeGrid'];
        grids.forEach(gridId => {
            const grid = document.getElementById(gridId);
            if (grid) grid.innerHTML = "<p style='color: white;'>Không có dữ liệu.</p>";
        });
    }

    // Khởi chạy chính
    async function main() {
        const animeList = await fetchAnimeList();

        if (!animeList || animeList.length === 0) {
            console.error("Danh sách anime rỗng hoặc không hợp lệ.");
            displayNoDataMessage();
            return;
        }

        // --- Xử lý Slideshow ---
        const slideshowAnimeIds = animeList.slice(0, 7).map(a => a.id);
        const slideshowAnimeDetailsPromises = slideshowAnimeIds.map(id => fetchAnimeDetails(id));
        const featuredAnimeForSlideshow = (await Promise.all(slideshowAnimeDetailsPromises)).filter(Boolean);

        if (featuredAnimeForSlideshow.length > 0) {
            createSlideshow('mainSlideshow', featuredAnimeForSlideshow);
        }

        // --- Xử lý Grids (dùng animeList tóm tắt) ---
        populateAnimeGrid('topPicksGrid', [...animeList].sort(() => 0.5 - Math.random()), 6);

        const seriesAnime = animeList.filter(anime => anime.type && anime.type.toLowerCase() === 'series');
        populateAnimeGrid('seriesAnimeGrid', seriesAnime, 12);

        const movieAnime = animeList.filter(anime => anime.type && anime.type.toLowerCase() === 'movie');
        populateAnimeGrid('movieAnimeGrid', movieAnime, 12);
    }

    main();

    // --- Xử lý Notification cho nút Đăng Nhập ---
    const loginButton = document.getElementById('loginButton');
    const notificationElement = document.getElementById('featureNotification');
    let notificationTimeout;

    if (loginButton && notificationElement) {
        loginButton.addEventListener('click', function (event) {
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

    const yearSpan = document.getElementById('footerCurrentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});