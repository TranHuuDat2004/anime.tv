function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // ES6 swap
        }
    }

    // --- DOM ELEMENTS ---
    const gifGallery = document.getElementById('gif-gallery');
    const searchBar = document.getElementById('search-bar');
    const seriesNavigation = document.getElementById('series-navigation');
    const loadingMessage = document.getElementById('loading-message');
    const viewOptionsButtons = document.querySelectorAll('#view-options button');
    // const gifGalleryElement = document.getElementById('gif-gallery'); // gifGallery đã được khai báo ở trên

    let currentFilter = 'all'; // 'all' hoặc key của series
    let allGifsForDisplay = []; // Mảng chứa tất cả GIF đã được xử lý (có fullUrl)

    // --- FUNCTIONS ---

    function populateSeriesNavigation() {
        const allButton = document.createElement('button');
        allButton.textContent = 'Tất Cả Series';
        allButton.dataset.seriesKey = 'all';
        allButton.classList.add('active');
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
        performSearchAndDisplay();
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
                    seriesKey: seriesKey
                });
            });
        }
        // XÁO TRỘN MẢNG allGifsForDisplay SAU KHI TẠO XONG
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

            gifItem.appendChild(img);
            gifGallery.appendChild(gifItem);

            // THÊM EVENT LISTENER ĐỂ CHUYỂN TRANG (Đảm bảo nó ở đây)
            gifItem.addEventListener('click', () => {
                if (gif.id) {
                    window.location.href = `detail.html?id=${gif.id}`;
                } else {
                    console.error("Cannot navigate: GIF ID is missing for", gif);
                    alert("Lỗi: Không tìm thấy ID của GIF này.");
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
            gifsToFilter = allGifsForDisplay.filter(gif => gif.seriesKey === currentFilter);
        }

        const filteredGifs = gifsToFilter.filter(gif =>
            gif.title.toLowerCase().includes(searchTerm) ||
            (gif.tags && gif.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
            gif.seriesName.toLowerCase().includes(searchTerm)
        );
        displayGifs(filteredGifs);
    }

    function applyViewSize(size) {
        // Sử dụng biến gifGallery đã khai báo ở trên
        gifGallery.classList.remove('view-small', 'view-medium', 'view-large');
        gifGallery.classList.add(`view-${size}`);

        viewOptionsButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.size === size);
        });
        localStorage.setItem('gifViewSize', size);
    }

    // --- INITIALIZATION ---
    document.addEventListener('DOMContentLoaded', () => {
        // Khối DOMContentLoaded thứ nhất (và duy nhất)
        if (loadingMessage) {
            loadingMessage.remove();
        }
        prepareAllGifs();
        populateSeriesNavigation();
        performSearchAndDisplay();

        // Khối xử lý localStorage từ DOMContentLoaded thứ hai được gộp vào đây
        const savedViewSize = localStorage.getItem('gifViewSize');
        if (savedViewSize) {
            applyViewSize(savedViewSize);
        } else {
            // Đảm bảo #gif-gallery có class .view-medium ban đầu nếu không có gì trong localStorage
            // Class này nên được đặt trực tiếp trong HTML cho #gif-gallery
            // Hoặc nếu không, bạn có thể kiểm tra và áp dụng ở đây:
            if (!gifGallery.classList.contains('view-small') &&
                !gifGallery.classList.contains('view-medium') &&
                !gifGallery.classList.contains('view-large')) {
                 applyViewSize('medium'); // Class mặc định nếu thẻ HTML không có sẵn
            }
        }
    });

    // Xử lý sự kiện tìm kiếm
    searchBar.addEventListener('input', performSearchAndDisplay);

    // Xử lý click cho các nút tùy chọn view
    viewOptionsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const newSize = button.dataset.size;
            applyViewSize(newSize);
        });
    });