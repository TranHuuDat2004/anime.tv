// fetch-gif.js (của trang GIF Collection)

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// --- DOM ELEMENTS ---
const gifGallery = document.getElementById('gif-gallery');
const searchBar = document.getElementById('search-bar');
const seriesNavigation = document.getElementById('series-navigation');
const loadingMessage = document.getElementById('loading-message');
const viewOptionsButtons = document.querySelectorAll('#view-options button');
const loadMoreContainer = document.getElementById('load-more-container'); // Nút xem thêm container
const loadMoreButton = document.getElementById('loadMoreButton');       // Nút xem thêm

let currentFilter = 'OtonariNoTenshi'; // Mặc định series (NHỚ THAY KEY ĐÚNG)
let currentSearchTerm = '';          // Lưu trữ từ khóa tìm kiếm hiện tại
let allGifsMasterList = [];        // Danh sách CHÍNH chứa tất cả GIF (không bị xáo trộn ở đây)
let currentlyDisplayedGifs = [];   // Danh sách GIF đang được hiển thị (sau khi lọc và xáo trộn)
let displayedGifsCount = 0;        // Số GIF đã hiển thị
const gifsPerLoad = 50;            // Số GIF tải mỗi lần

// --- FUNCTIONS ---

function populateSeriesNavigation() {
    // ... (giữ nguyên)
    const allButton = document.createElement('button');
    allButton.textContent = 'Tất Cả Series';
    allButton.dataset.seriesKey = 'all';
    allButton.addEventListener('click', () => filterBySeries('all'));
    seriesNavigation.appendChild(allButton);

    for (const seriesKey in animeGifData) {
        const button = document.createElement('button');
        button.textContent = animeGifData[seriesKey].displayName;
        button.dataset.seriesKey = seriesKey;
        button.addEventListener('click', () => filterBySeries(seriesKey));
        seriesNavigation.appendChild(button);
    }
}

function filterBySeries(seriesKey) {
    currentFilter = seriesKey;
    document.querySelectorAll('#series-navigation button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.seriesKey === seriesKey);
    });
    // Khi lọc theo series mới, reset và hiển thị lại từ đầu
    resetAndDisplayGifs();
}

function prepareAllGifs() { // Chỉ chuẩn bị danh sách gốc
    allGifsMasterList = [];
    for (const seriesKey in animeGifData) {
        const series = animeGifData[seriesKey];
        series.gifs.forEach(gif => {
            if (!gif.id) {
                console.error("GIF missing unique ID:", gif, "in series:", seriesKey);
            }
            let fullUrl;
            if (series.isExternal) {
                fullUrl = gif.url;
            } else {
                fullUrl = series.folder + gif.fileName;
            }
            allGifsMasterList.push({
                ...gif,
                fullUrl: fullUrl,
                seriesName: series.displayName,
                seriesKey: seriesKey
            });
        });
    }
    // Không xáo trộn allGifsMasterList ở đây, sẽ xáo trộn khi cần hiển thị
}

// Hàm displayGifs giờ sẽ có tùy chọn append
function displayGifs(gifsToDisplay, append = false) {
    if (!append) {
        gifGallery.innerHTML = ''; // Xóa nếu không phải là append
    }

    if (gifsToDisplay.length === 0 && !append) { // Chỉ hiện "Không tìm thấy" nếu đây là lần hiển thị đầu tiên và không có gì
        gifGallery.innerHTML = '<p class="placeholder-text">Không tìm thấy GIF nào phù hợp.</p>';
        loadMoreContainer.style.display = 'none'; // Ẩn nút Xem thêm
        return;
    }

    gifsToDisplay.forEach(gif => {
        const gifItem = document.createElement('div');
        gifItem.classList.add('gif-item');

        const img = document.createElement('img');
        img.src = gif.fullUrl;
        img.alt = gif.title;
        img.loading = 'lazy';
        // Kích thước sẽ được CSS quản lý thông qua class view-size và aspect-ratio

        gifItem.appendChild(img);
        gifGallery.appendChild(gifItem);

        gifItem.addEventListener('click', () => {
            if (gif.id) {
                window.location.href = `gif-detail.html?id=${gif.id}`;
            } else {
                console.error("Cannot navigate: GIF ID is missing for", gif);
            }
        });
    });

    // Cập nhật trạng thái nút "Xem thêm"
    if (displayedGifsCount < currentlyDisplayedGifs.length) {
        loadMoreContainer.style.display = 'block';
    } else {
        loadMoreContainer.style.display = 'none';
    }
}

function applyFiltersAndGetList() {
    // 1. Lọc theo series
    let filteredBySeries = [];
    if (currentFilter === 'all') {
        filteredBySeries = [...allGifsMasterList]; // Sao chép để xáo trộn không ảnh hưởng master list
    } else if (animeGifData[currentFilter]) {
        filteredBySeries = allGifsMasterList.filter(gif => gif.seriesKey === currentFilter);
    }

    // 2. Lọc theo từ khóa tìm kiếm
    const searchTerm = searchBar.value.toLowerCase().trim();
    currentSearchTerm = searchTerm; // Lưu lại để dùng khi load more
    const finalFilteredList = filteredBySeries.filter(gif =>
        gif.title.toLowerCase().includes(searchTerm) ||
        (gif.tags && gif.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
        gif.seriesName.toLowerCase().includes(searchTerm)
    );

    // 3. Xáo trộn kết quả cuối cùng
    shuffleArray(finalFilteredList);
    return finalFilteredList;
}

function resetAndDisplayGifs() {
    currentlyDisplayedGifs = applyFiltersAndGetList(); // Lấy danh sách đã lọc và xáo trộn
    displayedGifsCount = 0; // Reset số lượng đã hiển thị
    gifGallery.innerHTML = ''; // Xóa gallery cũ
    loadMoreGifs(); // Tải và hiển thị batch đầu tiên
}

function loadMoreGifs() {
    const gifsToLoadNow = currentlyDisplayedGifs.slice(displayedGifsCount, displayedGifsCount + gifsPerLoad);
    displayGifs(gifsToLoadNow, displayedGifsCount > 0); // append = true nếu không phải lần tải đầu tiên
    displayedGifsCount += gifsToLoadNow.length;
}

function applyViewSize(size) {
    // ... (giữ nguyên)
    gifGallery.classList.remove('view-small', 'view-medium', 'view-large');
    gifGallery.classList.add(`view-${size}`);
    viewOptionsButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.size === size);
    });
    localStorage.setItem('gifViewSize', size);
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    if (loadingMessage) {
        loadingMessage.remove();
    }
    prepareAllGifs();       // Chuẩn bị danh sách master
    populateSeriesNavigation(); // Tạo nút lọc

    const defaultSeriesKey = 'OtonariNoTenshi'; // <<<< NHỚ THAY KEY ĐÚNG
    const defaultViewSize = 'large';

    // Thiết lập filter mặc định và hiển thị batch đầu tiên
    if (animeGifData[defaultSeriesKey] || defaultSeriesKey === 'all') {
        currentFilter = defaultSeriesKey; // Đặt currentFilter trước khi gọi reset
    } else {
        console.warn(`Default series key "${defaultSeriesKey}" not found. Defaulting to 'all'.`);
        currentFilter = 'all';
    }
    // Cập nhật trạng thái active cho nút series mặc định
    document.querySelectorAll('#series-navigation button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.seriesKey === currentFilter);
    });

    resetAndDisplayGifs(); // Hàm này sẽ xử lý việc hiển thị 50 GIF đầu tiên

    // Áp dụng view size
    const savedViewSize = localStorage.getItem('gifViewSize');
    if (savedViewSize) {
        applyViewSize(savedViewSize);
    } else {
        applyViewSize(defaultViewSize);
    }
});

searchBar.addEventListener('input', () => {
    // Khi tìm kiếm, reset và hiển thị lại từ đầu với kết quả mới
    resetAndDisplayGifs();
});

viewOptionsButtons.forEach(button => {
    button.addEventListener('click', () => {
        const newSize = button.dataset.size;
        applyViewSize(newSize);
        // Không cần gọi lại displayGifs ở đây vì chỉ thay đổi class CSS
    });
});

loadMoreButton.addEventListener('click', loadMoreGifs);