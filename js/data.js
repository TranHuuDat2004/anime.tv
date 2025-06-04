// data.js
const animeData = [
    {
        id: "one-piece",
        title: "One Piece",
        altTitle: "ワンピース",
        posterImage: "https://m.media-amazon.com/images/M/MV5BODVmMDYWZTQtYTM3ZC00N2Q5LWJmNGYtOTM3Y2Y2Y2FhYzZlXkEyXkFqcGdeQXVyMTA1OTcyNDQ4._V1_FMjpg_UX1000_.jpg",
        bannerImage: "https://img.vn/uploads/version/img24/2024/03/one-piece-poster-1710211513.png",
        logoImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/One_Piece_Logo.svg/1200px-One_Piece_Logo.svg.png",
        description: "Gol D. Roger được biết đến với cái tên Vua Hải Tặc, người mạnh nhất và khét tiếng nhất từng dong buồm trên Grand Line...", // (Giữ nguyên mô tả dài của bạn)
        genres: ["Action", "Adventure", "Comedy", "Super Power", "Drama", "Fantasy", "Shounen"],
        rating: "14+",
        type: "Series",
        status: "Đang chiếu",
        releaseYear: 1999,
        episodes: {
            total: "Ongoing",
            availableOnSite: 100, // Cập nhật nếu cần
            seasons: [
                {
                    seasonNum: 13,
                    seasonTitle: "Wano Country Arc (Part 2)",
                    episodes: [
                        { epNumOverall: 892, epNumInSeason: 1, title: "Đất Nước Wano! Đến Vùng Đất Hoa Anh Đào Nơi Samurai Tung Hoành", thumbnail: "https://img1.ak.crunchyroll.com/i/spire2/3e79f95f837f25250d1a9f73cdd830031561831991_full.jpg", duration: "24 min", videoUrl: "#", sub: true, dub: false },
                        { epNumOverall: 1097, epNumInSeason: 206, title: "Ý Chí Của Ohara! Nghiên Cứu Kế Thừa.", thumbnail: "https://img1.ak.crunchyroll.com/i/spire3/8f52a995683a8c3f1941e1d109cf92191710006646_full.jpg", duration: "24 min", videoUrl: "#", sub: true, dub: false },
                    ]
                }
            ]
        },
        crunchyrollTags: ["Sub | Dub", "Action", "Adventure", "Fantasy", "Shonen"],
        relatedAnime: [
            { id: "one-piece-film-red", title: "One Piece Film: Red", posterImage: "https://upload.wikimedia.org/wikipedia/vi/6/6a/One_Piece_Film_Red_2022_Poster.jpg" }
        ]
    },
    {
        id: "jujutsu-kaisen",
        title: "Jujutsu Kaisen",
        altTitle: "呪術廻戦",
        posterImage: "https://m.media-amazon.com/images/M/MV5BNGY4MTg3NzgtMmFkZi00NTg5LWExMmEtMWI3YzI1ODdmMWQ1XkEyXkFqcGdeQXVyMjQwMDg0MDU@._V1_FMjpg_UX1000_.jpg",
        bannerImage: "https://cdn.crunchyroll.com/fms/landscape_poster/1920x1080/100/png/c03948f2-079f-4988-a790-a977f50d25a8.webp",
        logoImage: "https://upload.wikimedia.org/wikipedia/commons/4/46/Jujutsu_kaisen_logo.png",
        description: "Yuji Itadori là một học sinh trung học có năng khiếu thể chất bẩm sinh...", // (Giữ nguyên mô tả dài của bạn)
        genres: ["Action", "Dark Fantasy", "Supernatural", "School"],
        rating: "17+",
        type: "Series",
        status: "Đang chiếu (Season 2)",
        releaseYear: 2020,
        episodes: {
            total: "Ongoing",
            availableOnSite: 47,
             seasons: [
                {
                    seasonNum: 1,
                    seasonTitle: "Season 1",
                    episodes: [
                        { epNumOverall: 1, epNumInSeason: 1, title: "Ryomen Sukuna", thumbnail: "https://img1.ak.crunchyroll.com/i/spire4/d68c400053ebf7de3f75148f0904c0211601612208_full.jpg", duration: "24 min", videoUrl: "#", sub: true, dub: true },
                    ]
                },
                {
                    seasonNum: 2,
                    seasonTitle: "Season 2 - Shibuya Incident",
                    episodes: [
                         { epNumOverall: 25, epNumInSeason: 1, title: "Hidden Inventory", thumbnail: "https://img1.ak.crunchyroll.com/i/spire2/3a13587f854e965264d7724c8c953a9a1688609080_full.jpg", duration: "24 min", videoUrl: "#", sub: true, dub: true },
                    ]
                }
            ]
        },
        crunchyrollTags: ["Sub | Dub", "Action", "Dark Fantasy", "Supernatural"],
        relatedAnime: []
    },
    { // ANIME: THIÊN SỨ NHÀ BÊN
        id: "thien-su-nha-ben",
        title: "Thiên Sứ Nhà Bên",
        altTitle: "Otonari no Tenshi-sama ni Itsunomanika Dame Ningen ni Sareteita Ken",
        posterImage: "https://m.media-amazon.com/images/M/MV5BZDE0YjYyZGUtM2JjNS00MGE1LTk0YjgtYmRjY2JlYjZhNjc0XkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_FMjpg_UX1000_.jpg",
        bannerImage: "https://cdn.otakotaku.com/wp-content/uploads/2023/01/Otonari-no-Tenshi-Sama-scaled.webp",
        logoImage: "", // Bạn có thể tìm logo phù hợp sau
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
                        { epNumOverall: 1, epNumInSeason: 1, title: "Thiên Sứ Nhà Bên Tập 1", thumbnail: "https://via.placeholder.com/160x90?text=Ep1+Thumb", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331386?h=12d2ec3524&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 2, epNumInSeason: 2, title: "Thiên Sứ Nhà Bên Tập 2", thumbnail: "https://via.placeholder.com/160x90?text=Ep2+Thumb", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331424?h=a8b64a2057&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 3, epNumInSeason: 3, title: "Thiên Sứ Nhà Bên Tập 3", thumbnail: "https://via.placeholder.com/160x90?text=Ep3+Thumb", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331480?h=79adb09f65&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 4, epNumInSeason: 4, title: "Thiên Sứ Nhà Bên Tập 4", thumbnail: "https://via.placeholder.com/160x90?text=Ep4+Thumb", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331498?h=b042e0a3c1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 5, epNumInSeason: 5, title: "Thiên Sứ Nhà Bên Tập 5", thumbnail: "https://via.placeholder.com/160x90?text=Ep5+Thumb", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331516?h=c4594f7dee&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 6, epNumInSeason: 6, title: "Thiên Sứ Nhà Bên Tập 6", thumbnail: "https://via.placeholder.com/160x90?text=Ep6+Thumb", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331530?h=1f50d3ad44&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 7, epNumInSeason: 7, title: "Thiên Sứ Nhà Bên Tập 7", thumbnail: "https://via.placeholder.com/160x90?text=Ep7+Thumb", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331551?h=eacaeed8dc&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 8, epNumInSeason: 8, title: "Thiên Sứ Nhà Bên Tập 8", thumbnail: "https://via.placeholder.com/160x90?text=Ep8+Thumb", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331573?h=3a57303702&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 9, epNumInSeason: 9, title: "Thiên Sứ Nhà Bên Tập 9", thumbnail: "https://via.placeholder.com/160x90?text=Ep9+Thumb", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331596?h=018efcc4b7&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 10, epNumInSeason: 10, title: "Thiên Sứ Nhà Bên Tập 10", thumbnail: "https://via.placeholder.com/160x90?text=Ep10+Thumb", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331623?h=e4cb653ab9&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 11, epNumInSeason: 11, title: "Thiên Sứ Nhà Bên Tập 11", thumbnail: "https://via.placeholder.com/160x90?text=Ep11+Thumb", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331636?h=8bdf60bbbc&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false },
                        { epNumOverall: 12, epNumInSeason: 12, title: "Thiên Sứ Nhà Bên Tập 12", thumbnail: "https://via.placeholder.com/160x90?text=Ep12+Thumb", duration: "23 min", videoUrl: "https://player.vimeo.com/video/1090331655?h=aadfc2f94b&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479", sub: true, dub: false }
                    ]
                }
            ]
        },
        crunchyrollTags: ["Sub", "Slice of Life", "Romance", "Comedy"],
        relatedAnime: []
    }
];
