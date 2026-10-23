/* 只需修改這裡即可替換個人資料與作品。使用相對路徑，例如 ./demos/example.html。
   githubUsername 留空時不顯示 GitHub 入口；不要放入尚不存在的網址。
   previewUrl/sourceUrl 可填本地相對路徑或完整 https 網址；留空即顯示未提供。
   自己的作品請將 isDemo 設為 false；不要把示範內容當成真實經歷。 */
window.SITE_CONFIG = {
  name: "martin3252",
  githubUsername: "martin3252",
  intro: "從職場溝通到在地資訊，這裡收集我的網站作品與小型互動實驗。選一個作品，直接玩玩看。",
  bio: "這裡展示 How2Talk 與 Brisbane Tradies：一個探索職場中的說話方式，一個整理布里斯本的商家資訊。也保留幾個可直接操作的小型示範，讓想法有個可以體驗的入口。",
  profileIsPlaceholder: false,
  projects: [
    { id: "how2talk", title: "How2Talk｜職場溝通", subtitle: "WORDS THAT WORK", description: "用情境卡片對照地雷回答與圓融回答，理解職場對話的關鍵。支援情境搜尋，並依主管、同事、下屬、客戶與面試官篩選。", tags: ["實際作品", "職場溝通", "情境卡片"], previewUrl: "https://how2talk.vercel.app/", sourceUrl: "", isDemo: false, visual: "talk", featured: true },
    { id: "tradies", title: "Brisbane Tradies", subtitle: "FIND. FILTER. SHORTLIST.", description: "整理布里斯本周邊商家資訊，依工種、關鍵字與距離查找，查看評分與評論數，並將商家加入候選清單，方便比較及聯絡。", tags: ["實際作品", "在地資訊", "搜尋篩選"], previewUrl: "https://usefulinformation.vercel.app/", sourceUrl: "", isDemo: false, visual: "directory", featured: true },
    { id: "palette", title: "配色實驗室", subtitle: "COLOR PLAYGROUND", description: "轉動色相，找出下一個介面的靈感。即時產生一組色票，並複製 CSS 變數。", tags: ["設計工具", "JavaScript"], previewUrl: "./demos/palette.html", sourceUrl: "./demos/demo.js", isDemo: true, visual: "palette" },
    { id: "focus", title: "留一點時間，專注", subtitle: "FOCUS TIMER", description: "給自己一段不被打擾的時間。可調整分鐘數，開始、暫停，再重新出發。", tags: ["效率工具", "JavaScript"], previewUrl: "./demos/focus.html", sourceUrl: "./demos/demo.js", isDemo: true, visual: "focus" },
    { id: "tasks", title: "口袋清單", subtitle: "TINY TASKS", description: "把腦中的小事放下來。新增待辦、勾選完成，讓下一步變得清楚一點。", tags: ["效率工具", "介面實驗"], previewUrl: "./demos/tasks.html", sourceUrl: "./demos/demo.js", isDemo: true, visual: "tasks" }
  ]
};
