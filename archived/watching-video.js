// js/watch-video-script.js

document.addEventListener('DOMContentLoaded', function () {
    // --- Lấy DOM Elements ---
    const videoPlayerWrapper = document.getElementById('videoPlayerWrapper');
    const animeTitleWatchPage = document.getElementById('animeTitleWatchPage');
    const episodeTitleWatchPage = document.getElementById('episodeTitleWatchPage');
    const episodeSubDubWatchPage = document.getElementById('episodeSubDubWatchPage');
    const backToDetailBtn = document.getElementById('backToDetailBtn');
    const prevEpisodeBtn = document.getElementById('prevEpisodeBtn');
    const nextEpisodeBtn = document.getElementById('nextEpisodeBtn');
    const watchPageSeasonContainer = document.getElementById('watchPageSeasonContainer');
    const pageSelector = document.getElementById('pageSelector'); // Dropdown chọn trang (nếu là đọc truyện) - có thể không dùng ở đây

    // Helper function để hiển thị lỗi và ẩn các phần không cần thiết
    function showErrorAndCleanup(message, animeTitle = "Lỗi") {
        if (animeTitleWatchPage) animeTitleWatchPage.textContent = animeTitle;
        if (episodeTitleWatchPage) episodeTitleWatchPage.textContent = message;
        if (videoPlayerWrapper) videoPlayerWrapper.innerHTML = `<p class="error-message">${message}</p>`;

        const episodeNav = document.querySelector('.episode-navigation');
        if (episodeNav) episodeNav.style.display = 'none';

        const otherEpisodesSection = document.querySelector('.watch-page-episode-list-section');
        if (otherEpisodesSection) otherEpisodesSection.style.display = 'none';

        if (pageSelector) pageSelector.style.display = 'none'; // Ẩn dropdown nếu có
    }


    // --- Lấy Parameters từ URL ---
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = urlParams.get('animeId');
    const seasonNumParam = urlParams.get('season');
    const episodeNumParam = urlParams.get('ep');

    if (!animeId || !seasonNumParam || !episodeNumParam) {
        showErrorAndCleanup("Thiếu thông tin tập phim để hiển thị. Vui lòng kiểm tra lại đường dẫn.");
        return;
    }

    const seasonNum = parseInt(seasonNumParam);
    const epNumInSeason = parseInt(episodeNumParam);

    // --- Kiểm tra và Lấy Dữ liệu Anime ---
    if (typeof animeData === 'undefined' || !animeData) {
        console.error("Lỗi: animeData không được định nghĩa hoặc chưa tải xong.");
        showErrorAndCleanup("Lỗi tải dữ liệu Anime.");
        return;
    }

    const anime = animeData.find(a => a.id === animeId);
    if (!anime) {
        showErrorAndCleanup(`Không tìm thấy anime với ID: ${animeId}.`);
        return;
    }

    if (!anime.episodes || !anime.episodes.seasons) {
        console.error("Lỗi: Dữ liệu episodes hoặc seasons không tồn tại cho anime:", anime.title);
        showErrorAndCleanup("Lỗi dữ liệu tập phim.", anime.title);
        return;
    }

    const season = anime.episodes.seasons.find(s => s.seasonNum === seasonNum);
    if (!season) {
        showErrorAndCleanup(`Không tìm thấy mùa ${seasonNum} cho anime ${anime.title}.`, anime.title);
        return;
    }

    if (!season.episodes || season.episodes.length === 0) {
        console.error("Lỗi: Dữ liệu episodes trong season không tồn tại hoặc rỗng:", season);
        showErrorAndCleanup(`Mùa ${seasonNum}: Lỗi dữ liệu các tập.`, anime.title);
        return;
    }

    const currentEpisode = season.episodes.find(e => e.epNumInSeason === epNumInSeason);
    if (!currentEpisode || !currentEpisode.videoUrl || currentEpisode.videoUrl === "#") {
        showErrorAndCleanup("Không tìm thấy tập phim hiện tại hoặc link video không hợp lệ.", anime.title);
        return;
    }

    // --- Cập nhật Thông tin Trang và Video Player ---
    document.title = `Xem: ${anime.title} - Tập ${currentEpisode.epNumOverall} - ANIME.TV`;
    if (animeTitleWatchPage) animeTitleWatchPage.textContent = anime.title;
    if (episodeTitleWatchPage) episodeTitleWatchPage.textContent = `Tập ${currentEpisode.epNumOverall} (Mùa ${season.seasonNum} - Tập ${currentEpisode.epNumInSeason}): ${currentEpisode.title}`;

    let subDubText = [];
    if (currentEpisode.sub) subDubText.push("Phụ đề");
    if (currentEpisode.dub) subDubText.push("Lồng tiếng");
    if (episodeSubDubWatchPage) episodeSubDubWatchPage.textContent = subDubText.join(' | ');

    const videoSrc = currentEpisode.videoUrl;
    const playerType = currentEpisode.playerType; // Lấy playerType từ data.js

    if (videoPlayerWrapper) videoPlayerWrapper.innerHTML = ''; // Xóa nội dung cũ

    let playerCreated = false;

    if ((playerType === 'youtube' || videoSrc.includes('youtube.com/embed/'))) {
        console.log("Đang chuẩn bị nhúng YouTube video:", videoSrc);
        const iframe = document.createElement('iframe');
        iframe.id = 'youtubePlayer';
        iframe.src = videoSrc;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
        iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        iframe.setAttribute('allowfullscreen', 'true');
        videoPlayerWrapper.appendChild(iframe);
        playerCreated = true;
        iframe.onerror = () => {
            console.error("Lỗi khi tải nội dung iframe YouTube. URL:", videoSrc);
            if(videoPlayerWrapper) videoPlayerWrapper.innerHTML = `<p class="error-message">Không thể tải video từ YouTube. Video có thể đã bị xóa hoặc thay đổi quyền riêng tư.</p>`;
        };
    } else if ((playerType === 'vimeo' || videoSrc.includes('player.vimeo.com/video/'))) {
        console.log("Đang chuẩn bị nhúng Vimeo video:", videoSrc);
        const iframe = document.createElement('iframe');
        iframe.id = 'vimeoPlayer';
        iframe.src = videoSrc;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture; clipboard-write');
        iframe.setAttribute('allowfullscreen', 'true');
        videoPlayerWrapper.appendChild(iframe);
        playerCreated = true;
        iframe.onerror = () => {
            console.error("Lỗi khi tải nội dung iframe Vimeo. URL:", videoSrc);
            if(videoPlayerWrapper) videoPlayerWrapper.innerHTML = `<p class="error-message">Không thể tải video từ Vimeo. Vui lòng kiểm tra lại link.</p>`;
        };
    } else if ((playerType === 'html5video' || videoSrc.includes('raw.githubusercontent.com'))) {
        console.log("Đang chuẩn bị nhúng HTML5 video (GitHub Raw):", videoSrc);
        const videoElement = document.createElement('video');
        videoElement.id = 'mainVideoPlayer';
        videoElement.controls = true;
        videoElement.autoplay = true;
        videoElement.src = videoSrc;
        videoElement.style.width = '100%'; // Hoặc dùng class CSS
        videoPlayerWrapper.appendChild(videoElement);
        videoElement.load();
        videoElement.play().catch(e => console.warn("Autoplay video HTML5 bị chặn hoặc lỗi:", e));
        playerCreated = true;
        videoElement.onerror = (e) => {
            console.error("Lỗi khi tải video HTML5:", videoSrc, e);
            if(videoPlayerWrapper) videoPlayerWrapper.innerHTML = `<p class="error-message">Không thể tải video. Link có thể không chính xác hoặc có vấn đề khi tải từ nguồn. <br>Link gốc: <a href="${videoSrc}" target="_blank" rel="noopener noreferrer">Mở link video</a></p>`;
        };
    }

    if (!playerCreated) {
        console.error("Không thể xác định loại trình phát hoặc link video không hợp lệ:", videoSrc, "Loại playerType:", playerType);
        showErrorAndCleanup(`Định dạng link video không được hỗ trợ hoặc video không có sẵn. Link gốc: ${videoSrc}`, anime.title);
    }

    // --- Hiển thị Danh sách các Tập khác ---
    if (watchPageSeasonContainer && anime.episodes && anime.episodes.seasons) {
        watchPageSeasonContainer.innerHTML = '';
        anime.episodes.seasons.forEach(seasonData => { // Đổi tên biến
            const seasonBlock = document.createElement('div');
            seasonBlock.className = 'season-block';

            // Không hiển thị tiêu đề season trên trang xem video để gọn hơn
            // const seasonTitleEl = document.createElement('h3');
            // seasonTitleEl.textContent = `Season ${seasonData.seasonNum}${seasonData.seasonTitle ? (': ' + seasonData.seasonTitle) : ''}`;
            // seasonBlock.appendChild(seasonTitleEl);

            const episodeListContainer = document.createElement('div');
            episodeListContainer.className = 'episode-list-container';

            const episodeList = document.createElement('div');
            episodeList.className = 'episode-list';

            seasonData.episodes.forEach(ep => {
                const episodeItemLink = document.createElement('a');
                episodeItemLink.href = `watch-video.html?animeId=${anime.id}&season=${seasonData.seasonNum}&ep=${ep.epNumInSeason}`;
                episodeItemLink.className = 'episode-item';

                if (seasonData.seasonNum === seasonNum && ep.epNumInSeason === epNumInSeason) {
                    episodeItemLink.classList.add('playing-now');
                }
                if (!ep.videoUrl || ep.videoUrl === "#") {
                    episodeItemLink.classList.add('disabled');
                }

                const thumbnailWrapper = document.createElement('div');
                thumbnailWrapper.className = 'episode-thumbnail-wrapper';
                const epThumbnail = document.createElement('img');
                epThumbnail.src = ep.thumbnail || 'https://via.placeholder.com/280x158?text=No+Thumb';
                epThumbnail.alt = `Thumbnail ${ep.title}`;
                epThumbnail.className = 'episode-thumbnail';
                thumbnailWrapper.appendChild(epThumbnail);
                const playIcon = document.createElement('span');
                playIcon.className = 'play-icon-list';
                playIcon.innerHTML = '►';
                thumbnailWrapper.appendChild(playIcon);
                episodeItemLink.appendChild(thumbnailWrapper);

                const epInfo = document.createElement('div');
                epInfo.className = 'episode-info';
                const epNumber = document.createElement('span');
                epNumber.className = 'episode-number';
                epNumber.textContent = `Tập ${ep.epNumInSeason}`;
                epInfo.appendChild(epNumber);
                const epTitle = document.createElement('h4');
                epTitle.className = 'episode-title';
                epTitle.textContent = ep.title;
                epInfo.appendChild(epTitle);
                episodeItemLink.appendChild(epInfo);

                episodeList.appendChild(episodeItemLink);
            });
            episodeListContainer.appendChild(episodeList);
            seasonBlock.appendChild(episodeListContainer);
            watchPageSeasonContainer.appendChild(seasonBlock);
        });
    } else if (watchPageSeasonContainer) {
        watchPageSeasonContainer.innerHTML = '<p class="placeholder-text">Không có thông tin các tập khác.</p>';
    }


    // --- Nút trở về trang chi tiết Anime ---
    if (backToDetailBtn) backToDetailBtn.href = `anime-detail.html?id=${animeId}`;

    // --- Logic cho nút Tập Trước / Tập Tiếp Theo ---
    let currentEpisodeIndexInSeason = season.episodes.findIndex(e => e.epNumInSeason === epNumInSeason);

    function setupNavButton(buttonElement, targetEpisode) {
        if (buttonElement) {
            if (targetEpisode && targetEpisode.videoUrl && targetEpisode.videoUrl !== "#") {
                buttonElement.href = `watch-video.html?animeId=${anime.id}&season=${targetEpisode.seasonNum || seasonNum}&ep=${targetEpisode.epNumInSeason}`; // Sử dụng seasonNum của targetEpisode nếu có
                buttonElement.classList.remove('disabled');
            } else {
                buttonElement.href = "#";
                buttonElement.classList.add('disabled');
            }
        }
    }

    // Tập Trước
    let prevEpToShow = null;
    if (currentEpisodeIndexInSeason > 0) {
        prevEpToShow = season.episodes[currentEpisodeIndexInSeason - 1];
    } else { // Kiểm tra season trước đó
        const currentSeasonIndex = anime.episodes.seasons.findIndex(s => s.seasonNum === seasonNum);
        if (currentSeasonIndex > 0) {
            const prevSeason = anime.episodes.seasons[currentSeasonIndex - 1];
            if (prevSeason.episodes && prevSeason.episodes.length > 0) {
                const lastEpOfPrevSeason = prevSeason.episodes[prevSeason.episodes.length - 1];
                // Gán thêm seasonNum cho targetEpisode để link cho đúng season
                prevEpToShow = {...lastEpOfPrevSeason, seasonNum: prevSeason.seasonNum};
            }
        }
    }
    setupNavButton(prevEpisodeBtn, prevEpToShow);


    // Tập Tiếp Theo
    let nextEpToShow = null;
    if (currentEpisodeIndexInSeason < season.episodes.length - 1) {
        nextEpToShow = season.episodes[currentEpisodeIndexInSeason + 1];
    } else { // Kiểm tra season tiếp theo
        const currentSeasonIndex = anime.episodes.seasons.findIndex(s => s.seasonNum === seasonNum);
        if (currentSeasonIndex < anime.episodes.seasons.length - 1) {
            const nextSeason = anime.episodes.seasons[currentSeasonIndex + 1];
            if (nextSeason.episodes && nextSeason.episodes.length > 0) {
                const firstEpOfNextSeason = nextSeason.episodes[0];
                nextEpToShow = {...firstEpOfNextSeason, seasonNum: nextSeason.seasonNum};
            }
        }
    }
    setupNavButton(nextEpisodeBtn, nextEpToShow);

});