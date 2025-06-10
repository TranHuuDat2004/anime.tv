// js/manga-detail-script.js
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const mangaId = urlParams.get('id');

    // Lấy các DOM elements
    const mangaDetailBanner = document.getElementById('mangaDetailBanner');
    const mangaDetailTitleElement = document.getElementById('mangaDetailTitle');
    const mangaDetailAuthorElement = document.getElementById('mangaDetailAuthor');
    const mangaShortDescriptionElement = document.getElementById('mangaShortDescription');
    const readNowButton = document.getElementById('readNowButton');
    const mangaDetailCoverImage = document.getElementById('mangaDetailCoverImage');

    const fullMangaDescriptionElement = document.getElementById('fullMangaDescription');
    const mangaAltTitleElement = document.getElementById('mangaAltTitle');
    const mangaAuthorInfoElement = document.getElementById('mangaAuthorInfo');
    const mangaGenresElement = document.getElementById('mangaGenres');
    const mangaStatusElement = document.getElementById('mangaStatus');
    const mangaReleaseYearElement = document.getElementById('mangaReleaseYear');
    const mangaPageChapterInfoElement = document.getElementById('mangaPageChapterInfo');


    if (!mangaId || typeof mangaData === 'undefined') {
        if (mangaDetailTitleElement) mangaDetailTitleElement.textContent = "Không tìm thấy Truyện";
        // Ẩn các phần không cần thiết hoặc hiển thị thông báo lỗi
        document.querySelector('.detail-hero-section').style.display = 'none';
        document.querySelector('.detail-content-section').innerHTML = '<p class="placeholder-text">Không tìm thấy ID truyện hoặc dữ liệu không tồn tại.</p>';
        return;
    }

    const manga = mangaData.find(m => m.id === mangaId);

    if (!manga) {
        if (mangaDetailTitleElement) mangaDetailTitleElement.textContent = `Không tìm thấy Truyện với ID: ${mangaId}`;
        document.querySelector('.detail-hero-section').style.display = 'none';
        document.querySelector('.detail-content-section').innerHTML = '<p class="placeholder-text">Truyện bạn tìm kiếm không tồn tại trong cơ sở dữ liệu.</p>';
        return;
    }

    // Cập nhật tiêu đề trang
    document.title = `${manga.title} - Chi Tiết Truyện - ANIME.TV`;

    // --- HERO SECTION ---
    if (mangaDetailBanner && manga.bannerImage) {
        mangaDetailBanner.style.backgroundImage = `url('${manga.bannerImage}')`;
    } else if (mangaDetailBanner) {
        mangaDetailBanner.style.backgroundImage = `url('https://via.placeholder.com/1920x500?text=Manga+Banner')`; // Fallback
    }

    if (mangaDetailCoverImage && manga.coverImage) {
        mangaDetailCoverImage.src = manga.coverImage;
        mangaDetailCoverImage.alt = `Bìa truyện ${manga.title}`;
    }


    if (mangaDetailTitleElement) mangaDetailTitleElement.textContent = manga.title;

    if (mangaDetailAuthorElement && manga.author) {
        mangaDetailAuthorElement.innerHTML = `Tác giả: <strong>${manga.author}</strong>`;
    } else if (mangaDetailAuthorElement) {
        mangaDetailAuthorElement.style.display = 'none';
    }

    if (mangaShortDescriptionElement) {
        mangaShortDescriptionElement.textContent = manga.description.substring(0, 150) + (manga.description.length > 150 ? "..." : "");
    }


    if (readNowButton) {
        if (manga.readLink && (manga.readLink.startsWith('http://') || manga.readLink.startsWith('https://'))) {
            // Nếu readLink là một URL đầy đủ (link ngoài)
            readNowButton.href = manga.readLink;
            readNowButton.target = "_blank"; // Mở trong tab mới
            readNowButton.rel = "noopener noreferrer";
        } else if (manga.pageInfo && manga.pageInfo.totalPages > 0) {
            // Nếu có pageInfo (để đọc theo từng ảnh trên trang của bạn)
            readNowButton.href = `reading-manga.html?id=${manga.id}&page=1`;
        } else if (manga.readLink) {
            // Nếu readLink là một link cục bộ (ví dụ đã trỏ đến reading-manga.html từ data.js)
            readNowButton.href = manga.readLink;
        }
        else {
            readNowButton.textContent = "Chưa có link đọc";
            readNowButton.classList.add('disabled');
            readNowButton.href = "#";
        }
    }
    // --- OVERVIEW CONTENT ---
    if (fullMangaDescriptionElement) fullMangaDescriptionElement.textContent = manga.description;
    if (mangaAltTitleElement) mangaAltTitleElement.textContent = manga.altTitle || 'N/A';
    if (mangaAuthorInfoElement) mangaAuthorInfoElement.textContent = manga.author || 'N/A';

    if (mangaGenresElement && manga.genres && manga.genres.length > 0) {
        mangaGenresElement.textContent = manga.genres.join(', ');
    } else if (mangaGenresElement) {
        mangaGenresElement.textContent = 'N/A';
    }

    if (mangaStatusElement) mangaStatusElement.textContent = manga.status || 'N/A';
    if (mangaReleaseYearElement) mangaReleaseYearElement.textContent = manga.releaseYear || 'N/A';

    if (mangaPageChapterInfoElement) {
        let pageInfoText = 'N/A';
        if (manga.pageInfo && manga.pageInfo.totalPages) {
            pageInfoText = `${manga.pageInfo.totalPages} trang`;
        } else if (manga.chapters && manga.chapters.length > 0) {
            // Lấy thông tin chương mới nhất nếu có
            const latestChapter = manga.chapters.reduce((latest, current) =>
                (current.chapterNum > latest.chapterNum ? current : latest), manga.chapters[0]
            );
            pageInfoText = `Đến chương ${latestChapter.chapterNum}`;
        } else if (manga.type === "Movie") {
            pageInfoText = "Phim lẻ";
        }
        mangaPageChapterInfoElement.textContent = pageInfoText;
    }
});