// js/image-gallery-script.js

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// --- DOM ELEMENTS ---
const imageGallery = document.getElementById('image-collection-gallery');
const searchBar = document.getElementById('image-search-bar');
const seriesNavigation = document.getElementById('image-series-navigation');
const viewOptionsButtons = document.querySelectorAll('#image-view-options button');
const loadMoreContainer = document.getElementById('image-load-more-container');
const loadMoreButton = document.getElementById('imageLoadMoreButton');
const allImagesLoadedMessage = document.getElementById('all-images-loaded-message');

let currentSeriesFilter = 'all';    // Mặc định hiển thị tất cả series
let currentSearchTerm = '';
let allImagesMasterList = [];
let currentlyDisplayedImages = [];
let displayedImagesCount = 0;
const imagesPerLoad = 24; // Số ảnh tải mỗi lần

// --- FUNCTIONS ---

function populateImageSeriesNavigation() {
    if (!seriesNavigation) return;
    seriesNavigation.innerHTML = ''; // Xóa nút cũ

    const allButton = document.createElement('button');
    allButton.textContent = 'Tất Cả Series';
    allButton.dataset.seriesKey = 'all';
    allButton.classList.add('active'); // Mặc định là active
    allButton.addEventListener('click', () => filterImagesBySeries('all'));
    seriesNavigation.appendChild(allButton);

    for (const seriesKey in animeImageData) {
        const button = document.createElement('button');
        button.textContent = animeImageData[seriesKey].displayName;
        button.dataset.seriesKey = seriesKey;
        button.addEventListener('click', () => filterImagesBySeries(seriesKey));
        seriesNavigation.appendChild(button);
    }
}

function filterImagesBySeries(seriesKey) {
    currentSeriesFilter = seriesKey;
    document.querySelectorAll('#image-series-navigation button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.seriesKey === seriesKey);
    });
    resetAndDisplayImages();
}

function prepareAllImages() {
    allImagesMasterList = [];
    for (const seriesKey in animeImageData) {
        const series = animeImageData[seriesKey];
        series.images.forEach(imgData => {
            if (!imgData.id) {
                console.error("Image missing unique ID:", imgData, "in series:", seriesKey);
            }
            let fullUrl;
            if (imgData.isExternalOverride || (series.isExternal && !imgData.hasOwnProperty('isExternalOverride'))) {
                fullUrl = imgData.url;
            } else {
                fullUrl = (series.folder || '') + imgData.fileName;
            }

            allImagesMasterList.push({
                ...imgData,
                fullUrl: fullUrl,
                seriesName: series.displayName,
                seriesKey: seriesKey
            });
        });
    }
}

function displayImages(imagesToDisplay, append = false) {
    if (!imageGallery) return;

    if (!append) {
        imageGallery.innerHTML = '';
        if (allImagesLoadedMessage) allImagesLoadedMessage.style.display = 'none';
    }

    if (imagesToDisplay.length === 0 && !append) {
        imageGallery.innerHTML = '<p class="placeholder-text">Không tìm thấy hình ảnh nào phù hợp.</p>';
        if (loadMoreContainer) loadMoreContainer.style.display = 'none';
        if (allImagesLoadedMessage) allImagesLoadedMessage.style.display = 'none';
        return;
    }

    imagesToDisplay.forEach(imgData => {
        const imageItem = document.createElement('div');
        imageItem.classList.add('image-item');
        // Thêm data-id để có thể dùng cho lightbox hoặc trang chi tiết sau này
        imageItem.dataset.id = imgData.id;
        imageItem.title = imgData.title; // Hiển thị title khi hover

        const imgElement = document.createElement('img');
        imgElement.src = imgData.fullUrl;
        imgElement.alt = imgData.title;
        imgElement.loading = 'lazy';

        imageItem.appendChild(imgElement);
        imageGallery.appendChild(imageItem);

        imageItem.addEventListener('click', () => {
            // Điều hướng đến trang chi tiết ảnh
            window.location.href = `image-detail.html?id=${imgData.id}`;
        });

        imageGallery.appendChild(imageItem);
    });

    updateLoadMoreVisibility();
}

function updateLoadMoreVisibility() {
    if (!loadMoreContainer || !allImagesLoadedMessage) return;

    if (displayedImagesCount < currentlyDisplayedImages.length) {
        loadMoreContainer.style.display = 'block';
        allImagesLoadedMessage.style.display = 'none';
    } else {
        loadMoreContainer.style.display = 'none';
        if (currentlyDisplayedImages.length > 0) {
            allImagesLoadedMessage.style.display = 'block';
        } else {
            allImagesLoadedMessage.style.display = 'none';
        }
    }
}


function applyImageFiltersAndGetList() {
    let filteredBySeries = [];
    if (currentSeriesFilter === 'all') {
        filteredBySeries = [...allImagesMasterList];
    } else if (animeImageData[currentSeriesFilter]) {
        filteredBySeries = allImagesMasterList.filter(img => img.seriesKey === currentSeriesFilter);
    }

    const searchTerm = searchBar.value.toLowerCase().trim();
    currentSearchTerm = searchTerm;
    const finalFilteredList = filteredBySeries.filter(img =>
        img.title.toLowerCase().includes(searchTerm) ||
        (img.tags && img.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
        img.seriesName.toLowerCase().includes(searchTerm)
    );

    shuffleArray(finalFilteredList); // Xáo trộn kết quả hiển thị
    return finalFilteredList;
}

function resetAndDisplayImages() {
    currentlyDisplayedImages = applyImageFiltersAndGetList();
    displayedImagesCount = 0;
    if (imageGallery) imageGallery.innerHTML = '';
    if (allImagesLoadedMessage) allImagesLoadedMessage.style.display = 'none';
    loadMoreImages();
}

function loadMoreImages() {
    const imagesToLoadNow = currentlyDisplayedImages.slice(displayedImagesCount, displayedImagesCount + imagesPerLoad);
    displayImages(imagesToLoadNow, displayedImagesCount > 0);
    displayedImagesCount += imagesToLoadNow.length;
}

function applyImageViewSize(size) {
    if (!imageGallery) return;
    imageGallery.classList.remove('view-small', 'view-medium', 'view-large');
    imageGallery.classList.add(`view-${size}`);
    viewOptionsButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.size === size);
    });
    localStorage.setItem('imageViewSize', size);
}







// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra sự tồn tại của các element chính trước khi thao tác
    if (!imageGallery || !searchBar || !seriesNavigation || !viewOptionsButtons.length) {
        console.warn("Một hoặc nhiều thành phần UI chính của trang image gallery không được tìm thấy. Script có thể không hoạt động đúng.");
        // return; // Có thể return ở đây nếu các element này là bắt buộc
    }

    prepareAllImages();
    populateImageSeriesNavigation();

    // Mặc định hiển thị tất cả series ban đầu
    currentSeriesFilter = 'all';
    document.querySelectorAll('#image-series-navigation button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.seriesKey === currentSeriesFilter);
    });

    resetAndDisplayImages();

    const defaultViewSize = 'medium';
    const savedViewSize = localStorage.getItem('imageViewSize');
    if (savedViewSize) {
        applyImageViewSize(savedViewSize);
    } else {
        applyImageViewSize(defaultViewSize);
    }

    if (searchBar) {
        searchBar.addEventListener('input', resetAndDisplayImages);
    }

    viewOptionsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const newSize = button.dataset.size;
            applyImageViewSize(newSize);
        });
    });

    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', loadMoreImages);
    }
});