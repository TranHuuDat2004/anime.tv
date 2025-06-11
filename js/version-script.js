// js/version-script.js
document.addEventListener('DOMContentLoaded', () => {
    const timelineContainer = document.getElementById('commit-timeline');
    const loadingMessage = document.getElementById('loading-commits');
    const GITHUB_USER = 'TranHuuDat2004';
    const GITHUB_REPO = 'anime.tv';
    const GITHUB_BRANCH = 'main';
    const COMMITS_API_URL = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/commits?sha=${GITHUB_BRANCH}&per_page=100`; // Lấy nhiều commit hơn

    async function fetchCommits() {
        try {
            const response = await fetch(COMMITS_API_URL);
            if (!response.ok) {
                throw new Error(`Lỗi khi lấy dữ liệu: ${response.status} ${response.statusText}`);
            }
            const commits = await response.json();
            if (loadingMessage) loadingMessage.remove();
            if (commits && commits.length > 0) {
                displayCommitsByDate(commits);
            } else {
                timelineContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary-color);">Không có commit nào để hiển thị.</p>';
            }
        } catch (error) {
            console.error('Lỗi khi fetch commits:', error);
            if (loadingMessage) loadingMessage.remove();
            timelineContainer.innerHTML = `<p style="text-align: center; color: red;">Không thể tải lịch sử commit. Lỗi: ${error.message}</p>`;
        }
    }

    function formatDate(dateString, type = 'full') {
        const date = new Date(dateString);
        if (type === 'dateOnly') {
            return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
        }
        // Mặc định là full date time
        return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }

    function displayCommitsByDate(commits) {
        timelineContainer.innerHTML = '';
        const commitsGroupedByDate = commits.reduce((acc, commitData) => {
            const commitDateString = formatDate(commitData.commit.author.date, 'dateOnly');
            if (!acc[commitDateString]) {
                acc[commitDateString] = [];
            }
            acc[commitDateString].push(commitData);
            return acc;
        }, {});

        let itemIndex = 0;
        for (const dateKey in commitsGroupedByDate) {
            const dailyCommits = commitsGroupedByDate[dateKey];

            const dailyTimelineItem = document.createElement('div');
            dailyTimelineItem.className = 'timeline-item daily-commit-group';
            if (itemIndex % 2 !== 0 && window.innerWidth > 767) { // Chỉ đảo ngược trên màn hình lớn
                dailyTimelineItem.classList.add('timeline-inverted');
            }

            const timelineBadge = document.createElement('div');
            timelineBadge.className = 'timeline-badge primary';
            // timelineBadge.innerHTML = `<i class="bi bi-calendar-check"></i>`;

            const dailyPanel = document.createElement('div');
            dailyPanel.className = 'timeline-panel';

            const dailyHeading = document.createElement('div');
            dailyHeading.className = 'timeline-heading daily-date-header';
            dailyHeading.innerHTML = `<h3 class="timeline-title"><i class="bi bi-calendar3 me-2"></i>Commits vào Ngày ${dateKey}</h3>`;
            dailyPanel.appendChild(dailyHeading);

            const dailyBody = document.createElement('div');
            dailyBody.className = 'timeline-body';

            dailyCommits.forEach(commitData => {
                const commit = commitData.commit;
                const commitEntryDiv = document.createElement('div'); // Đổi tên biến này
                commitEntryDiv.className = 'commit-entry';

                // --- THAY ĐỔI CHÍNH Ở ĐÂY ---
                const commitHeaderDiv = document.createElement('div');
                commitHeaderDiv.className = 'commit-header'; // Class mới cho header của commit

                // Link cho commit message
                const titleLink = document.createElement('a');
                titleLink.href = commitData.html_url;
                titleLink.target = '_blank';
                titleLink.rel = 'noopener noreferrer';
                titleLink.className = 'commit-message-link';

                const titleH4 = document.createElement('h4');
                titleH4.className = 'commit-message';
                titleH4.textContent = commit.message.split('\n')[0];
                titleLink.appendChild(titleH4);
                commitHeaderDiv.appendChild(titleLink); // Thêm link tiêu đề vào commitHeaderDiv

                // Thông tin meta (tác giả, thời gian)
                const commitMeta = document.createElement('div'); // Dùng div thay vì p để dễ style hơn
                commitMeta.className = 'commit-meta'; // Class mới
                commitMeta.innerHTML = `
                <span class="commit-author"><i class="bi bi-person-fill"></i> ${commit.author.name}</span>
                <span class="commit-time"><i class="bi bi-clock-fill"></i> lúc ${new Date(commit.author.date).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
            `;
                commitHeaderDiv.appendChild(commitMeta); // Thêm meta vào commitHeaderDiv

                commitEntryDiv.appendChild(commitHeaderDiv); // Thêm commitHeaderDiv vào commitEntryDiv
                // --- KẾT THÚC THAY ĐỔI ---

                // Hiển thị chi tiết commit (các dòng sau của message) nếu có
            const messageLines = commit.message.split('\n');
            if (messageLines.length > 1) {
                const detailsUl = document.createElement('ul');
                detailsUl.className = 'version-changes commit-details-list';
                for (let i = 1; i < messageLines.length; i++) {
                    if (messageLines[i].trim() !== '') {
                        const li = document.createElement('li');
                        li.textContent = messageLines[i];
                        detailsUl.appendChild(li);
                    }
                }
                if (detailsUl.hasChildNodes()) {
                    // Thêm một dòng kẻ nhẹ hoặc khoảng cách trước danh sách chi tiết
                    const separator = document.createElement('hr');
                    separator.className = 'commit-details-separator';
                    commitEntryDiv.appendChild(separator);
                    commitEntryDiv.appendChild(detailsUl);
                }
            }
            dailyBody.appendChild(commitEntryDiv);
        });

            dailyPanel.appendChild(dailyBody);
            dailyTimelineItem.appendChild(timelineBadge);
            dailyTimelineItem.appendChild(dailyPanel);
            timelineContainer.appendChild(dailyTimelineItem);
            itemIndex++;
        }
    }
    fetchCommits();
});

