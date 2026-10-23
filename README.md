# martin3252.github.io
Personal demo portfolio · GitHub Pages

## Dev Lab — 網站使用說明

純 HTML、CSS、JavaScript 的 GitHub Pages 個人作品展示。無建置依賴、無後端、無外部字型與追蹤服務，所有本地資源都使用相對路徑。

預期首頁： https://martin3252.github.io/
目標儲存庫： `martin3252/martin3252.github.io`

## 先預覽

直接開啟 `index.html` 即可預覽作品頁；建議在資料夾執行 `python3 -m http.server 8000`，開啟 http://localhost:8000 。不需要 npm。

## 修改資料與作品

編輯 `site.config.js`：

- `name`：顯示名稱；目前使用已提供的 GitHub 帳號，不推測真實姓名。
- `githubUsername`：目前為 `martin3252`。留空時隱藏 GitHub 入口。
- `intro`、`bio`：個人介紹。現有文案只描述這個作品頁，沒有虛構經歷。
- `profileIsPlaceholder`：若改成待填寫文字可設為 `true` 顯示提示。
- `projects`：順序就是顯示順序。前兩項是實際作品，後三項明確標記為示範。

新增項目範例（將網址換成已存在的作品，空字串不會產生原始碼按鈕）：

```js
{
  id: "my-project", // 唯一名稱
  title: "作品名稱",
  subtitle: "PROJECT LABEL",
  description: "這個作品實際可以做什麼。",
  tags: ["實際作品", "工具"],
  previewUrl: "./demos/my-project.html", // 或完整 https 網址
  sourceUrl: "", // 沒有倉庫就留空，相關按鈕會隱藏
  isDemo: false,
  featured: true, // 寬版主要作品卡
  visual: "directory" // talk / directory / palette / focus / tasks
}
```

標籤會自動建立，不需另外修改按鈕。所有文字使用 textContent 插入；請只放你信任的預覽網址。外部作品以新分頁開啟，避免網站禁止 iframe 時出現空白。

## 已核對的實際作品

2026-10-23 透過實際頁面檢視：

1. [How2Talk](https://how2talk.vercel.app/)：職場溝通情境卡片，比較地雷與圓融回答；可搜尋情境並依對象篩選。
2. [Brisbane Tradies](https://usefulinformation.vercel.app/)：布里斯本周邊商家查找，提供工種、搜尋、距離、評分、評論數、排序與候選清單。

未提供這兩個作品的程式倉庫，故完全不顯示其原始碼按鈕。展示圖是概念插圖，非網站截圖。沒有推測其技術棧、商業成果或使用人數。

三個本地互動範例為本版交付新增的示範：配色實驗室、專注計時器、口袋清單。各範例的 `demo.js` 是共用互動原始碼；HTML/CSS 位於 `demos/`。清單不永久儲存；計時器關閉或重新整理即重設，沒有背景通知；剪貼簿不可用時會提供手動複製提示。

## 首次發布到 GitHub Pages

1. 以 `martin3252` 登入 GitHub。先查看是否已有 `martin3252.github.io` 儲存庫。
2. **已有儲存庫**：先 clone、閱讀與備份原有內容；在新分支整合本版，審閱差異後再合併。不要直接覆蓋既有網站、README 或 workflow。
3. **確認尚無儲存庫**：建立名為 `martin3252.github.io` 的儲存庫。一般個人帳號可使用 Public；私人儲存庫的 Pages 可用性依 GitHub 方案而異。
4. 將本資料夾的內容放到儲存庫根目錄。`index.html` 必須直接在根目錄，不要再包一層 `demo-portfolio/`。
5. 一併提交 `.github/workflows/pages.yml` 與 `.nojekyll`。使用網頁上傳時注意隱藏資料夾，若不方便建 `.github`，可用 Git 上傳。
6. 在儲存庫 **Settings → Pages → Build and deployment → Source** 選 **GitHub Actions**。
7. 推送到 `main`；也可在 Actions 裡手動執行 `Deploy static site to GitHub Pages`。若預設分支不是 `main`，請先修改 workflow 的 `branches`。
8. 等待 workflow 的 deploy job 成功，再使用該次工作顯示的網址確認網站。成功前不要把預期網址當作已發布結果。

Workflow 使用 checkout、configure-pages、upload-pages-artifact、deploy-pages，僅上傳首頁、設定、README、assets、demos 與 `.nojekyll`，不會部署測試、內部預覽設定或 ZIP。權限限於讀取內容及部署 Pages，使用 `github-pages` environment。

官方文件：
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## 專案子路徑相容

若改放 `martin3252/some-project`，則網址為 `https://martin3252.github.io/some-project/`，不需要更改本地資源路徑。新加資源使用 `./assets/...`，demo 返回首頁使用 `../index.html`，避免使用 `/assets/...` 或固定網域。外部作品網址保持完整 HTTPS。

## 檔案與驗證

- `index.html`：頁面結構、語意標籤、跳過導覽與預覽 dialog。
- `site.config.js`：集中內容設定。
- `assets/style.css`：響應式版面、鍵盤焦點、減少動態偏好。
- `assets/app.js`：作品卡、標籤篩選、預覽與條件顯示入口。
- `demos/`：三個實際可操作的示範。
- `.github/workflows/pages.yml`：GitHub Pages 靜態部署。
- `VALIDATION.md`：本次測試結果及限制。

此儲存庫已確認為 martin3252 擁有的公開儲存庫，初始 README 原文保留於本檔開頭。部署狀態請以 Actions 中對應 commit 的成功結果與實際首頁內容為準。
