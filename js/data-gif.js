// data.js

// Tạo danh sách GIF cho Anya Forger
const anyaGifs = [];
const anyaCount = 177; // Giả sử có 177 GIF, bạn điều chỉnh số lượng này
// Giả sử có 177 GIF, bạn điều chỉnh số lượng này
for (let i = 1; i <= anyaCount; i++) {
  anyaGifs.push({
    id: `anya_forger_${i}`,
    fileName: `anya_forger (${i}).gif`, // Giả sử tên file là 'anya_forger (số).gif'
    title: `Anya Forger (${i})`,
    tags: ["anya", "spy x family", "anya forger", "funny", "cute"]
  });
}

// Tạo danh sách GIF cho Shiina Mahiru
const mahiruGifs = [];
const mahiruCount = 47; // Giả sử có 47 GIF, bạn điều chỉnh số lượng này
for (let i = 1; i <=mahiruCount; i++) {
  mahiruGifs.push({
    id: `shiina_mahiru_${i}`,
    fileName: `Mahiru (${i}).gif`, // Giả sử tên file là 'Mahiru (số).gif'
    title: `Mahiru (${i})`,
    tags: ["mahiru", "otonari no tenshi", "shiina mahiru", "tenshi-sama", "cute"]
  });
}

// Tạo danh sách GIF cho 100_girls_like_you
const girls100Gifs = [];
const girls100Count = 78;
for (let i = 1; i <= girls100Count; i++) {
  girls100Gifs.push({
    id: `100_girls_${i}`,
    fileName: `100_girls_like_you (${i}).gif`, // Điều chỉnh tên file nếu cần
    title: `100 Kanojo (${i})`,
    tags: ["100 kanojo", "kimitachi no koto ga daidaidaidaidaisuki na 100-nin no kanojo", "harem", "comedy"]
  });
}

// Tạo danh sách GIF cho Becky Blackbell
const beckyGifs = [];
const beckyCount = 30;
for (let i = 1; i <= beckyCount; i++) {
  beckyGifs.push({
    id: `becky_blackbell_${i}`,
    fileName: `becky_blackbell (${i}).gif`, // Điều chỉnh tên file nếu cần
    title: `Becky Blackbell (${i})`,
    tags: ["becky blackbell", "spy x family", "cute"]
  });
}

// Tạo danh sách GIF cho Danjoro (Danmachi - Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka)
const danjoroGifs = []; // Danjoro có thể là tên bạn đặt, có thể là "Danmachi" hoặc tên nhân vật cụ thể
const danjoroCount = 47;
for (let i = 1; i <= danjoroCount; i++) {
  danjoroGifs.push({
    id: `danjoro_${i}`, // Thay 'danjoro' bằng key chính xác hơn nếu cần
    fileName: `danjoro (${i}).gif`, // Điều chỉnh tên file nếu cần
    title: `Danjoro (${i})`, // Hoặc tên series/nhân vật
    tags: ["danmachi", "dungeon ni deai", "action", "fantasy"] // Thêm tags phù hợp
  });
}

// Tạo danh sách GIF cho Kurakon (Có thể là Kurage no Shokudou hoặc một series khác)
const kurakonGifs = [];
const kurakonCount = 43;
for (let i = 1; i <= kurakonCount; i++) {
  kurakonGifs.push({
    id: `kurakon_${i}`,
    fileName: `kurakon (${i}).gif`, // Điều chỉnh tên file nếu cần
    title: `Kurakon (${i})`, // Hoặc tên series chính xác
    tags: ["kurakon", "slice of life"] // Thêm tags phù hợp
  });
}

// Tạo danh sách GIF cho Lycoris Recoil
const lycorisGifs = [];
const lycorisCount = 159;
for (let i = 1; i <= lycorisCount; i++) {
  lycorisGifs.push({
    id: `lycoris_recoil_${i}`,
    fileName: `lycoris_recoil (${i}).gif`, // Điều chỉnh tên file nếu cần
    title: `Lycoris Recoil (${i})`,
    tags: ["lycoris recoil", "chisato nishikigi", "takina inoue", "action", "cute"]
  });
}

// Tạo danh sách GIF cho Roshidere (Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san)
const roshidereGifs = [];
const roshidereCount = 35;
for (let i = 1; i <= roshidereCount; i++) {
  roshidereGifs.push({
    id: `roshidere_alya_${i}`,
    fileName: `roshidere (${i}).gif`, // Điều chỉnh tên file nếu cần
    title: `Alya-san (${i})`,
    tags: ["roshidere", "alya", "alya-san", "tokidoki bosotto", "cute", "romcom"]
  });
}

// Tạo danh sách GIF cho Witch Watch
const witchWatchGifs = [];
const witchWatchCount = 76;
for (let i = 1; i <= witchWatchCount; i++) {
  witchWatchGifs.push({
    id: `witch_watch_${i}`,
    fileName: `witch_watch (${i}).gif`, // Điều chỉnh tên file nếu cần
    title: `Witch Watch (${i})`,
    tags: ["witch watch", "nico wakatsuki", "moi kiharano", "comedy", "magic"]
  });
}

// Bạn còn thiếu Yor Forger, mình sẽ thêm vào đây
const yorForgerGifs = [];
const yorForgerCount = 50; // Giả sử có 50 GIF, bạn điều chỉnh số lượng này
for (let i = 1; i <= yorForgerCount; i++) {
  yorForgerGifs.push({
    id: `yor_forger_${i}`,
    fileName: `yor_forger (${i}).gif`, // Điều chỉnh tên file nếu cần
    title: `Yor Forger (${i})`,
    tags: ["yor forger", "spy x family", "thorn princess", "action", "wife"]
  });
}


// --- ĐỐI TƯỢNG CHÍNH animeGifData ---
const animeGifData = {
  "OtonariNoTenshi": { // Key cho series
    displayName: "Shiina Mahiru", // Tên hiển thị trên nút lọc
    folder: "gifs/otonari_no_tenshi/", // Đường dẫn đến thư mục
    gifs: mahiruGifs // Mảng GIF đã tạo
  },
  "AnyaForger": {
    displayName: "Anya Forger",
    folder: "gifs/anya_forger/",
    gifs: anyaGifs
  },
  "YorForger": { // Thêm Yor Forger
    displayName: "Yor Forger",
    folder: "gifs/yor_forger/",
    gifs: yorForgerGifs
  },
  "BeckyBlackbell": {
    displayName: "Becky Blackbell",
    folder: "gifs/becky_blackbell/",
    gifs: beckyGifs
  },
  "LycorisRecoil": {
    displayName: "Lycoris Recoil",
    folder: "gifs/lycoris_recoil/",
    gifs: lycorisGifs
  },
  "WitchWatch": {
    displayName: "Witch Watch",
    folder: "gifs/witch_watch/",
    gifs: witchWatchGifs
  },
  "Roshidere": {
    displayName: "Roshidere (Alya-san)",
    folder: "gifs/roshidere/",
    gifs: roshidereGifs
  },
  "KimitachiNoKotoGaSukiNa100Kanojo": { // Tên key có thể dài, nhưng nên rõ ràng
    displayName: "100 Kanojo",
    folder: "gifs/100_girls_like_you/",
    gifs: girls100Gifs
  },
  "DanjoroSeries": { // Đổi tên key nếu "danjoro" không phải tên chính thức
    displayName: "Danjoro (Danmachi?)", // Cập nhật displayName
    folder: "gifs/danjoro/",
    gifs: danjoroGifs
  },
  "KurakonSeries": { // Đổi tên key nếu "kurakon" không phải tên chính thức
    displayName: "Kurakon", // Cập nhật displayName
    folder: "gifs/kurakon/",
    gifs: kurakonGifs
  }
  // Bạn có thể thêm các series khác hoặc link Giphy ở đây nếu muốn
  /*
  "PlaceholderGiphy": {
    displayName: "General (Giphy Links)",
    folder: "",
    isExternal: true,
    gifs: [
        { id: "giphy_placeholder_smile", url: "https://media.giphy.com/...", title: "Smiling Face Placeholder", tags: ["anime", "cute"] }
    ]
  }
  */
};