// js/image-detail-script.js

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const imageId = urlParams.get('id');

    // Lấy tất cả các DOM elements cần thiết ở đầu
    const detailedImageElement = document.getElementById('detailed-image');
    const imageTitleElement = document.getElementById('image-title');
    const imageSeriesNameElement = document.getElementById('image-series-name');
    const imageTagsElement = document.getElementById('image-tags');
    const downloadButton = document.getElementById('download-image-button');
    const copyUrlButton = document.getElementById('copy-image-url-button'); // Lấy element này
    const prevImageButton = document.getElementById('prev-image');
    const nextImageButton = document.getElementById('next-image');
    const backToGalleryLink = document.querySelector('.navigation-back a');
    const otherImagesSeriesNameElement = document.getElementById('other-images-series-name');
    const otherImagesGalleryElement = document.getElementById('other-images-gallery');

    if (!imageId || typeof animeImageData === 'undefined') {
        if (imageTitleElement) imageTitleElement.textContent = "Lỗi";
        if (detailedImageElement) detailedImageElement.alt = "Không tìm thấy ID ảnh hoặc dữ liệu ảnh.";
        const detailContainer = document.querySelector('.image-detail-container');
        if (detailContainer) {
            detailContainer.innerHTML = '<p class="placeholder-text">Không tìm thấy ID ảnh hoặc dữ liệu ảnh không tồn tại.</p>';
        }
        const otherImagesSection = document.querySelector('.other-images-in-series-section');
        if (otherImagesSection) otherImagesSection.style.display = 'none'; // Ẩn luôn phần ảnh khác
        return;
    }

    let currentImage = null;
    let currentSeriesKey = null;
    let allImagesInCurrentSeries = []; // Sử dụng tên này nhất quán
    let currentImageIndexInSeries = -1;  // Sử dụng tên này nhất quán

    // Tìm ảnh và series tương ứng
    for (const seriesKey in animeImageData) {
        const series = animeImageData[seriesKey];
        // Lấy tất cả ảnh trong series này và xây dựng fullUrl
        const tempImagesInSeries = series.images.map(img => ({
            ...img,
            fullUrl: (img.isExternalOverride || (series.isExternal && !img.hasOwnProperty('isExternalOverride'))) ?
                     img.url :
                     (series.folder || '') + img.fileName
        }));

        const foundImageIndex = tempImagesInSeries.findIndex(img => img.id === imageId);

        if (foundImageIndex !== -1) {
            currentImage = tempImagesInSeries[foundImageIndex]; // Lấy ảnh đã có fullUrl
            currentSeriesKey = seriesKey;
            allImagesInCurrentSeries = tempImagesInSeries; // Gán danh sách ảnh của series
            currentImageIndexInSeries = foundImageIndex;   // Gán index
            // Thêm seriesName vào currentImage nếu chưa có (do map ở trên)
            currentImage.seriesName = series.displayName;
            currentImage.seriesKey = seriesKey;
            break;
        }
    }

    if (currentImage) {
        document.title = `${currentImage.title} - ${currentImage.seriesName} - ANIME.TV`;
        if (detailedImageElement) {
            detailedImageElement.src = currentImage.fullUrl;
            detailedImageElement.alt = currentImage.title;
        }
        if (imageTitleElement) imageTitleElement.textContent = currentImage.title;
        if (imageSeriesNameElement) imageSeriesNameElement.textContent = currentImage.seriesName;

        if (imageTagsElement) {
            if (currentImage.tags && currentImage.tags.length > 0) {
                imageTagsElement.innerHTML = '';
                currentImage.tags.forEach(tag => {
                    const tagElement = document.createElement('span');
                    tagElement.className = 'tag';
                    tagElement.textContent = tag;
                    imageTagsElement.appendChild(tagElement);
                });
            } else {
                imageTagsElement.textContent = 'Không có tags';
            }
        }

        if (downloadButton) {
            downloadButton.href = currentImage.fullUrl;
            downloadButton.download = currentImage.fileName || currentImage.title.replace(/[^a-z0-9_.-]/gi, '_') + (currentImage.fullUrl.includes('.png') ? '.png' : (currentImage.fullUrl.includes('.webp') ? '.webp' : '.jpg'));
        }

        // Nút sao chép URL (bỏ bình luận và đảm bảo copyUrlButton được lấy ở trên)
        if (copyUrlButton) {
            copyUrlButton.addEventListener('click', () => {
                navigator.clipboard.writeText(currentImage.fullUrl)
                    .then(() => {
                        alert('Đã sao chép URL ảnh!');
                    })
                    .catch(err => {
                        console.error('Không thể sao chép URL: ', err);
                        alert('Lỗi: Không thể sao chép URL.');
                    });
            });
        }

        if (otherImagesSeriesNameElement) {
            otherImagesSeriesNameElement.textContent = currentImage.seriesName;
        }

        // HIỂN THỊ CÁC ẢNH KHÁC TRONG CÙNG SERIES
        const otherImagesSection = document.querySelector('.other-images-in-series-section'); // Lấy section để ẩn/hiện
        if (otherImagesGalleryElement && allImagesInCurrentSeries.length > 1) {
            otherImagesGalleryElement.innerHTML = '';

            const otherImages = allImagesInCurrentSeries.filter(img => img.id !== currentImage.id);
            const displayLimit = 20; // Giới hạn số ảnh hiển thị
            const imagesToShow = otherImages.slice(0, displayLimit);

            if (imagesToShow.length > 0) {
                if(otherImagesSection) otherImagesSection.style.display = 'block'; // Hiện section
                imagesToShow.forEach(imgData => {
                    const imageItemLink = document.createElement('a');
                    imageItemLink.href = `image-detail.html?id=${imgData.id}`;
                    imageItemLink.classList.add('image-item');
                    imageItemLink.title = imgData.title;

                    const imgElement = document.createElement('img');
                    imgElement.src = imgData.fullUrl; // Đã có fullUrl từ allImagesInCurrentSeries
                    imgElement.alt = imgData.title;
                    imgElement.loading = 'lazy';

                    imageItemLink.appendChild(imgElement);
                    otherImagesGalleryElement.appendChild(imageItemLink);
                });
            } else {
                if(otherImagesSection) otherImagesSection.style.display = 'none';
            }
        } else {
             if(otherImagesSection) otherImagesSection.style.display = 'none';
        }

        if (backToGalleryLink && currentSeriesKey) {
            backToGalleryLink.href = `image-gallery.html?series=${currentSeriesKey}`;
        }

        // Logic nút Previous/Next Image (ĐÃ SỬA TÊN BIẾN)
        function updateNavButtons() {
            if (prevImageButton) {
                prevImageButton.style.display = currentImageIndexInSeries > 0 ? 'block' : 'none';
                if (currentImageIndexInSeries > 0) {
                    prevImageButton.onclick = () => {
                        window.location.href = `image-detail.html?id=${allImagesInCurrentSeries[currentImageIndexInSeries - 1].id}`;
                    };
                }
            }
            if (nextImageButton) {
                nextImageButton.style.display = currentImageIndexInSeries < allImagesInCurrentSeries.length - 1 ? 'block' : 'none';
                if (currentImageIndexInSeries < allImagesInCurrentSeries.length - 1) {
                    nextImageButton.onclick = () => {
                        window.location.href = `image-detail.html?id=${allImagesInCurrentSeries[currentImageIndexInSeries + 1].id}`;
                    };
                }
            }
        }
        updateNavButtons();

    } else {
        if (imageTitleElement) imageTitleElement.textContent = "Không tìm thấy ảnh";
        if (detailedImageElement) detailedImageElement.alt = "Ảnh không tồn tại";
        const detailContainer = document.querySelector('.image-detail-container');
        if (detailContainer) {
            detailContainer.innerHTML = '<p class="placeholder-text">Rất tiếc, hình ảnh bạn tìm kiếm không tồn tại.</p>';
        }
        const otherImagesSection = document.querySelector('.other-images-in-series-section');
        if (otherImagesSection) otherImagesSection.style.display = 'none';
    }
});