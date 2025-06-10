// js/data-manga.js
const mangaData = [
    // {
    //     id: "spy-x-family",
    //     title: "Spy x Family",
    //     altTitle: "SPY x FAMILY (スパイファミリー)",
    //     author: "Tatsuya Endo",
    //     coverImage: "images/manga/spy-x-family/cover.jpg", // Đường dẫn ảnh bìa cục bộ
    //     bannerImage: "images/manga/spy-x-family/banner.jpg", // (Tùy chọn) Ảnh banner cho trang chi tiết manga
    //     description: "Để duy trì hòa bình giữa hai quốc gia Westalis và Ostania, điệp viên hàng đầu của Westalis với mật danh \"Twilight\" được giao nhiệm vụ tối mật: theo dõi Donovan Desmond, một chính trị gia cực đoan của Ostania. Cách duy nhất để tiếp cận mục tiêu là Twilight phải tạo một gia đình giả, cho \"con\" theo học tại trường danh giá mà con trai Desmond đang theo học. Anh lấy thân phận Loid Forger, nhận nuôi cô bé mồ côi Anya (một nhà ngoại cảm) và kết hôn với Yor Briar (một sát thủ khét tiếng) mà không hề hay biết bí mật của họ. Gia đình đặc biệt này phải che giấu thân phận thật của mình trong khi thực hiện các nhiệm vụ và đối mặt với những tình huống dở khóc dở cười.",
    //     genres: ["Action", "Comedy", "Shounen", "Slice of Life"],
    //     status: "Đang tiến hành", // Ongoing, Completed, Hiatus
    //     releaseYear: 2019,
    //     chapters: [ // (Tùy chọn) Thông tin về các chương (có thể phát triển sau)
    //         { chapterNum: 1, title: "Nhiệm vụ 001", releaseDate: "2019-03-25", scanlationGroup: "MangaPlus" },
    //         { chapterNum: 90, title: "Nhiệm vụ 090", releaseDate: "2023-11-12", scanlationGroup: "MangaPlus" },
    //     ],
    //     // Link đến nơi đọc truyện (ví dụ: MangaPlus, website của bạn nếu có)
    //     readDetailLink: `manga-detail.html?id=spy-x-family`,
    //     readLink: "https://mangaplus.shueisha.co.jp/titles/100052" // Link ví dụ
    // },
    // {
    //     id: "kaguya-sama",
    //     title: "Kaguya-sama: Love Is War",
    //     altTitle: "Kaguya-sama wa Kokurasetai (かぐや様は告らせたい～天才たちの恋愛頭脳戦～)",
    //     author: "Aka Akasaka",
    //     coverImage: "images/manga/kaguya-sama/cover.jpg",
    //     bannerImage: "images/manga/kaguya-sama/banner.jpg",
    //     description: "Tại học viện Shuchiin danh giá, chủ tịch hội học sinh Miyuki Shirogane và phó chủ tịch Kaguya Shinomiya được xem là cặp đôi hoàn hảo. Thông minh, tài năng và xinh đẹp, họ được cả trường ngưỡng mộ. Tuy nhiên, dù cả hai đều có tình cảm với nhau, lòng kiêu hãnh quá lớn khiến không ai chịu tỏ tình trước. Thay vào đó, họ lao vào một cuộc chiến cân não hàng ngày để buộc đối phương phải là người ngỏ lời trước.",
    //     genres: ["Comedy", "Romance", "School", "Seinen", "Slice of Life"],
    //     status: "Hoàn thành",
    //     releaseYear: 2015,
    //     chapters: [
    //         { chapterNum: 281, title: "Chương cuối", releaseDate: "2022-11-02", scanlationGroup: "MangaPlus" }
    //     ],
    //     readDetailLink: `manga-detail.html?id=kaguya-sama`,
    //     readLink: "https://mangaplus.shueisha.co.jp/titles/100037"
    // },
    // {
    //     id: "oshi-no-ko",
    //     title: "Oshi no Ko",
    //     altTitle: "【推しの子】",
    //     author: "Aka Akasaka (Story), Mengo Yokoyari (Art)",
    //     coverImage: "images/manga/oshi-no-ko/cover.jpg",
    //     bannerImage: "images/manga/oshi-no-ko/banner.jpg",
    //     description: "Ai Hoshino, một idol 16 tuổi xinh đẹp và tài năng, đang ở đỉnh cao sự nghiệp. Tuy nhiên, cô bí mật mang thai song sinh. Bác sĩ phụ sản Goro Amemiya, một fan hâm mộ lớn của Ai, đã giúp đỡ cô. Vào đêm Ai sinh con, Goro bị sát hại một cách bí ẩn và tái sinh thành Aquamarine Hoshino, một trong hai đứa con của Ai. Người em gái song sinh của cậu, Ruby, cũng là một người hâm mộ Ai đã qua đời và tái sinh. Aqua quyết tâm tìm ra kẻ đã giết mẹ mình (sau này) và Goro, dấn thân vào thế giới showbiz đầy hào nhoáng nhưng cũng không kém phần tăm tối.",
    //     genres: ["Drama", "Mystery", "Supernatural", "Seinen"],
    //     status: "Đang tiến hành",
    //     releaseYear: 2020,
    //     chapters: [], // Có thể để trống nếu chưa cập nhật chi tiết chương
    //     readDetailLink: `manga-detail.html?id=oshi-no-ko`,
    //     readLink: "https://mangaplus.shueisha.co.jp/titles/100191"
    // },
    {
        id: "doraemon-movie-2023",
        title: "Doraemon Movie 2023: Nobita's Sky Utopia", // Tên phim (ví dụ)
        altTitle: "映画ドラえもん のび太と空の理想郷 (ユートピア)",
        author: "Fujiko F. Fujio (Original Creator)",
        coverImage: "manga/doraemon-movie-2023/1.png", // Cần ảnh bìa
        bannerImage: "manga/doraemon-movie-2023/banner2.jpeg", // Cần ảnh banner
        description: "Nobita và những người bạn bắt đầu một cuộc phiêu lưu đến Utopia, một hòn đảo hình lưỡi liềm hoàn hảo trên bầu trời, nơi mọi người có thể sống hạnh phúc mà không gặp khó khăn gì, nhờ vào sự giúp đỡ của những chú mèo robot hoàn hảo.",
        genres: ["Adventure", "Fantasy", "Sci-Fi", "Kids"],
        status: "Hoàn thành",
        releaseYear: 2023, // Năm phát hành manga/movie
        // Thay vì 'chapters', chúng ta sẽ dùng thông tin 'pages' cho reader
        pageInfo: {
            totalPages: 152, // Tổng số trang ảnh
            // Đường dẫn đến thư mục chứa các trang truyện, không bao gồm tên file
            // Ví dụ: images/manga/doraemon-movie-2023/pages/
            // Tên file sẽ được tạo động: 1.jpg, 2.jpg, ...
            basePath: "manga/doraemon-movie-2023/",
            fileExtension: ".png" // Phần mở rộng của file ảnh trang truyện
        },
        readDetailLink: `manga-detail.html?id=doraemon-movie-2023`,
        readLink: `manga-detail.html?id=doraemon-movie-2023` // Link để bắt đầu đọc
    }
    // Thêm các bộ manga khác vào đây
];