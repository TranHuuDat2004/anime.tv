document.addEventListener('DOMContentLoaded', function () {
            const urlParams = new URLSearchParams(window.location.search);
            const animeId = urlParams.get('animeId');
            const seasonNumParam = urlParams.get('season');
            const episodeNumParam = urlParams.get('ep');

            const videoPlayerWrapper = document.getElementById('videoPlayerWrapper');

            if (!animeId || !seasonNumParam || !episodeNumParam) {
                document.getElementById('animeTitleWatchPage').textContent = "Lỗi"; // Giữ ngắn gọn
                document.getElementById('episodeTitleWatchPage').textContent = "Thiếu thông tin tập phim.";
                videoPlayerWrapper.innerHTML = '<p class="error-message">Không thể tải video. Vui lòng kiểm tra lại đường dẫn.</p>';
                return;
            }

            const seasonNum = parseInt(seasonNumParam);
            const epNumInSeason = parseInt(episodeNumParam);

            if (typeof animeData === 'undefined' || !animeData) {
                console.error("Lỗi: animeData không được định nghĩa hoặc chưa tải xong.");
                document.getElementById('episodeTitleWatchPage').textContent = "Lỗi tải dữ liệu Anime";
                return;
            }

            const anime = animeData.find(a => a.id === animeId);

            if (!anime) {
                document.getElementById('animeTitleWatchPage').textContent = "Lỗi";
                document.getElementById('episodeTitleWatchPage').textContent = "Không tìm thấy anime.";
                return;
            }

            const season = anime.episodes.seasons.find(s => s.seasonNum === seasonNum);
            if (!season) {
                document.getElementById('animeTitleWatchPage').textContent = anime.title;
                document.getElementById('episodeTitleWatchPage').textContent = "Không tìm thấy mùa phim.";
                return;
            }

            const currentEpisode = season.episodes.find(e => e.epNumInSeason === epNumInSeason);

            if (!currentEpisode || !currentEpisode.videoUrl || currentEpisode.videoUrl === "#") {
                document.getElementById('animeTitleWatchPage').textContent = anime.title;
                document.getElementById('episodeTitleWatchPage').textContent = "Không tìm thấy tập phim hoặc link video không hợp lệ.";
                videoPlayerWrapper.innerHTML = '<p class="error-message">Link video không tồn tại hoặc không hợp lệ.</p>';
                return;
            }

            // Cập nhật tiêu đề trang và thông tin
            document.title = `Xem: ${anime.title} - Tập ${currentEpisode.epNumOverall}`;
            document.getElementById('animeTitleWatchPage').textContent = anime.title;
            document.getElementById('episodeTitleWatchPage').textContent = `Tập ${currentEpisode.epNumOverall} (Mùa ${season.seasonNum} - Tập ${currentEpisode.epNumInSeason}): ${currentEpisode.title}`;

            let subDubText = [];
            if (currentEpisode.sub) subDubText.push("Phụ đề");
            if (currentEpisode.dub) subDubText.push("Lồng tiếng");
            document.getElementById('episodeSubDubWatchPage').textContent = subDubText.join(' | ');

            // TẠO IFRAME CHO VIMEO
            const vimeoVideoUrl = currentEpisode.videoUrl;
            console.log("Đang chuẩn bị nhúng Vimeo video:", vimeoVideoUrl);

            if (vimeoVideoUrl.includes('player.vimeo.com/video/')) {
                videoPlayerWrapper.innerHTML = ''; // Xóa nội dung cũ

                const iframe = document.createElement('iframe');
                iframe.id = 'vimeoPlayer'; // Đặt ID mới hoặc giữ ID cũ nếu CSS không bị ảnh hưởng
                iframe.src = vimeoVideoUrl;

                // Các thuộc tính chuẩn cho Vimeo embed
                // width và height sẽ được quản lý bởi CSS
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture; clipboard-write');
                // Vimeo không cần các prefix mozallowfullscreen, webkitallowfullscreen như Google Drive trước đây
                iframe.setAttribute('allowfullscreen', 'true');
                // iframe.setAttribute('title', currentEpisode.title); // Có thể thêm title cho accessibility

                videoPlayerWrapper.appendChild(iframe);
                console.log("Đã tạo và chèn iframe Vimeo:", vimeoVideoUrl);

                iframe.onerror = () => {
                    console.error("Lỗi khi tải nội dung iframe Vimeo. URL:", vimeoVideoUrl);
                    videoPlayerWrapper.innerHTML = `<p class="error-message">Rất tiếc, không thể tải video từ Vimeo. Vui lòng kiểm tra lại link hoặc thử lại sau.</p>`;
                };

            } else {
                console.error("Link video không phải là link nhúng Vimeo hợp lệ:", vimeoVideoUrl);
                videoPlayerWrapper.innerHTML = `<p class="error-message">Định dạng link video không hợp lệ. Link gốc: ${vimeoVideoUrl}</p>`;
                return;
            }

            // THÊM LOGIC ĐỂ HIỂN THỊ DANH SÁCH CÁC TẬP KHÁC:

            const watchPageSeasonContainer = document.getElementById('watchPageSeasonContainer');
            if (watchPageSeasonContainer && anime && anime.episodes && anime.episodes.seasons) {
                watchPageSeasonContainer.innerHTML = ''; // Xóa nội dung cũ

                anime.episodes.seasons.forEach(currentSeasonData => { // Đổi tên biến để tránh trùng
                    const seasonBlock = document.createElement('div');
                    // Tái sử dụng class từ anime-detail-style.css nếu muốn style giống hệt
                    seasonBlock.className = 'season-block'; // Giả sử bạn muốn style giống

                    const seasonTitle = document.createElement('h3');
                    // Không cần hiển thị lại tiêu đề season nếu chỉ có 1 season hoặc bạn không muốn
                    // seasonTitle.textContent = `Season ${currentSeasonData.seasonNum}${currentSeasonData.seasonTitle ? (': ' + currentSeasonData.seasonTitle) : ''}`;
                    // seasonBlock.appendChild(seasonTitle); // Bỏ qua tiêu đề season trên trang xem

                    // Tái sử dụng class từ anime-detail-style.css
                    const episodeListContainer = document.createElement('div');
                    episodeListContainer.className = 'episode-list-container';

                    const episodeList = document.createElement('div');
                    episodeList.className = 'episode-list'; // Dùng grid layout từ anime-detail-style.css

                    currentSeasonData.episodes.forEach(ep => {
                        const episodeItemLink = document.createElement('a');
                        episodeItemLink.href = `watch-video.html?animeId=${anime.id}&season=${currentSeasonData.seasonNum}&ep=${ep.epNumInSeason}`;
                        episodeItemLink.className = 'episode-item'; // Tái sử dụng class

                        // Đánh dấu tập đang xem (nếu muốn)
                        if (currentSeasonData.seasonNum === seasonNum && ep.epNumInSeason === epNumInSeason) {
                            episodeItemLink.classList.add('playing-now'); // Class để style riêng
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
                        epNumber.textContent = `Tập ${ep.epNumInSeason}`; // Chỉ hiển thị số tập trong mùa
                        epInfo.appendChild(epNumber);

                        const epTitle = document.createElement('h4');
                        epTitle.className = 'episode-title';
                        epTitle.textContent = ep.title;
                        epInfo.appendChild(epTitle);

                        // Không cần hiển thị duration và sub/dub ở đây để tiết kiệm không gian
                        // const durationSubdubWrapper = document.createElement('div');
                        // ...

                        episodeItemLink.appendChild(epInfo);
                        episodeList.appendChild(episodeItemLink);
                    });
                    episodeListContainer.appendChild(episodeList);
                    seasonBlock.appendChild(episodeListContainer);
                    watchPageSeasonContainer.appendChild(seasonBlock);
                });
            }


            // Nút trở về trang chi tiết
            document.getElementById('backToDetailBtn').href = `anime-detail.html?id=${animeId}`;

            // Logic cho nút Tập Trước / Tập Tiếp Theo
            let currentEpisodeIndexInSeason = season.episodes.findIndex(e => e.epNumInSeason === epNumInSeason);

            const prevEpisodeBtn = document.getElementById('prevEpisodeBtn');
            prevEpisodeBtn.classList.add('disabled');
            prevEpisodeBtn.href = "#";
            if (currentEpisodeIndexInSeason > 0) {
                const prevEp = season.episodes[currentEpisodeIndexInSeason - 1];
                if (prevEp && prevEp.videoUrl && prevEp.videoUrl !== "#") {
                    prevEpisodeBtn.href = `watch-video.html?animeId=${animeId}&season=${season.seasonNum}&ep=${prevEp.epNumInSeason}`;
                    prevEpisodeBtn.classList.remove('disabled');
                }
            } else {
                const currentSeasonIndex = anime.episodes.seasons.findIndex(s => s.seasonNum === seasonNum);
                if (currentSeasonIndex > 0) {
                    const prevSeason = anime.episodes.seasons[currentSeasonIndex - 1];
                    if (prevSeason.episodes.length > 0) {
                        const lastEpOfPrevSeason = prevSeason.episodes[prevSeason.episodes.length - 1];
                        if (lastEpOfPrevSeason && lastEpOfPrevSeason.videoUrl && lastEpOfPrevSeason.videoUrl !== "#") {
                            prevEpisodeBtn.href = `watch-video.html?animeId=${animeId}&season=${prevSeason.seasonNum}&ep=${lastEpOfPrevSeason.epNumInSeason}`;
                            prevEpisodeBtn.classList.remove('disabled');
                        }
                    }
                }
            }

            const nextEpisodeBtn = document.getElementById('nextEpisodeBtn');
            nextEpisodeBtn.classList.add('disabled');
            nextEpisodeBtn.href = "#";
            if (currentEpisodeIndexInSeason < season.episodes.length - 1) {
                const nextEp = season.episodes[currentEpisodeIndexInSeason + 1];
                if (nextEp && nextEp.videoUrl && nextEp.videoUrl !== "#") {
                    nextEpisodeBtn.href = `watch-video.html?animeId=${animeId}&season=${season.seasonNum}&ep=${nextEp.epNumInSeason}`;
                    nextEpisodeBtn.classList.remove('disabled');
                }
            } else {
                const currentSeasonIndex = anime.episodes.seasons.findIndex(s => s.seasonNum === seasonNum);
                if (currentSeasonIndex < anime.episodes.seasons.length - 1) {
                    const nextSeason = anime.episodes.seasons[currentSeasonIndex + 1];
                    if (nextSeason.episodes.length > 0) {
                        const firstEpOfNextSeason = nextSeason.episodes[0];
                        if (firstEpOfNextSeason && firstEpOfNextSeason.videoUrl && firstEpOfNextSeason.videoUrl !== "#") {
                            nextEpisodeBtn.href = `watch-video.html?animeId=${animeId}&season=${nextSeason.seasonNum}&ep=${firstEpOfNextSeason.epNumInSeason}`;
                            nextEpisodeBtn.classList.remove('disabled');
                        }
                    }
                }
            }


        });
