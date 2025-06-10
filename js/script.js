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

    // Giới hạn số lượng slide (ví dụ: 3-5 slide)
    const slidesData = animeList.slice(0, Math.min(animeList.length, 5)); // Lấy tối đa 5 anime đầu tiên cho slideshow

    slidesData.forEach((anime, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'hero-slide fade';

        const bgImage = document.createElement('img');
        bgImage.src = anime.bannerImage || 'https://via.placeholder.com/1920x800?text=Banner+Image'; // Ảnh banner
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
        descriptionP.textContent = anime.description.substring(0, 180) + (anime.description.length > 180 ? "..." : "");
        contentDiv.appendChild(descriptionP);

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'hero-actions';

        const watchButton = document.createElement('a');
        watchButton.className = 'btn btn-primary';
        // Link đến tập đầu tiên của anime trên trang chi tiết hoặc trang xem phim
        const firstSeason = anime.episodes.seasons[0];
        let watchLink = `anime-detail.html?id=${anime.id}`; // Default to detail page
        if (firstSeason && firstSeason.episodes[0] && firstSeason.episodes[0].videoUrl && firstSeason.episodes[0].videoUrl !== "#") {
            watchLink = `watch-video.html?animeId=${anime.id}&season=${firstSeason.seasonNum}&ep=${firstSeason.episodes[0].epNumInSeason}`;
        }
        watchButton.href = watchLink;

        watchButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="btn-icon"><path d="M8 5v14l11-7z"></path></svg>
            XEM NGAY
        `; // Hoặc "CHI TIẾT" nếu không có link xem trực tiếp
        actionsDiv.appendChild(watchButton);

        // Nút thêm vào watchlist (có thể thêm chức năng sau)
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
    // Kiểm tra xem animeData có tồn tại và có dữ liệu không
    if (typeof animeData !== 'undefined' && animeData.length > 0) {
        // Tạo slideshow (ví dụ: lấy 5 anime đầu tiên, hoặc anime có đánh dấu "featured")
        // Bạn có thể tạo một mảng riêng trong data.js cho anime nổi bật trên slideshow
        const featuredAnimeForSlideshow = animeData.filter(a => a.bannerImage && a.logoImage).slice(0, 5); // Ví dụ lấy anime có banner và logo
        createSlideshow('mainSlideshow', featuredAnimeForSlideshow.length > 0 ? featuredAnimeForSlideshow : animeData);

        // Điền dữ liệu cho các grid
        // Ví dụ: Top Picks có thể là những anime được đánh giá cao hoặc xem nhiều (cần thêm trường này vào data.js)
        // Hiện tại, chúng ta sẽ lấy ngẫu nhiên hoặc theo thứ tự
        populateAnimeGrid('topPicksGrid', [...animeData].sort(() => 0.5 - Math.random()), 6); // Xáo trộn và lấy 6
        populateAnimeGrid('newUpdatesGrid', animeData.sort((a, b) => b.releaseYear - a.releaseYear), 6); // Sắp xếp theo năm mới nhất, lấy 6

        // Ví dụ thêm cho thể loại hành động (cần có animeData với genre "Action")
        // const actionAnime = animeData.filter(anime => anime.genres && anime.genres.map(g => g.toLowerCase()).includes('action'));
        // populateAnimeGrid('actionAnimeGrid', actionAnime, 6);

    } else {
        console.error("Không tìm thấy animeData hoặc animeData rỗng.");
        // Có thể hiển thị thông báo lỗi trên giao diện người dùng ở đây
        const slideshowContainer = document.getElementById('mainSlideshow');
        if (slideshowContainer) slideshowContainer.innerHTML = "<p style='text-align:center; padding: 50px; color: white;'>Không có dữ liệu anime để hiển thị.</p>";

        const topPicksGrid = document.getElementById('topPicksGrid');
        if (topPicksGrid) topPicksGrid.innerHTML = "<p style='color: white;'>Không có dữ liệu.</p>";

        const newUpdatesGrid = document.getElementById('newUpdatesGrid');
        if (newUpdatesGrid) newUpdatesGrid.innerHTML = "<p style='color: white;'>Không có dữ liệu.</p>";
    }


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

    // Đặt ở cuối file HTML, trước </body>, hoặc trong file script chung
document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('footerCurrentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
});