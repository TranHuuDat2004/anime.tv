// data.js

const animeData = [
    {
        id: "one-piece",
        title: "One Piece",
        altTitle: "ワンピース",
        posterImage: "https://m.media-amazon.com/images/M/MV5BODVmMDYWZTQtYTM3ZC00N2Q5LWJmNGYtOTM3Y2Y2Y2FhYzZlXkEyXkFqcGdeQXVyMTA1OTcyNDQ4._V1_FMjpg_UX1000_.jpg", // Ảnh poster đứng
        bannerImage: "https://img.vn/uploads/version/img24/2024/03/one-piece-poster-1710211513.png", // Ảnh banner ngang cho trang detail
        logoImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/One_Piece_Logo.svg/1200px-One_Piece_Logo.svg.png",
        description: "Gol D. Roger được biết đến với cái tên Vua Hải Tặc, người mạnh nhất và khét tiếng nhất từng dong buồm trên Grand Line. Việc Roger bị Chính Phủ Thế Giới bắt và xử tử đã mang lại một sự thay đổi trên toàn thế giới. Những lời cuối cùng của ông trước khi chết đã tiết lộ sự tồn tại của kho báu vĩ đại nhất thế giới, One Piece. Chính lời tiết lộ này đã mang đến Kỷ Nguyên Hải Tặc Vĩ Đại, những người đàn ông mơ ước tìm được One Piece—thứ hứa hẹn một số lượng của cải và danh vọng không giới hạn—và có lẽ là đỉnh cao của vinh quang và danh hiệu Vua Hải Tặc. \n\nEnter Monkey D. Luffy, một cậu bé 17 tuổi, người đã thách thức định nghĩa tiêu chuẩn về một tên cướp biển. Thay vì là một nhân vật phản diện nổi tiếng, cứng rắn, không răng, chuyên cướp bóc làng mạc để giải trí, lý do Luffy trở thành cướp biển lại hoàn toàn trong sáng: đó là ý nghĩ về một cuộc phiêu lưu thú vị và gặp gỡ những người mới lạ và hấp dẫn, cùng với việc tìm kiếm One Piece, là những lý do khiến cậu theo đuổi. Theo chân những người hùng thời thơ ấu của mình, Luffy và thủy thủ đoàn của cậu đi khắp Grand Line, trải qua những cuộc phiêu lưu điên rồ, khám phá những bí ẩn đen tối và chiến đấu với những kẻ thù hùng mạnh, tất cả để đạt được One Piece.",
        genres: ["Action", "Adventure", "Comedy", "Super Power", "Drama", "Fantasy", "Shounen"],
        rating: "14+",
        type: "Series",
        status: "Đang chiếu",
        releaseYear: 1999,
        episodes: {
            total: "Ongoing", // Hoặc số tập nếu đã hoàn thành
            availableOnSite: 100, // Số tập bạn thực sự có link
            seasons: [
                {
                    seasonNum: 13, // Chỉ là ví dụ
                    seasonTitle: "Wano Country Arc (Part 2)",
                    episodes: [
                        { epNumOverall: 892, epNumInSeason: 1, title: "Đất Nước Wano! Đến Vùng Đất Hoa Anh Đào Nơi Samurai Tung Hoành", thumbnail: "https://img1.ak.crunchyroll.com/i/spire2/3e79f95f837f25250d1a9f73cdd830031561831991_full.jpg", duration: "24 min", videoUrl: "#", sub: true, dub: false },
                        { epNumOverall: 893, epNumInSeason: 2, title: "Otama Xuất Hiện! Luffy Đối Đầu Đội Quân Kaido!", thumbnail: "https://img1.ak.crunchyroll.com/i/spire1/15c7a8f062f7d060d522f1d8a57481541562433866_full.jpg", duration: "24 min", videoUrl: "#", sub: true, dub: false },
                        // Thêm nhiều tập khác ở đây
                        { epNumOverall: 1097, epNumInSeason: 206, title: "Ý Chí Của Ohara! Nghiên Cứu Kế Thừa.", thumbnail: "https://img1.ak.crunchyroll.com/i/spire3/8f52a995683a8c3f1941e1d109cf92191710006646_full.jpg", duration: "24 min", videoUrl: "#", sub: true, dub: false },
                    ]
                }
                // Thêm các season khác nếu có
            ]
        },
        crunchyrollTags: ["Sub | Dub", "Action", "Adventure", "Fantasy", "Shonen"], // Dùng cho dòng meta trên banner
        relatedAnime: [ // (Tùy chọn)
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
        description: "Yuji Itadori là một học sinh trung học có năng khiếu thể chất bẩm sinh. Mỗi ngày, cậu đều đến thăm người ông đang nằm viện của mình. Nhưng một ngày nọ, phong ấn của một 'vật bị nguyền rủa' được giấu trong trường của cậu bị phá vỡ, và những con quái vật được gọi là 'Nguyền Hồn' bắt đầu xuất hiện. Để cứu bạn bè của mình, Yuji đã nuốt ngón tay của Ryomen Sukuna, một Nguyền Hồn hùng mạnh, và trở thành vật chứa của hắn. Từ đó, Yuji chia sẻ một cơ thể với Sukuna và gia nhập Trường Cao đẳng Chuyên môn Chú thuật Tokyo dưới sự hướng dẫn của Gojo Satoru để chiến đấu chống lại Nguyền Hồn.",
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
                        // ... thêm 23 tập của season 1
                    ]
                },
                {
                    seasonNum: 2,
                    seasonTitle: "Season 2 - Shibuya Incident",
                    episodes: [
                         { epNumOverall: 25, epNumInSeason: 1, title: "Hidden Inventory", thumbnail: "https://img1.ak.crunchyroll.com/i/spire2/3a13587f854e965264d7724c8c953a9a1688609080_full.jpg", duration: "24 min", videoUrl: "#", sub: true, dub: true },
                        // ... thêm các tập của season 2
                    ]
                }
            ]
        },
        crunchyrollTags: ["Sub | Dub", "Action", "Dark Fantasy", "Supernatural"],
        relatedAnime: []
    },
    // Thêm các anime khác vào đây với cấu trúc tương tự
];