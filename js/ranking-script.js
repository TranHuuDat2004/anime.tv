// js/ranking-script.js
document.addEventListener('DOMContentLoaded', function() {
    if (typeof animeData === 'undefined' || animeData.length === 0) {
        console.error("Không tìm thấy animeData hoặc animeData rỗng.");
        // Hiển thị thông báo lỗi trên trang
        const mainContent = document.getElementById('ranking-page');
        if (mainContent) {
            mainContent.innerHTML = '<div class="container"><p class="placeholder-text" style="text-align:center; padding: 50px;">Không có dữ liệu anime để hiển thị bảng xếp hạng.</p></div>';
        }
        return;
    }

    // Định nghĩa các hạng mục và key tương ứng trong data.js
    const rankingCategories = [
        { id: "overallFavoriteCategory", key: "overallFavorite", title: "Anime Yêu Thích Nhất" },
        { id: "mostRomanticCategory", key: "mostRomantic", title: "Anime Lãng Mạn Nhất" },
        { id: "mostEmotionalCategory", key: "mostEmotional", title: "Anime Nhiều Cảm Xúc Nhất" },
        { id: "bestActionCategory", key: "bestAction", title: "Anime Hành Động Hay Nhất" },
        { id: "bestArtDirectionCategory", key: "bestArtDirection", title: "Anime Có Art Direction Đẹp Nhất" },
        { id: "mostRelaxingCategory", key: "mostRelaxing", title: "Anime Thư Giãn Nhất" },
        // Thêm các hạng mục khác bạn đã định nghĩa trong HTML và data.js
    ];

    // Hàm tạo card anime (tái sử dụng từ script.js của index.html nếu có, hoặc định nghĩa lại)
    function createAnimeCard(anime, rank = null) {
        const card = document.createElement('div');
        card.className = 'anime-card'; // Sử dụng class chung

        // (Tùy chọn) Thêm badge xếp hạng
        if (rank !== null && typeof rank === 'number') {
            const rankBadge = document.createElement('span');
            rankBadge.className = 'rank-badge';
            rankBadge.textContent = rank;
            if (rank === 1) rankBadge.classList.add('top-1');
            else if (rank === 2) rankBadge.classList.add('top-2');
            else if (rank === 3) rankBadge.classList.add('top-3');
            card.appendChild(rankBadge);
        }


        const link = document.createElement('a');
        link.href = `anime-detail.html?id=${anime.id}`;

        const img = document.createElement('img');
        img.src = anime.posterImage || 'https://via.placeholder.com/200x300?text=Poster';
        img.alt = anime.title;
        img.loading = 'lazy';
        // Áp dụng aspect-ratio và object-fit từ CSS của .anime-card img
        link.appendChild(img);

        const overlay = document.createElement('div');
        overlay.className = 'anime-card-overlay';
        const playIcon = document.createElement('span');
        playIcon.className = 'play-icon';
        playIcon.innerHTML = '►'; // Hoặc icon khác
        overlay.appendChild(playIcon);
        link.appendChild(overlay);
        card.appendChild(link);

        const titleLink = document.createElement('a');
        titleLink.href = `anime-detail.html?id=${anime.id}`;
        const titleH3 = document.createElement('h3');
        // titleH3.className = 'anime-card-title'; // Nếu có class riêng
        titleH3.appendChild(titleLink);
        titleLink.textContent = anime.title;
        card.appendChild(titleH3);

        const infoP = document.createElement('p');
        // infoP.className = 'anime-card-info'; // Nếu có class riêng
        let infoText = anime.type || '';
        if (anime.episodes && anime.episodes.total) {
             infoText += (infoText ? ' • ' : '') + (typeof anime.episodes.total === 'number' ? `${anime.episodes.total} Tập` : anime.episodes.total);
        }
        infoP.textContent = infoText || 'N/A';
        card.appendChild(infoP);

        return card;
    }


    rankingCategories.forEach(category => {
        const categoryContainer = document.getElementById(category.id);
        if (categoryContainer) {
            const grid = categoryContainer.querySelector('.anime-grid.ranking-grid');
            if (grid) {
                // Lọc và sắp xếp anime cho hạng mục này
                const rankedAnime = animeData
                    .filter(anime => anime.rankings && anime.rankings[category.key] !== undefined)
                    .sort((a, b) => {
                        // Sắp xếp theo giá trị rank (giả sử là số)
                        const rankA = typeof a.rankings[category.key] === 'number' ? a.rankings[category.key] : Infinity;
                        const rankB = typeof b.rankings[category.key] === 'number' ? b.rankings[category.key] : Infinity;
                        return rankA - rankB;
                    });

                if (rankedAnime.length > 0) {
                    rankedAnime.forEach(anime => {
                        const rankValue = anime.rankings[category.key];
                        const card = createAnimeCard(anime, typeof rankValue === 'number' ? rankValue : null);
                        grid.appendChild(card);
                    });
                } else {
                    grid.innerHTML = '<p class="placeholder-text">Chưa có anime nào trong bảng xếp hạng này.</p>';
                }
            }
        }
    });
});