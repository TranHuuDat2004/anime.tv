// js/reading-manga-script.js
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const mangaId = urlParams.get('id');
    let currentPage = parseInt(urlParams.get('page')) || 1; // Lấy trang từ URL, mặc định là 1

    const mangaReaderTitleElement = document.getElementById('mangaReaderTitle');
    const currentPageInfoElement = document.getElementById('currentPageInfo');
    const mangaPageImageElement = document.getElementById('mangaPageImage');
    const prevPageButton = document.getElementById('prevPageButton');
    const nextPageButton = document.getElementById('nextPageButton');
    const pageSelector = document.getElementById('pageSelector');
    const backToMangaListButton = document.getElementById('backToMangaList');


    let keydownTimeout = null; // Biến để lưu timeout ID

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            // Xóa timeout cũ nếu có (để tránh gọi nhiều lần khi giữ phím)
            if (keydownTimeout) {
                clearTimeout(keydownTimeout);
            }

            // Đặt timeout mới
            keydownTimeout = setTimeout(() => {
                if (event.key === 'ArrowLeft') {
                    if (currentPage > 1) {
                        console.log("ArrowLeft - Before:", currentPage);
                        currentPage--;
                        console.log("ArrowLeft - After:", currentPage);
                        updatePageDisplay();
                    }
                } else if (event.key === 'ArrowRight') {
                    if (currentPage < totalPages) {
                        console.log("ArrowRight - Before:", currentPage);
                        currentPage++;
                        console.log("ArrowRight - After:", currentPage);
                        updatePageDisplay();
                    }
                }
                keydownTimeout = null; // Reset timeout ID sau khi thực thi
            }, 500000); // Thời gian chờ nhỏ (ví dụ 500000ms) để debounce
        }
    });

    if (!mangaId || typeof mangaData === 'undefined') {
        showError("Lỗi: Không tìm thấy ID truyện hoặc dữ liệu truyện.");
        return;
    }

    const manga = mangaData.find(m => m.id === mangaId);

    if (!manga || !manga.pageInfo || !manga.pageInfo.totalPages || !manga.pageInfo.basePath) {
        showError("Lỗi: Dữ liệu truyện không hợp lệ hoặc thiếu thông tin trang.");
        return;
    }

    const totalPages = manga.pageInfo.totalPages;
    const basePath = manga.pageInfo.basePath;
    const fileExtension = manga.pageInfo.fileExtension || ".jpg"; // Mặc định .jpg nếu không có

    function showError(message) {
        const mainContent = document.getElementById('manga-reader-main');
        if (mainContent) {
            mainContent.innerHTML = `<p style="color: red; text-align: center; padding: 50px;">${message}</p>`;
        }
        if (mangaReaderTitleElement) mangaReaderTitleElement.textContent = "Lỗi";
        if (currentPageInfoElement) currentPageInfoElement.textContent = "";
    }

    function updatePageDisplay() {
        if (currentPage < 1) currentPage = 1;
        if (currentPage > totalPages) currentPage = totalPages;

        const imageUrl = `${basePath}${currentPage}${fileExtension}`;
        mangaPageImageElement.src = imageUrl;
        mangaPageImageElement.alt = `Trang ${currentPage} của ${manga.title}`;

        if (mangaReaderTitleElement) mangaReaderTitleElement.textContent = manga.title;
        if (currentPageInfoElement) currentPageInfoElement.textContent = `Trang ${currentPage} / ${totalPages}`;
        document.title = `Đọc ${manga.title} - Trang ${currentPage} - ANIME.TV`;

        // Cập nhật URL mà không tải lại trang
        const newUrl = `${window.location.pathname}?id=${mangaId}&page=${currentPage}`;
        window.history.pushState({ path: newUrl }, '', newUrl);

        // Cập nhật trạng thái nút
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages;

        // Cập nhật giá trị của select dropdown
        pageSelector.value = currentPage;
    }

    function populatePageSelector() {
        for (let i = 1; i <= totalPages; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Trang ${i}`;
            pageSelector.appendChild(option);
        }
    }

    // --- Event Listeners ---
    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePageDisplay();
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updatePageDisplay();
        }
    });

    pageSelector.addEventListener('change', (event) => {
        currentPage = parseInt(event.target.value);
        updatePageDisplay();
    });

    // Cho phép chuyển trang bằng phím mũi tên trái/phải
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            if (currentPage > 1) {
                currentPage--;
                updatePageDisplay();
            }
        } else if (event.key === 'ArrowRight') {
            if (currentPage < totalPages) {
                currentPage++;
                updatePageDisplay();
            }
        }
    });

    // Cập nhật link nút "DS Truyện" nếu cần (ví dụ: trỏ về trang manga.html)
    if (backToMangaListButton) {
        backToMangaListButton.href = `manga.html`; // Hoặc manga.html
    }

    // --- Khởi tạo ---
    populatePageSelector();
    updatePageDisplay(); // Hiển thị trang đầu tiên hoặc trang từ URL
});