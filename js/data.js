// data.js
const animeData = [
    // {
    //     id: "one-piece",
    //     title: "One Piece",
    //     altTitle: "ワンピース",
    //     posterImage: "https://m.media-amazon.com/images/M/MV5BODVmMDYWZTQtYTM3ZC00N2Q5LWJmNGYtOTM3Y2Y2Y2FhYzZlXkEyXkFqcGdeQXVyMTA1OTcyNDQ4._V1_FMjpg_UX1000_.jpg",
    //     bannerImage: "https://img.vn/uploads/version/img24/2024/03/one-piece-poster-1710211513.png",
    //     logoImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/One_Piece_Logo.svg/1200px-One_Piece_Logo.svg.png",
    //     description: "Gol D. Roger được biết đến với cái tên Vua Hải Tặc, người mạnh nhất và khét tiếng nhất từng dong buồm trên Grand Line...", // (Giữ nguyên mô tả dài của bạn)
    //     genres: ["Action", "Adventure", "Comedy", "Super Power", "Drama", "Fantasy", "Shounen"],
    //     rating: "14+",
    //     type: "Series",
    //     status: "Đang chiếu",
    //     releaseYear: 1999,
    //     episodes: {
    //         total: "Ongoing",
    //         availableOnSite: 100, // Cập nhật nếu cần
    //         seasons: [
    //             {
    //                 seasonNum: 13,
    //                 seasonTitle: "Wano Country Arc (Part 2)",
    //                 episodes: [
    //                     { epNumOverall: 892, epNumInSeason: 1, title: "Đất Nước Wano! Đến Vùng Đất Hoa Anh Đào Nơi Samurai Tung Hoành", thumbnail: "https://img1.ak.crunchyroll.com/i/spire2/3e79f95f837f25250d1a9f73cdd830031561831991_full.jpg", duration: "24 min", videoUrl: "#", sub: true, dub: false },
    //                     { epNumOverall: 1097, epNumInSeason: 206, title: "Ý Chí Của Ohara! Nghiên Cứu Kế Thừa.", thumbnail: "https://img1.ak.crunchyroll.com/i/spire3/8f52a995683a8c3f1941e1d109cf92191710006646_full.jpg", duration: "24 min", videoUrl: "#", sub: true, dub: false },
    //                 ]
    //             }
    //         ]
    //     },
    //     crunchyrollTags: ["Sub | Dub", "Action", "Adventure", "Fantasy", "Shonen"],
    //     relatedAnime: [
    //         { id: "one-piece-film-red", title: "One Piece Film: Red", posterImage: "https://upload.wikimedia.org/wikipedia/vi/6/6a/One_Piece_Film_Red_2022_Poster.jpg" }
    //     ]
    // },
    // {
    //     id: "jujutsu-kaisen",
    //     title: "Jujutsu Kaisen",
    //     altTitle: "呪術廻戦",
    //     posterImage: "https://m.media-amazon.com/images/M/MV5BNGY4MTg3NzgtMmFkZi00NTg5LWExMmEtMWI3YzI1ODdmMWQ1XkEyXkFqcGdeQXVyMjQwMDg0MDU@._V1_FMjpg_UX1000_.jpg",
    //     bannerImage: "https://cdn.crunchyroll.com/fms/landscape_poster/1920x1080/100/png/c03948f2-079f-4988-a790-a977f50d25a8.webp",
    //     logoImage: "https://upload.wikimedia.org/wikipedia/commons/4/46/Jujutsu_kaisen_logo.png",
    //     description: "Yuji Itadori là một học sinh trung học có năng khiếu thể chất bẩm sinh...", // (Giữ nguyên mô tả dài của bạn)
    //     genres: ["Action", "Dark Fantasy", "Supernatural", "School"],
    //     rating: "17+",
    //     type: "Series",
    //     status: "Đang chiếu (Season 2)",
    //     releaseYear: 2020,
    //     episodes: {
    //         total: "Ongoing",
    //         availableOnSite: 47,
    //          seasons: [
    //             {
    //                 seasonNum: 1,
    //                 seasonTitle: "Season 1",
    //                 episodes: [
    //                     { epNumOverall: 1, epNumInSeason: 1, title: "Ryomen Sukuna", thumbnail: "https://img1.ak.crunchyroll.com/i/spire4/d68c400053ebf7de3f75148f0904c0211601612208_full.jpg", duration: "24 min", videoUrl: "#", sub: true, dub: true },
    //                 ]
    //             },
    //             {
    //                 seasonNum: 2,
    //                 seasonTitle: "Season 2 - Shibuya Incident",
    //                 episodes: [
    //                      { epNumOverall: 25, epNumInSeason: 1, title: "Hidden Inventory", thumbnail: "https://img1.ak.crunchyroll.com/i/spire2/3a13587f854e965264d7724c8c953a9a1688609080_full.jpg", duration: "24 min", videoUrl: "#", sub: true, dub: true },
    //                 ]
    //             }
    //         ]
    //     },
    //     crunchyrollTags: ["Sub | Dub", "Action", "Dark Fantasy", "Supernatural"],
    //     relatedAnime: []
    // },
    { // ANIME: THIÊN SỨ NHÀ BÊN
        id: "thien-su-nha-ben",
        title: "Thiên Sứ Nhà Bên",
        altTitle: "Otonari no Tenshi-sama ni Itsunomanika Dame Ningen ni Sareteita Ken",
        posterImage: "images/thien-su-nha-ben/poster.webp", // Bạn có thể tìm poster phù hợp sau
        bannerImage: "images/thien-su-nha-ben/mahiru_banner.webp", // Bạn có thể tìm banner phù hợp sau
        logoImage: "images/thien-su-nha-ben/logo.webp", // Logo (nếu có)
        description: "Amane Fujimiya là một học sinh trung học bình thường, sống một mình trong một căn hộ. Hàng xóm của cậu là Mahiru Shiina, một cô gái xinh đẹp và nổi tiếng nhất trường, được mệnh danh là \"Thiên thần\". Một ngày mưa, Amane bắt gặp Mahiru ngồi một mình dưới mưa và đã cho cô mượn ô của mình. Từ đó, mối quan hệ giữa hai người bắt đầu thay đổi, Mahiru thường xuyên đến nhà Amane để chăm sóc và nấu ăn cho cậu, dần dần biến Amane từ một người sống luộm thuộm trở thành một \"con người vô dụng\" theo một cách đáng yêu.",
        genres: ["Slice of Life", "Romance", "Comedy", "School"],
        rankings: { // THÊM PHẦN NÀY
            mostRomantic: 1, // Ví dụ: Số 1 cho hạng mục "Lãng mạn nhất"
            mostEmotional: 4,
            overallFavorite: 2 // Ví dụ: Anime yêu thích tổng thể thứ 2
            // Bạn có thể dùng số (1, 2, 3...) hoặc text ("Top 1", "Top 5", "Đề cử")
        },
        rating: "13+",
        type: "Series",
        status: "Hoàn thành",
        releaseYear: 2023,
        episodes: {
            total: 12,
            availableOnSite: 12,
            seasons: [
                {
                    seasonNum: 1,
                    seasonTitle: "Season 1",
                    episodes: [
                        { epNumOverall: 1, epNumInSeason: 1, title: "Thiên Sứ Nhà Bên Tập 1", thumbnail: "images/thien-su-nha-ben/tap1.png", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331386?h=12d2ec3524&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 2, epNumInSeason: 2, title: "Thiên Sứ Nhà Bên Tập 2", thumbnail: "images/thien-su-nha-ben/tap2.png", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331424?h=a8b64a2057&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 3, epNumInSeason: 3, title: "Thiên Sứ Nhà Bên Tập 3", thumbnail: "images/thien-su-nha-ben/tap3.png", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331480?h=79adb09f65&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 4, epNumInSeason: 4, title: "Thiên Sứ Nhà Bên Tập 4", thumbnail: "images/thien-su-nha-ben/tap4.png", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331498?h=b042e0a3c1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 5, epNumInSeason: 5, title: "Thiên Sứ Nhà Bên Tập 5", thumbnail: "images/thien-su-nha-ben/tap5.png", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331516?h=c4594f7dee&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 6, epNumInSeason: 6, title: "Thiên Sứ Nhà Bên Tập 6", thumbnail: "images/thien-su-nha-ben/tap6.png", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331530?h=1f50d3ad44&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 7, epNumInSeason: 7, title: "Thiên Sứ Nhà Bên Tập 7", thumbnail: "images/thien-su-nha-ben/tap7.png", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331551?h=eacaeed8dc&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 8, epNumInSeason: 8, title: "Thiên Sứ Nhà Bên Tập 8", thumbnail: "images/thien-su-nha-ben/tap8.png", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331573?h=3a57303702&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 9, epNumInSeason: 9, title: "Thiên Sứ Nhà Bên Tập 9", thumbnail: "images/thien-su-nha-ben/tap9.png", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331596?h=018efcc4b7&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 10, epNumInSeason: 10, title: "Thiên Sứ Nhà Bên Tập 10", thumbnail: "images/thien-su-nha-ben/tap10.png", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331623?h=e4cb653ab9&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 11, epNumInSeason: 11, title: "Thiên Sứ Nhà Bên Tập 11", thumbnail: "images/thien-su-nha-ben/tap11.png", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331636?h=8bdf60bbbc&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 12, epNumInSeason: 12, title: "Thiên Sứ Nhà Bên Tập 12", thumbnail: "images/thien-su-nha-ben/tap12.png", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331655?h=aadfc2f94b&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false }
                    ]
                }
            ]
        },
        crunchyrollTags: ["Sub", "Slice of Life", "Romance", "Comedy"],
        relatedAnime: []
    },
    { // ANIME MỚI: YOUR NAME
        id: "your-name", // URL-friendly ID
        title: "Your Name.",
        altTitle: "Kimi no Na wa. (君の名は。)",
        posterImage: "images/your-name/your-name.jpg", // Bạn có thể tìm poster phù hợp sau
        bannerImage: "images/your-name/your-name-banner.jpg", // Bạn có thể tìm poster phù hợp sau
        logoImage: "images/your-name/logo.svg", // Logo (nếu có)
        description: "Mitsuha Miyamizu, một nữ sinh trung học ở một vùng nông thôn buồn tẻ, mơ ước cuộc sống nhộn nhịp ở Tokyo. Taki Tachibana, một nam sinh trung học ở Tokyo, làm thêm tại một nhà hàng Ý và khao khát trở thành kiến trúc sư hoặc nghệ sĩ. Một ngày nọ, hai người đột nhiên hoán đổi cơ thể cho nhau. Họ phải tìm cách thích nghi với cuộc sống mới và giao tiếp qua những ghi chú. Khi họ bắt đầu hiểu nhau hơn, một sự kiện bất ngờ xảy ra và mối liên kết của họ bị thử thách.",
        genres: ["Drama", "Romance", "Supernatural", "School"],
        rankings: {
            mostEmotional: 1, // Ví dụ: Số 1 cho "Cảm xúc nhất"
            bestArtDirection: 1,
            overallFavorite: 1
        },
        rating: "PG-13", // Ước lượng
        type: "Movie", // Đây là phim lẻ
        status: "Hoàn thành",
        releaseYear: 2016,
        episodes: {
            total: 1, // Phim lẻ có 1 "tập"
            availableOnSite: 1,
            seasons: [
                {
                    seasonNum: 1, // Coi như season 1
                    seasonTitle: "Movie", // Để trống cho phim lẻ
                    episodes: [
                        // {
                        //     epNumOverall: 1, epNumInSeason: 1, title: "Your Name. (Dub)", // Tiêu đề dựa trên iframe
                        //     thumbnail: "images/your-name/your-name-banner.webp", // Lấy thumbnail từ Vimeo nếu có, hoặc placeholder
                        //     duration: "1 hr 46 min", // Thời lượng phim        
                        //     videoUrl: "https://player.vimeo.com/video/1092110907?h=dffe7a185f&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
                        //     sub: false, // Dựa trên title "Dub"
                        //     dub: true
                        // }
                    ]
                }
            ]
        },
        crunchyrollTags: ["Dub", "Drama", "Romance", "Supernatural"],
        relatedAnime: [
            { id: "weathering-with-you", title: "Weathering With You", posterImage: "https://m.media-amazon.com/images/M/MV5BNzE4ZWRhNTgtYjQ4Mi00鮮やかでYTMwLTliZTY1YmQ0MTM0L2ltYWdlXkEyXkFqcGdeQXVyNzYxODU5OQ@@._V1_.jpg" } // Ví dụ
        ]
    },

    { // ANIME MỚI: WEATHERING WITH YOU
        id: "weathering-with-you", // URL-friendly ID
        title: "Weathering With You",
        altTitle: "Tenki no Ko (天気の子)",
        posterImage: "images/weathering-with-you/weathering-with-you-poster.jpg", // Bạn có thể tìm poster phù hợp sau
        bannerImage: "images/weathering-with-you/weathering-with-you-banner.jpg", // Bạn có thể tìm poster phù hợp sau
        logoImage: "images/weathering-with-you/logo.webp", // Logo (nếu có)
        description: "Hodaka Morishima, một nam sinh trung học, bỏ nhà ở một hòn đảo xa xôi để đến Tokyo. Cậu nhanh chóng rơi vào cảnh túng thiếu và tìm được việc làm tại một tạp chí nhỏ chuyên viết về những điều huyền bí. Một ngày nọ, Hodaka gặp Hina Amano, một cô gái có khả năng kỳ diệu: điều khiển thời tiết. Cùng nhau, họ bắt đầu một công việc kinh doanh \"cô gái nắng\" để mang lại ánh nắng cho mọi người, nhưng sức mạnh của Hina lại đi kèm với một cái giá.",
        genres: ["Drama", "Fantasy", "Romance", "Slice of Life"],
        rankings: {
            mostEmotional: 3,
            bestArtDirection: 2
        },
        rating: "PG-13", // Ước lượng
        type: "Movie", // Đây là phim lẻ
        status: "Hoàn thành",
        releaseYear: 2019,
        episodes: {
            total: 1, // Phim lẻ có 1 "tập"
            availableOnSite: 1,
            seasons: [
                {
                    seasonNum: 1, // Coi như season 1
                    seasonTitle: "Movie", // Để trống cho phim lẻ
                    episodes: [
                        // {
                        //     epNumOverall: 1, epNumInSeason: 1, title: "Weathering With You (Dub)", // Tiêu đề dựa trên iframe
                        //     thumbnail: "images/weathering-with-you/weathering-with-you-banner.webp", // Lấy thumbnail từ Vimeo nếu có, hoặc placeholder
                        //     duration: "1 hr 52 min", // Thời lượng phim
                        //     videoUrl: "https://player.vimeo.com/video/1092110790?h=5e30f6ffb7&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
                        //     sub: false, // Dựa trên title "Dub"
                        //     dub: true
                        // }
                    ]
                }
            ]
        },
        crunchyrollTags: ["Dub", "Drama", "Fantasy", "Romance"],
        relatedAnime: [
            { id: "your-name", title: "Your Name.", posterImage: "https://m.media-amazon.com/images/M/MV5BODRmZDVmNzUtZDA4ZC00NjhkLWI2M2UtN2M0ZDIzNDcxYThjL2ltYWdlXkEyXkFqcGdeQXVyNTk0MzMzODA@._V1_FMjpg_UX1000_.jpg" }
        ]
    },

    { // ANIME MỚI: Spy x Family
        id: "spy-x-family", // Giữ ID này nếu bạn đã dùng cho manga
        title: "Spy x Family", // Phân biệt với manga nếu cần
        altTitle: "SPYxFAMILY (スパイファミリー) Anime",
        posterImage: "images/spy-x-family/poster.jpg", // Ảnh bìa anime
        bannerImage: "images/spy-x-family/banner.jpeg", // Ảnh banner anime
        logoImage: "images/spy-x-family/logo.png", // Có thể dùng chung logo
        description: "Để duy trì hòa bình, điệp viên hàng đầu \"Twilight\" phải thực hiện nhiệm vụ khó khăn nhất của mình: lập một gia đình giả. Anh nhận nuôi Anya, một nhà ngoại cảm, và kết hôn với Yor, một sát thủ, mà không ai biết bí mật của người kia, trừ Anya. Họ phải đóng vai một gia đình hoàn hảo để tiếp cận mục tiêu quan trọng.",
        genres: ["Action", "Comedy", "Shounen", "Slice of Life"],
        rating: "PG-13",
        type: "Series",
        status: "Đang chiếu", // Hoặc tùy theo season bạn muốn tập trung
        releaseYear: 2022, // Năm bắt đầu chiếu anime
        episodes: { total: "Ongoing", availableOnSite: 0, seasons: [] }, // Cập nhật thông tin tập
        rankings: {
            bestComedy: 2,
            overallFavorite: 5,
            bestAction: 2 // Có những pha hành động thú vị
        },
        crunchyrollTags: ["Sub | Dub", "Action", "Comedy"],
        relatedAnime: []
    },



    { // ANIME MỚI: SUMMER POCKETS REFLECTION BLUE (Ví dụ)
        id: "summer-pockets",
        title: "Summer Pockets ",
        altTitle: "サマーポケッツ リフレクションブルー", // Tên tiếng Nhật nếu có
        posterImage: "images/summer-pockets/summer-pockets-anime-vietsub.png", // Cần ảnh poster
        bannerImage: "images/summer-pockets/banner2.webp", // Cần ảnh banner
        logoImage: "images/summer-pockets/logo.png",   // Cần ảnh logo (nếu có)
        description: "Hairi Takahara đến hòn đảo Torishirojima để sắp xếp tài sản của người bà quá cố. Tại đây, cậu gặp gỡ những cô gái và trải qua một mùa hè không thể nào quên, khám phá những bí mật của hòn đảo và tìm kiếm những ký ức mùa hè đã mất.",
        genres: ["Slice of Life", "Drama", "Romance", "Visual Novel"],
        rankings: {
            mostRelaxing: 2, // Ví dụ: Anime thư giãn nhất
            mostEmotional: 5
        },
        rating: "PG-13", // Ước lượng
        type: "Series",
        status: "Đang chiếu", // Anime đang chiếu
        releaseYear: 2025, // Năm phát hành anime (GIẢ ĐỊNH, bạn cần thay thế bằng năm thực tế)
        episodes: {
            // total: "Ongoing" hoặc 14 + 12 = 26 nếu bạn muốn hiển thị tổng dự kiến
            total: "Ongoing (S1: 14, S2: 12)",
            availableOnSite: 11, // Hiện tại có link đến tập 11 của Season 1
            seasons: [
                // {
                //     seasonNum: 1,
                //     seasonTitle: "Season 1",
                //     episodes: [
                //         { epNumOverall: 1, epNumInSeason: 1, title: "Tập 1", thumbnail: "images/summer-pockets/s1/ep1.jpg", duration: "24 min", videoUrl: "LINK_VIMEO_HOAC_YOUTUBE_TAP_1", sub: true, dub: false },
                //         { epNumOverall: 2, epNumInSeason: 2, title: "Tập 2", thumbnail: "images/summer-pockets/s1/ep2.jpg", duration: "24 min", videoUrl: "LINK_VIMEO_HOAC_YOUTUBE_TAP_2", sub: true, dub: false },
                //         { epNumOverall: 3, epNumInSeason: 3, title: "Tập 3", thumbnail: "images/summer-pockets/s1/ep3.jpg", duration: "24 min", videoUrl: "LINK_VIMEO_HOAC_YOUTUBE_TAP_3", sub: true, dub: false },
                //         { epNumOverall: 4, epNumInSeason: 4, title: "Tập 4", thumbnail: "images/summer-pockets/s1/ep4.jpg", duration: "24 min", videoUrl: "LINK_VIMEO_HOAC_YOUTUBE_TAP_4", sub: true, dub: false },
                //         { epNumOverall: 5, epNumInSeason: 5, title: "Tập 5", thumbnail: "images/summer-pockets/s1/ep5.jpg", duration: "24 min", videoUrl: "LINK_VIMEO_HOAC_YOUTUBE_TAP_5", sub: true, dub: false },
                //         { epNumOverall: 6, epNumInSeason: 6, title: "Tập 6", thumbnail: "images/summer-pockets/s1/ep6.jpg", duration: "24 min", videoUrl: "LINK_VIMEO_HOAC_YOUTUBE_TAP_6", sub: true, dub: false },
                //         { epNumOverall: 7, epNumInSeason: 7, title: "Tập 7", thumbnail: "images/summer-pockets/s1/ep7.jpg", duration: "24 min", videoUrl: "LINK_VIMEO_HOAC_YOUTUBE_TAP_7", sub: true, dub: false },
                //         { epNumOverall: 8, epNumInSeason: 8, title: "Tập 8", thumbnail: "images/summer-pockets/s1/ep8.jpg", duration: "24 min", videoUrl: "LINK_VIMEO_HOAC_YOUTUBE_TAP_8", sub: true, dub: false },
                //         { epNumOverall: 9, epNumInSeason: 9, title: "Tập 9", thumbnail: "images/summer-pockets/s1/ep9.jpg", duration: "24 min", videoUrl: "LINK_VIMEO_HOAC_YOUTUBE_TAP_9", sub: true, dub: false },
                //         { epNumOverall: 10, epNumInSeason: 10, title: "Tập 10", thumbnail: "images/summer-pockets/s1/ep10.jpg", duration: "24 min", videoUrl: "LINK_VIMEO_HOAC_YOUTUBE_TAP_10", sub: true, dub: false },
                //         { epNumOverall: 11, epNumInSeason: 11, title: "Tập 11", thumbnail: "images/summer-pockets/s1/ep11.jpg", duration: "24 min", videoUrl: "LINK_VIMEO_HOAC_YOUTUBE_TAP_11", sub: true, dub: false },
                //         // Các tập chưa có link
                //         { epNumOverall: 12, epNumInSeason: 12, title: "Tập 12: (Chưa phát sóng)", thumbnail: "images/summer-pockets/s1/ep12_placeholder.jpg", duration: "24 min", videoUrl: "#", sub: true, dub: false },
                //         { epNumOverall: 13, epNumInSeason: 13, title: "Tập 13: (Chưa phát sóng)", thumbnail: "images/summer-pockets/s1/ep13_placeholder.jpg", duration: "24 min", videoUrl: "#", sub: true, dub: false },
                //         { epNumOverall: 14, epNumInSeason: 14, title: "Tập 14: (Chưa phát sóng)", thumbnail: "images/summer-pockets/s1/ep14_placeholder.jpg", duration: "24 min", videoUrl: "#", sub: true, dub: false }
                //     ]
                // },
                // {
                //     seasonNum: 2,
                //     seasonTitle: "Season 2",
                //     episodes: [
                //         // 12 tập của season 2, hiện tại đều là placeholder
                //         { epNumOverall: 15, epNumInSeason: 1, title: "S2 Tập 1: (Chưa phát sóng)", thumbnail: "images/summer-pockets/s2/ep1_placeholder.jpg", duration: "24 min", videoUrl: "#", sub: true, dub: false },
                //         // ... (thêm placeholder cho đến tập 12 của season 2) ...
                //         { epNumOverall: 26, epNumInSeason: 12, title: "S2 Tập 12: (Chưa phát sóng)", thumbnail: "images/summer-pockets/s2/ep12_placeholder.jpg", duration: "24 min", videoUrl: "#", sub: true, dub: false }
                //     ]
                // }
            ]
        },
        crunchyrollTags: ["Sub", "Slice of Life", "Drama", "Romance"], // Các tag phù hợp
        relatedAnime: [] // (Tùy chọn)
    },

    // ... (Dữ liệu Thiên Sứ Nhà Bên, Your Name, Weathering With You, Blue Archive, Summer Pockets đã có) ...

    { // ANIME MỚI: Seishun Buta Yarou (Hội Chứng Tuổi Thanh Xuân)
        id: "seishun-buta-yarou",
        title: "Hội Chứng Tuổi Thanh Xuân",
        altTitle: "Seishun Buta Yarou wa Bunny Girl Senpai no Yume wo Minai (青春ブタ野郎はバニーガール先輩の夢を見ない)",
        posterImage: "images/seishun-buta-yarou/poster.jpg", // Cần ảnh
        bannerImage: "images/seishun-buta-yarou/banner.jpg", // Cần ảnh
        logoImage: "", // Optional
        description: "Sakuta Azusagawa, một học sinh trung học, bất ngờ gặp Mai Sakurajima, một đàn chị nổi tiếng và là diễn viên, đang lang thang trong thư viện trong bộ đồ thỏ bunny mà không ai khác nhìn thấy. Sakuta khám phá ra Mai đang mắc phải \"Hội chứng tuổi vị thành niên\", một hiện tượng siêu nhiên bí ẩn ảnh hưởng đến những người trẻ tuổi. Cậu quyết định giúp Mai và dần dần khám phá ra nhiều trường hợp tương tự xung quanh mình.",
        genres: ["Supernatural", "Romance", "Drama", "School", "Slice of Life"],
        rating: "PG-13",
        type: "Series", // Giả sử là series TV
        status: "Hoàn thành", // (Hoặc đang có phần mới)
        releaseYear: 2018, // Năm của series TV chính
        episodes: { /* ... (Điền thông tin tập nếu có) ... */ total: 13, availableOnSite: 0, seasons: [] },
        rankings: {
            mostEmotional: 2, // Ví dụ
            mostRomantic: 2,
            overallFavorite: 4
        },
        crunchyrollTags: ["Sub", "Supernatural", "Romance", "Drama"],
        relatedAnime: []
    },

    { // ANIME MỚI: Lycoris Recoil
        id: "lycoris-recoil",
        title: "Lycoris Recoil",
        altTitle: "リコリス・リコイル",
        posterImage: "images/lycoris-recoil/poster.webp", // Cần ảnh
        bannerImage: "images/lycoris-recoil/banner2.jpg", // Cần ảnh
        logoImage: "images/lycoris-recoil/logo.png", // Cần ảnh logo (nếu có)
        description: "Tại quán cà phê LycoReco theo phong cách Nhật Bản, các đơn đặt hàng không chỉ dừng lại ở cà phê ngon và đồ ngọt. Từ việc giao hàng đến chăm sóc trẻ em, đọc truyện hay dạy tiếng Nhật, quán cà phê này có thể đáp ứng mọi yêu cầu! Tuy nhiên, đằng sau vẻ ngoài bình thường là một tổ chức bí mật gồm các nữ điệp viên được gọi là \"Lycoris\", chuyên thực hiện các nhiệm vụ tiêu diệt tội phạm và khủng bố để giữ gìn hòa bình cho Nhật Bản. Chisato Nishikigi, một Lycoris tự do và tài năng, cùng với Takina Inoue, một Lycoris nghiêm túc bị điều chuyển, làm việc cùng nhau tại LycoReco.",
        genres: ["Action", "Slice of Life", "Girls with Guns"],
        rating: "PG-13",
        type: "Series",
        status: "Hoàn thành",
        releaseYear: 2022,
        episodes: { total: 13, availableOnSite: 0, seasons: [] },
        rankings: {
            bestAction: 1,
            cutestCharacters: 1 // Chisato & Takina
        },
        crunchyrollTags: ["Sub | Dub", "Action", "Slice of Life"],
        relatedAnime: []
    },

    { // ANIME MỚI: Shikanoko Nokonoko Koshitantan (My Deer Friend Nokotan)
        id: "nokotan-my-deer",
        title: "My Deer Friend Nokotan",
        altTitle: "しかのこのこのここしたんたん",
        posterImage: "images/nokotan/poster.jpg", // Cần ảnh
        bannerImage: "images/nokotan/banner.jpg", // Cần ảnh
        logoImage: "",
        description: "Koshi Torako là một nữ sinh trung học nổi tiếng, xinh đẹp và luôn cố gắng giữ hình tượng hoàn hảo. Tuy nhiên, cuộc sống của cô bị đảo lộn khi một học sinh chuyển trường bí ẩn tên Shikanoko Noko (biệt danh Nokotan) xuất hiện với cặp sừng hươu trên đầu và những hành động kỳ quặc. Nokotan bằng cách nào đó biết được quá khứ du côn của Torako và bắt đầu đeo bám cô, kéo theo vô số tình huống dở khóc dở cười.",
        genres: ["Comedy", "School", "Slice of Life", "Gag Humor"],
        rating: "PG-13",
        type: "Series", // Giả sử là series TV (sắp ra mắt hoặc đã có manga)
        status: "Đang chiếu", // Hoặc "Sắp chiếu"
        releaseYear: 2024, // Năm anime dự kiến
        episodes: { total: "Ongoing", availableOnSite: 0, seasons: [] },
        rankings: {
            mostRelaxing: 1, // Ví dụ: Anime thư giãn nhất
            bestComedy: 1, // Ví dụ
            mostAnticipated: 3
        },
        crunchyrollTags: ["Sub", "Comedy", "School"],
        relatedAnime: []
    },

    { // ANIME MỚI: Bocchi the Rock!
        id: "bocchi-the-rock",
        title: "Bocchi the Rock!",
        altTitle: "ぼっち・ざ・ろっく!",
        posterImage: "images/bocchi-the-rock/poster.jpg", // Cần ảnh
        bannerImage: "images/bocchi-the-rock/banner1.webp", // Cần ảnh1
        logoImage: "images/bocchi-the-rock/logo.png",
        description: "Hitori Gotoh, biệt danh \"Bocchi-chan\", là một nữ sinh trung học mắc chứng sợ xã hội cực độ, ước mơ được nổi tiếng và kết bạn thông qua việc chơi guitar. Dù kỹ năng guitar của cô rất cừ (khi chơi một mình và đăng video ẩn danh lên mạng), cô lại không thể chơi trước mặt người khác. Mọi thứ thay đổi khi cô tình cờ gặp Nijika Ijichi, một tay trống đang tìm kiếm một guitarist cho ban nhạc Kessoku Band của mình.",
        genres: ["Slice of Life", "Comedy", "Music", "School"],
        rating: "PG-13",
        type: "Series",
        status: "Hoàn thành", // Season 1
        releaseYear: 2022,
        episodes: { total: 12, availableOnSite: 0, seasons: [] },
        rankings: {
            bestSliceOfLife: 1,
            bestMusic: 1,
            overallFavorite: 3
        },
        crunchyrollTags: ["Sub | Dub", "Slice of Life", "Music", "Comedy"],
        relatedAnime: []
    },

    { // ANIME MỚI: Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san (Roshidere)
        id: "roshidere",
        title: "Alya Sometimes Hides Her Feelings in Russian",
        altTitle: "時々ボソッとロシア語でデレる隣のアーリャさん",
        posterImage: "images/roshidere/poster.jpg", // Cần ảnh
        bannerImage: "images/roshidere/banner.jpg", // Cần ảnh
        logoImage: "images/roshidere/logo.png",
        description: "Alisa Mikhailovna Kujou, hay Alya, là một nữ sinh xinh đẹp, học giỏi, ngồi cạnh Masachika Kuze trong lớp. Cô thỉnh thoảng lẩm bẩm bằng tiếng Nga về những cảm xúc thật của mình với Masachika, nghĩ rằng cậu không hiểu. Tuy nhiên, Masachika lại hiểu tiếng Nga nhưng giả vờ không biết để nghe những lời lẽ đáng yêu và chân thật của Alya.",
        genres: ["Romance", "Comedy", "School", "Slice of Life"],
        rating: "PG-13",
        type: "Series",
        status: "Đang chiếu", // Hoặc "Sắp chiếu"
        releaseYear: 2024, // Năm anime dự kiến
        episodes: { total: "Ongoing", availableOnSite: 0, seasons: [] },
        rankings: {
            mostRomantic: 3,
            cutestCharacters: 2, // Alya
            mostAnticipated: 1
        },
        crunchyrollTags: ["Sub", "Romance", "Comedy"],
        relatedAnime: []
    },


    { // ANIME MỚI: BLUE ARCHIVE THE ANIMATION
        id: "blue-archive-animation", // URL-friendly ID
        title: "Blue Archive The Animation",
        altTitle: "ブルーアーカイブ The Animation",
        posterImage: "images/blue-archive/poster.jpg", // Cần ảnh poster
        bannerImage: "images/blue-archive/banner.webp", // Cần ảnh banner
        logoImage: "images/blue-archive/Balogo.png",   // Cần ảnh logo (nếu có)
        description: "Câu chuyện lấy bối cảnh tại thành phố học viện Kivotos. Tại đây, hàng ngàn học viện được tập hợp lại. Hội đồng Chủ tịch Chung đóng vai trò quản lý các học viện. Tuy nhiên, khả năng lãnh đạo của Hội đồng Chủ tịch Chung đã bị đình trệ kể từ khi Chủ tịch đột ngột biến mất. Vô số vấn đề bắt đầu nảy sinh khắp Kivotos. Để tránh thảm họa, Hội đồng Chủ tịch Chung đã yêu cầu sự trợ giúp từ Câu lạc bộ Điều tra Liên bang, còn được gọi là Schale. Trên thực tế, Schale là câu lạc bộ mới nhất của thành phố và là câu lạc bộ cuối cùng được phê duyệt trước khi Chủ tịch biến mất. Để hoàn thành nhiệm vụ của mình, Schale dựa vào sự hướng dẫn của một Sensei, người sẽ giúp họ giải quyết các sự cố xung quanh Kivotos.",
        genres: ["Action", "Comedy", "School", "Sci-Fi"],
        rankings: {
            bestAction: 2,
            mostAnticipated: 2 // Ví dụ: Anime được mong đợi
        },
        rating: "PG-13", // Ước lượng
        type: "Series",
        status: "Hoàn thành", // Giả sử 12 tập là hết mùa 1
        releaseYear: 2024, // Năm phát hành
        episodes: {
            total: 12,
            availableOnSite: 12,
            seasons: [
                {
                    seasonNum: 1,
                    seasonTitle: "Abidos Mùa Hè", // Hoặc Season 1
                    episodes: [
                        { epNumOverall: 1, epNumInSeason: 1, title: "Tổ Biện Pháp Đối Phó Trường Trung Học Abidos", thumbnail: "images/blue-archive/tap1.jpg", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1091393446?h=5b3fe452de&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 2, epNumInSeason: 2, title: "Tôi Không Chấp Nhận!", thumbnail: "images/blue-archive/tap2.jpg", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1091393462?h=34ebda9761&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 3, epNumInSeason: 3, title: "Nếu Cậu Muốn Làm Gì Cứ Việc Nhờ Tớ", thumbnail: "images/blue-archive/tap3.jpg", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1091393482?h=d9b97588bc&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 4, epNumInSeason: 4, title: "Đội Đặc Nhiệm Mặt Nạ Tắm Biển", thumbnail: "images/blue-archive/tap4.jpg", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1091393500?h=7c35553c69&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 5, epNumInSeason: 5, title: "Đây Không Phải Là Nơi Dành Cho Bạn Bè!", thumbnail: "images/blue-archive/tap5.jpg", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1091393525?h=69769e8a29&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 6, epNumInSeason: 6, title: "Ủy Ban Kỷ Luật Gehenna", thumbnail: "images/blue-archive/tap6.jpg", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1091393543?h=85088e825b&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 7, epNumInSeason: 7, title: "Không Thể Tiến Lên Phía Trước", thumbnail: "images/blue-archive/tap7.jpg", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1091393553?h=7fae8ab154&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 8, epNumInSeason: 8, title: "Bí Mật", thumbnail: "images/blue-archive/tap8.jpg", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1091393581?h=63af5132e3&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 9, epNumInSeason: 9, title: "Đến Nơi Không Thể Chạm Tới", thumbnail: "images/blue-archive/tap9.jpg", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1091393596?h=dff02906e6&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 10, epNumInSeason: 10, title: "Sensei Duy Nhất Có Ý Nghĩa", thumbnail: "images/blue-archive/tap10.jpg", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1091393373?h=56da202bfe&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 11, epNumInSeason: 11, title: "Điều Tớ Muốn Làm Là Ở Bên Cậu", thumbnail: "images/blue-archive/tap11.jpg", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1091393404?h=73f37e871a&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 12, epNumInSeason: 12, title: "Vì Chúng Ta Luôn Ở Bên Nhau", thumbnail: "images/blue-archive/tap12.jpg", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1091393432?h=47c62ff523&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false }
                    ]
                }
            ]
        },
        crunchyrollTags: ["Sub", "Action", "School", "Comedy"], // Các tag phù hợp
        relatedAnime: [] // (Tùy chọn)
    },

    // Đảm bảo có dấu phẩy nếu đây không phải là đối tượng cuối cùng trong mảng

];
