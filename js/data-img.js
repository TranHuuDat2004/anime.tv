// js/data-img.js

// --- TẠO DANH SÁCH ẢNH CHO TỪNG SERIES/NHÂN VẬT ---

// Ví dụ: Ảnh Artwork của Thiên Sứ Nhà Bên (Mahiru)
const mahiruArtworks = [];
const mahiruArtCount = 12; // Số lượng artwork của Mahiru
for (let i = 1; i <= mahiruArtCount; i++) {
    mahiruArtworks.push({
        id: `tsnb_mahiru_art_${i}`,
        fileName: `tap${i}.png`, // Quy ước tên file: mahiru_art_ (1).jpg, mahiru_art_ (2).jpg ...
        title: `Ảnh bìa phim tập #${i}`,
        tags: ["thiên sứ nhà bên", "mahiru shiina", "artwork", "cute"]
    });
}

// Ví dụ: Ảnh Wallpaper của Thiên Sứ Nhà Bên
const tsnbWallpapers = [];
const tsnbWallpaperCount = 10;
for (let i = 1; i <= tsnbWallpaperCount; i++) {
    tsnbWallpapers.push({
        id: `tsnb_wallpaper_${i}`,
        fileName: `wallpaper_tsnb_(${i}).png`, // Quy ước tên file
        title: `Thiên Sứ Nhà Bên Wallpaper #${i}`,
        tags: ["thiên sứ nhà bên", "wallpaper", "desktop"]
    });
}

// Ví dụ: Ảnh của Your Name
const yourNameImages = [];
const yourNameImageCount = 7; // Tổng số ảnh cục bộ của Your Name
for (let i = 1; i <= yourNameImageCount; i++) {
    yourNameImages.push({
        id: `yourname_img_${i}`,
        fileName: `your_name_image_(${i}).jpg`, // Quy ước tên file
        title: `Your Name. - Cảnh ${i}`,
        tags: ["your name", "kimi no na wa", "scenery", "wallpaper"]
    });
}
// Thêm ảnh từ URL ngoài thủ công nếu cần (giống data-gif)
yourNameImages.push({
    id: "yn_ext_stars_001",
    url: "https://images4.alphacoders.com/770/thumb-1920-770758.jpg",
    title: "Your Name. - Bầu trời sao (External)",
    tags: ["your name", "wallpaper", "stars", "night sky"],
    isExternalOverride: true // Đánh dấu đây là link ngoài
});


// Ví dụ: Ảnh của Blue Archive
const blueArchiveImages = [];
const blueArchiveImageCount = 12;
for (let i = 1; i <= blueArchiveImageCount; i++) {
    blueArchiveImages.push({
        id: `bluearchive_img_${i}`,
        fileName: `tap${i}.jpg`, // Quy ước tên file
        title: `Ảnh bìa phim tập #${i}`,
        tags: ["blue archive", "artwork", "character"]
    });
}


// --- ĐỐI TƯỢNG CHÍNH animeImageData ---
const animeImageData = {
    "thien-su-nha-ben": {
        id: "thien-su-nha-ben",
        displayName: "Thiên Sứ Nhà Bên",
        folder: "images/thien-su-nha-ben/", // Thư mục CHUNG cho tất cả ảnh của series này
        isExternal: false, // Mặc định ảnh là cục bộ
        images: [
            ...mahiruArtworks, // Gộp mảng artwork
            ...tsnbWallpapers  // Gộp mảng wallpaper
            // Nếu có ảnh đơn lẻ không theo quy tắc, thêm vào đây:
            // { id: "tsnb_special_001", fileName: "special_event.jpg", title: "Sự kiện đặc biệt", tags: ["event"] }
        ]
    },
    "your-name": {
        id: "your-name",
        displayName: "Your Name.",
        folder: "images/your-name/art/", // Thư mục cho ảnh Your Name
        isExternal: false,
        images: yourNameImages // Mảng ảnh đã tạo (bao gồm cả link ngoài nếu có)
    },
    "blue-archive-animation": {
        id: "blue-archive-animation",
        displayName: "Blue Archive The Animation",
        folder: "images/blue-archive/", // Thư mục cho ảnh Blue Archive
        isExternal: false,
        images: blueArchiveImages
    }
    // Thêm các series khác vào đây
    // Ví dụ nếu có ảnh từ link ngoài hoàn toàn cho một series:
    /*
    "another-series-external": {
        id: "another-series-external",
        displayName: "Series Ảnh Ngoài",
        folder: "", // Để trống nếu tất cả là external
        isExternal: true, // Đánh dấu cả series là external
        images: [
            { id: "ext_img_1", url: "https://link.to/external/image1.jpg", title: "Ảnh ngoài 1", tags: ["external"] },
            { id: "ext_img_2", url: "https://link.to/external/image2.png", title: "Ảnh ngoài 2", tags: ["external"] }
        ]
    }
    */
};