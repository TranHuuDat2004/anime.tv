// js/manga-script.js

document.addEventListener('DOMContentLoaded', () => {
    const mangaGrid = document.getElementById('manga-grid');
    const searchBar = document.getElementById('manga-search-bar');
    const loadMoreContainer = document.getElementById('manga-load-more-container');
    const loadMoreButton = document.getElementById('mangaLoadMoreButton');
    const allMangaLoadedMessage = document.getElementById('all-manga-loaded-message');

    let allMangaMasterList = [];
    let currentlyDisplayedManga = [];
    let displayedMangaCount = 0;
    const mangaPerLoad = 12; // Số manga tải mỗi lần (điều chỉnh nếu cần)

    function prepareAllManga() {
        if (typeof mangaData !== 'undefined') {
            allMangaMasterList = [...mangaData]; // Sao chép để không ảnh hưởng mảng gốc
        } else {
            console.error("mangaData is not defined. Make sure data-manga.js is loaded.");
        }
    }

    function createMangaCard(manga) {
        const card = document.createElement('div');
        card.className = 'manga-card';

        const coverLink = document.createElement('a');
        // Link đến trang chi tiết manga
        coverLink.href = manga.readDetailLink || `manga-detail.html?id=${manga.id}`; // Ưu tiên readDetailLink
        coverLink.className = 'manga-cover-link';

        const coverImage = document.createElement('img');
        coverImage.src = manga.coverImage || 'https://via.placeholder.com/200x300?text=Cover';
        coverImage.alt = manga.title + " cover";
        coverImage.className = 'manga-cover-image';
        coverImage.loading = 'lazy';
        coverLink.appendChild(coverImage);

        card.appendChild(coverLink);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'manga-info';

        const titleH3 = document.createElement('h3');
        titleH3.className = 'manga-title';
        const titleLink = document.createElement('a');
        // Link tiêu đề cũng đến trang chi tiết manga
        titleLink.href = manga.readDetailLink || `manga-detail.html?id=${manga.id}`; // Ưu tiên readDetailLink
        titleLink.textContent = manga.title;
        titleH3.appendChild(titleLink);
        infoDiv.appendChild(titleH3);

        if (manga.author) {
            const authorP = document.createElement('p');
            authorP.className = 'manga-author';
            authorP.innerHTML = `<strong>Tác giả:</strong> ${manga.author}`;
            infoDiv.appendChild(authorP);
        }

        if (manga.status) {
            const statusP = document.createElement('p');
            statusP.className = 'manga-status';
            statusP.innerHTML = `<strong>Trạng thái:</strong> ${manga.status}`;
            infoDiv.appendChild(statusP);
        }

        if (manga.genres && manga.genres.length > 0) {
            const genresP = document.createElement('p');
            genresP.className = 'manga-genres';
            manga.genres.forEach(genre => {
                const genreSpan = document.createElement('span');
                genreSpan.className = 'genre-tag';
                genreSpan.textContent = genre;
                genresP.appendChild(genreSpan);
            });
            infoDiv.appendChild(genresP);
        }
        card.appendChild(infoDiv);
        return card;
    }

    function displayManga(mangaListToDisplay, append = false) {
        if (!mangaGrid) return;
        if (!append) {
            mangaGrid.innerHTML = '';
            if (allMangaLoadedMessage) allMangaLoadedMessage.style.display = 'none';
        }

        if (mangaListToDisplay.length === 0 && !append) {
            mangaGrid.innerHTML = '<p class="placeholder-text">Không tìm thấy truyện nào phù hợp.</p>';
            if (loadMoreContainer) loadMoreContainer.style.display = 'none';
            if (allMangaLoadedMessage) allMangaLoadedMessage.style.display = 'none';
            return;
        }

        mangaListToDisplay.forEach(manga => {
            const card = createMangaCard(manga);
            mangaGrid.appendChild(card);
        });
        updateLoadMoreVisibility();
    }

    function updateLoadMoreVisibility() {
        if (!loadMoreContainer || !allMangaLoadedMessage) return;
        if (displayedMangaCount < currentlyDisplayedManga.length) {
            loadMoreContainer.style.display = 'block';
            allMangaLoadedMessage.style.display = 'none';
        } else {
            loadMoreContainer.style.display = 'none';
            if (currentlyDisplayedManga.length > 0) {
                allMangaLoadedMessage.style.display = 'block';
            } else {
                allMangaLoadedMessage.style.display = 'none';
            }
        }
    }

    function applyFiltersAndSort() {
        let filteredManga = [...allMangaMasterList];
        const searchTerm = searchBar ? searchBar.value.toLowerCase().trim() : '';

        if (searchTerm) {
            filteredManga = filteredManga.filter(manga =>
                manga.title.toLowerCase().includes(searchTerm) ||
                (manga.altTitle && manga.altTitle.toLowerCase().includes(searchTerm)) ||
                (manga.author && manga.author.toLowerCase().includes(searchTerm)) ||
                (manga.genres && manga.genres.some(genre => genre.toLowerCase().includes(searchTerm)))
            );
        }
        // (Tùy chọn) Thêm logic sắp xếp ở đây nếu muốn, ví dụ theo năm phát hành, tên
        // filteredManga.sort((a, b) => b.releaseYear - a.releaseYear); // Mới nhất trước
        return filteredManga;
    }

    function resetAndDisplayManga() {
        currentlyDisplayedManga = applyFiltersAndSort();
        // shuffleArray(currentlyDisplayedManga); // Có thể không cần xáo trộn danh sách truyện
        displayedMangaCount = 0;
        if (mangaGrid) mangaGrid.innerHTML = '';
        if (allMangaLoadedMessage) allMangaLoadedMessage.style.display = 'none';
        loadMoreManga();
    }

    function loadMoreManga() {
        const mangaToLoadNow = currentlyDisplayedManga.slice(displayedMangaCount, displayedMangaCount + mangaPerLoad);
        displayManga(mangaToLoadNow, displayedMangaCount > 0);
        displayedMangaCount += mangaToLoadNow.length;
    }

    // --- INITIALIZATION ---
    if (!mangaGrid) {
        console.error("Element with ID 'manga-grid' not found. Manga list cannot be displayed.");
        return; // Thoát nếu không có grid chính
    }

    prepareAllManga();
    resetAndDisplayManga(); // Hiển thị lô đầu tiên

    if (searchBar) {
        searchBar.addEventListener('input', resetAndDisplayManga);
    }

    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', loadMoreManga);
    }
});

// (Tùy chọn) Hàm shuffle nếu bạn muốn xáo trộn kết quả tìm kiếm/lọc
// function shuffleArray(array) { ... }