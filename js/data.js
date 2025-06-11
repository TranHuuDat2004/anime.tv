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
                        {
                            epNumOverall: 1, epNumInSeason: 1, title: "Your Name. (Dub)", // Tiêu đề dựa trên iframe
                            thumbnail: "images/your-name/your-name-banner.webp", // Lấy thumbnail từ Vimeo nếu có, hoặc placeholder
                            duration: "1 hr 46 min", // Thời lượng phim        
                            videoUrl: "https://player.vimeo.com/video/1092110907?h=dffe7a185f&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
                            sub: false, // Dựa trên title "Dub"
                            dub: true
                        }
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
                        {
                            epNumOverall: 1, epNumInSeason: 1, title: "Weathering With You (Dub)", // Tiêu đề dựa trên iframe
                            thumbnail: "images/weathering-with-you/weathering-with-you-banner.webp", // Lấy thumbnail từ Vimeo nếu có, hoặc placeholder
                            duration: "1 hr 52 min", // Thời lượng phim
                            videoUrl: "https://player.vimeo.com/video/1092110790?h=5e30f6ffb7&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
                            sub: false, // Dựa trên title "Dub"
                            dub: true
                        }
                    ]
                }
            ]
        },
        crunchyrollTags: ["Dub", "Drama", "Fantasy", "Romance"],
        relatedAnime: [
             { id: "your-name", title: "Your Name.", posterImage: "https://m.media-amazon.com/images/M/MV5BODRmZDVmNzUtZDA4ZC00NjhkLWI2M2UtN2M0ZDIzNDcxYThjL2ltYWdlXkEyXkFqcGdeQXVyNTk0MzMzODA@._V1_FMjpg_UX1000_.jpg" }
        ]
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
    }
];
