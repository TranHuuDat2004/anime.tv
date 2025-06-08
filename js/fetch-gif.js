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

// THAY ĐỔI GIÁ TRỊ KHỞI TẠO MẶC ĐỊNH CHO currentFilter
// Bạn cần biết 'key' của "Shiina Mahiru" trong animeGifData.
// Giả sử key đó là 'shiina_mahiru' (bạn cần kiểm tra lại trong data.js của trang GIF)
let currentFilter = 'shiina_mahiru'; // Đặt key của Shiina Mahiru làm mặc định
let allGifsForDisplay = [];

// --- FUNCTIONS ---

function populateSeriesNavigation() {
    const allButton = document.createElement('button');
    allButton.textContent = 'Tất Cả Series';
    allButton.dataset.seriesKey = 'all';
    // Không đặt active ở đây nữa, sẽ được quản lý bởi filterBySeries
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
    performSearchAndDisplay(); // Gọi lại để hiển thị dựa trên filter mới
}

function prepareAllGifs() {
    allGifsForDisplay = [];
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
            allGifsForDisplay.push({
                ...gif,
                fullUrl: fullUrl,
                seriesName: series.displayName,
                seriesKey: seriesKey // Quan trọng để lọc
            });
        });
    }
    shuffleArray(allGifsForDisplay);
}

function displayGifs(gifsToDisplay) {
    gifGallery.innerHTML = '';

    if (gifsToDisplay.length === 0) {
        gifGallery.innerHTML = '<p class="placeholder-text">Không tìm thấy GIF nào phù hợp.</p>';
        return;
    }

    gifsToDisplay.forEach(gif => {
        const gifItem = document.createElement('div');
        gifItem.classList.add('gif-item');

        const img = document.createElement('img');
        img.src = gif.fullUrl;
        img.alt = gif.title;
        img.loading = 'lazy';

        // Lấy kích thước dựa trên class view-size hiện tại của gifGallery
        // Hoặc bạn có thể truyền kích thước vào hàm displayGifs
        if (gifGallery.classList.contains('view-small')) {
            img.width = 120; // Ví dụ
            img.height = 120; // Ví dụ (nếu là ảnh vuông)
        } else if (gifGallery.classList.contains('view-medium')) {
            img.width = 200;
            img.height = 200;
        } else if (gifGallery.classList.contains('view-large')) {
            img.width = 300;
            img.height = 300;
        }

        gifItem.appendChild(img);
        gifGallery.appendChild(gifItem);

        gifItem.addEventListener('click', () => {
            if (gif.id) { // Đảm bảo gif có ID để tạo link detail
                window.location.href = `gif-detail.html?id=${gif.id}`; // Chuyển đến detail.html
            } else {
                console.error("Cannot navigate: GIF ID is missing for", gif);
                // alert("Lỗi: Không tìm thấy ID của GIF này."); // Có thể không cần alert
            }
        });
    });
}

function performSearchAndDisplay() {
    const searchTerm = searchBar.value.toLowerCase().trim();
    let gifsToFilter = [];

    if (currentFilter === 'all') {
        gifsToFilter = allGifsForDisplay;
    } else if (animeGifData[currentFilter]) {
        // Lấy đúng các GIF thuộc series hiện tại từ allGifsForDisplay
        gifsToFilter = allGifsForDisplay.filter(gif => gif.seriesKey === currentFilter);
    }

    const filteredGifs = gifsToFilter.filter(gif =>
        gif.title.toLowerCase().includes(searchTerm) ||
        (gif.tags && gif.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
        gif.seriesName.toLowerCase().includes(searchTerm) // Tìm theo tên series nữa
    );
    displayGifs(filteredGifs);
}

function applyViewSize(size) {
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
    prepareAllGifs(); // Chuẩn bị tất cả GIF trước
    populateSeriesNavigation(); // Tạo các nút lọc series

    // KIỂM TRA LẠI KEY CỦA "Shiina Mahiru" TRONG animeGifData CỦA BẠN
    const defaultSeriesKey = 'OtonariNoTenshi'; // THAY THẾ 'shiina_mahiru' BẰNG KEY ĐÚNG
    const defaultViewSize = 'large';

    // Áp dụng filter series mặc định
    if (animeGifData[defaultSeriesKey] || defaultSeriesKey === 'all') {
        filterBySeries(defaultSeriesKey); // Điều này sẽ tự gọi performSearchAndDisplay
    } else {
        console.warn(`Default series key "${defaultSeriesKey}" not found. Defaulting to 'all'.`);
        filterBySeries('all'); // Fallback về 'all' nếu key mặc định không tồn tại
    }

    // Áp dụng view size mặc định hoặc từ localStorage
    const savedViewSize = localStorage.getItem('gifViewSize');
    if (savedViewSize) {
        applyViewSize(savedViewSize);
    } else {
        applyViewSize(defaultViewSize); // Áp dụng kích thước lớn làm mặc định
    }
});

searchBar.addEventListener('input', performSearchAndDisplay);

viewOptionsButtons.forEach(button => {
    button.addEventListener('click', () => {
        const newSize = button.dataset.size;
        applyViewSize(newSize);
    });
});