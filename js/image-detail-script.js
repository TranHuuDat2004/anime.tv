// js/image-detail-script.js

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const imageId = urlParams.get('id');

    const detailedImageElement = document.getElementById('detailed-image');
    const imageTitleElement = document.getElementById('image-title');
    const imageSeriesNameElement = document.getElementById('image-series-name');
    const imageTagsElement = document.getElementById('image-tags');
    const downloadButton = document.getElementById('download-image-button');

    const prevImageButton = document.getElementById('prev-image');
    const nextImageButton = document.getElementById('next-image');
    const backToGalleryLink = document.querySelector('.navigation-back a');

    // Elements cho phần "Ảnh khác trong series"
    const otherImagesSeriesNameElement = document.getElementById('other-images-series-name');
    const otherImagesGalleryElement = document.getElementById('other-images-gallery');

    if (!imageId || typeof animeImageData === 'undefined') {
        if (imageTitleElement) imageTitleElement.textContent = "Lỗi";
        if (detailedImageElement) detailedImageElement.alt = "Không tìm thấy ID ảnh hoặc dữ liệu ảnh.";
        if (document.querySelector('.image-detail-container')) {
            document.querySelector('.image-detail-container').innerHTML = '<p class="placeholder-text">Không tìm thấy ID ảnh hoặc dữ liệu ảnh không tồn tại.</p>';
        }
        return;
    }

    let currentImage = null;
    let currentSeriesKey = null;
    let imagesInSeries = [];
    let currentImageIndex = -1;

    // Tìm ảnh và series tương ứng
    for (const seriesKey in animeImageData) {
        const series = animeImageData[seriesKey];
        const foundImage = series.images.find(img => img.id === imageId);
        if (foundImage) {
            currentImage = {
                ...foundImage, // Sao chép tất cả thuộc tính của ảnh
                seriesName: series.displayName,
                seriesKey: seriesKey,
                // Xây dựng fullUrl một lần nữa (đảm bảo tính nhất quán)
                fullUrl: (foundImage.isExternalOverride || (series.isExternal && !foundImage.hasOwnProperty('isExternalOverride'))) ?
                    foundImage.url :
                    (series.folder || '') + foundImage.fileName
            };
            currentSeriesKey = seriesKey;
            // Lấy tất cả ảnh trong series hiện tại để điều hướng
            imagesInSeries = series.images.map(img => ({
                ...img,
                fullUrl: (img.isExternalOverride || (series.isExternal && !img.hasOwnProperty('isExternalOverride'))) ?
                    img.url :
                    (series.folder || '') + img.fileName
            }));
            currentImageIndex = imagesInSeries.findIndex(img => img.id === imageId);
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
                imageTagsElement.innerHTML = ''; // Xóa nội dung cũ
                currentImage.tags.forEach(tag => {
                    const tagElement = document.createElement('span');
                    tagElement.className = 'tag';
                    tagElement.textContent = tag;
                    // (Tùy chọn) Thêm link cho tag để lọc trên trang gallery
                    // tagElement.onclick = () => window.location.href = `image-gallery.html?search=${encodeURIComponent(tag)}`;
                    imageTagsElement.appendChild(tagElement);
                });
            } else {
                imageTagsElement.textContent = 'Không có tags';
            }
        }

        // Nút tải về
        if (downloadButton) {
            downloadButton.href = currentImage.fullUrl;
            // Đặt tên file tải về (nếu là ảnh cục bộ và có fileName)
            // Trình duyệt có thể không luôn tuân theo thuộc tính download cho link cross-origin
            downloadButton.download = currentImage.fileName || currentImage.title.replace(/[^a-z0-9_.-]/gi, '_') + (currentImage.fullUrl.includes('.png') ? '.png' : '.jpg');
        }

        // Nút sao chép URL
        // if (copyUrlButton) {
        //     copyUrlButton.addEventListener('click', () => {
        //         navigator.clipboard.writeText(currentImage.fullUrl)
        //             .then(() => {
        //                 alert('Đã sao chép URL ảnh!');
        //             })
        //             .catch(err => {
        //                 console.error('Không thể sao chép URL: ', err);
        //                 alert('Lỗi: Không thể sao chép URL.');
        //             });
        //     });
        // }

        // Cập nhật tên series cho phần "Ảnh khác"
        if (otherImagesSeriesNameElement) {
            otherImagesSeriesNameElement.textContent = currentImage.seriesName;
        }

        // HIỂN THỊ CÁC ẢNH KHÁC TRONG CÙNG SERIES
        if (otherImagesGalleryElement && allImagesInCurrentSeries.length > 1) {
            otherImagesGalleryElement.innerHTML = ''; // Xóa nội dung cũ

            // Lọc ra các ảnh khác (không phải ảnh đang xem)
            const otherImages = allImagesInCurrentSeries.filter(img => img.id !== currentImage.id);

            // Giới hạn số lượng ảnh khác hiển thị (ví dụ: 6 ảnh)
            const displayLimit = 6;
            const imagesToShow = otherImages.slice(0, displayLimit);


            if (imagesToShow.length > 0) {
                imagesToShow.forEach(imgData => {
                    const imageItemLink = document.createElement('a'); // Mỗi ảnh là một link
                    imageItemLink.href = `image-detail.html?id=${imgData.id}`;
                    imageItemLink.classList.add('image-item'); // Tái sử dụng class từ image-gallery.html
                    imageItemLink.title = imgData.title;

                    const imgElement = document.createElement('img');
                    imgElement.src = imgData.fullUrl;
                    imgElement.alt = imgData.title;
                    imgElement.loading = 'lazy';

                    imageItemLink.appendChild(imgElement);
                    otherImagesGalleryElement.appendChild(imageItemLink);
                });
            } else {
                 // Ẩn section nếu không có ảnh nào khác (hoặc chỉ có 1 ảnh trong series)
                if (document.querySelector('.other-images-in-series-section')) {
                    document.querySelector('.other-images-in-series-section').style.display = 'none';
                }
            }
        } else {
            // Ẩn section nếu không có gallery element hoặc series chỉ có 1 ảnh
             if (document.querySelector('.other-images-in-series-section')) {
                document.querySelector('.other-images-in-series-section').style.display = 'none';
            }
        }

        
        // Cập nhật link quay lại bộ sưu tập (có thể thêm filter series nếu muốn)
        if (backToGalleryLink && currentSeriesKey) {
            backToGalleryLink.href = `image-gallery.html?series=${currentSeriesKey}`;
        }


        // Logic nút Previous/Next Image
        function updateNavButtons() {
            if (prevImageButton) {
                prevImageButton.style.display = currentImageIndex > 0 ? 'block' : 'none';
                if (currentImageIndex > 0) {
                    prevImageButton.onclick = () => {
                        window.location.href = `image-detail.html?id=${imagesInSeries[currentImageIndex - 1].id}`;
                    };
                }
            }
            if (nextImageButton) {
                nextImageButton.style.display = currentImageIndex < imagesInSeries.length - 1 ? 'block' : 'none';
                if (currentImageIndex < imagesInSeries.length - 1) {
                    nextImageButton.onclick = () => {
                        window.location.href = `image-detail.html?id=${imagesInSeries[currentImageIndex + 1].id}`;
                    };
                }
            }
        }
        updateNavButtons();


    } else {
        if (imageTitleElement) imageTitleElement.textContent = "Không tìm thấy ảnh";
        if (detailedImageElement) detailedImageElement.alt = "Ảnh không tồn tại";
        if (document.querySelector('.image-detail-container')) {
            document.querySelector('.image-detail-container').innerHTML = '<p class="placeholder-text">Rất tiếc, hình ảnh bạn tìm kiếm không tồn tại.</p>';
        }
    }
});