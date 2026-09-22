# 行銷週報 Dashboard — 工作說明（給 Claude Code）

這個資料夾是 Kayla 每週與副總開行銷會議用的週報網頁。Kayla 每週把重點內容貼給你，你負責整理成資料、檢查畫面、推上 GitHub。**開始工作前先讀完這份文件。**

## 基本資訊

- 公開網址：https://kaylalin-df.github.io/weekly-marketing-report/
- GitHub repo：kaylalin-df/weekly-marketing-report（public，GitHub Pages 從 main 分支根目錄部署）
- 本機路徑：`C:\Users\kayla.lin\ai project\Weekly Report`
- 使用者是 Kayla（行銷），用繁體中文溝通。報告人就是 Kayla，所以**資料裡不要放負責人「Kayla」**，任何地方都不要顯示她的名字當負責人。

## 檔案

- `index.html`：公版頁面。除非 Kayla 要求改版型或版面，否則不要動。
- `data/weeks.js`：每週資料，`window.WEEKLY_DATA` 陣列，一週一個物件，**新的一週放陣列最前面**。網頁預設顯示第一筆，右上角可切換週次。
- `README.md`：欄位說明與每週傳內容的格式。

## 每週更新流程

1. Kayla 貼上本週內容（格式不固定，可能是一大段口語文字）。
2. 你把內容**潤飾成適合會議報告的樣子**，寫進 `data/weeks.js`：
   - 若是新的一週：複製上一週物件放到陣列最前面，更新 `week`、`range`、`updated`，再改內容。沒變的項目保留並把 `change` 設為 `same`。
   - 若是同一週補充：直接改第一筆。
3. 用 node 檢查語法：`node -e "eval(require('fs').readFileSync('data/weeks.js','utf8').replace('window.','global.'));console.log('ok')"`
4. 用 Playwright 截圖確認畫面沒跑版（python playwright 已安裝，載入本機 index.html 即可）。
5. `git add -A && git commit && git push`，然後輪詢線上網址確認更新（GitHub Pages 約 1～2 分鐘）。commit 訊息結尾加 `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`。
6. 回覆 Kayla 時附上網址，提醒 Ctrl + F5 重新整理避免快取。

## 內容潤飾規則（Kayla 明確要求過）

- **不要一大段文字**。長內容拆成「需求項目卡」（`topics`）：每張卡一個標題、一個右上角狀態標籤（`tag`，例如「待午洋回覆」「待提案」「評估中」「預計下單」）、2～3 句短重點（`points`）。
- 每家客戶有一句 `update` 摘要、一個藍色 `next`（下一步）、需要副總決定的事放紅色 `ask`（待討論）。
- 主管對客戶不熟，所以新客戶要有「客戶背景」卡（品牌定位、規模、客群、合作緣由）。
- 循環標誌的每個項目：`note` 一句摘要 + `details[]` 短條列。需要在會議上特別報告的條列，寫成 `{ text: "...", hl: true }`，會以紅底重點色標示（`details` 在客戶卡與循環標誌卡都適用）。
- 數字寫法範例：「約 80 箱，約 800 kg」（用全形逗號分隔，每個數字前都加「約」）。
- 客戶階段由 Kayla 判斷；不確定時先放保守一階（例如已談到下單但她說停在「報價」就不要放「議約」）。

## 版面規則（已定案，不要改回去）

- 頂部 hero 橫幅小標題是「Kayla Weekly Marketing Report」。
- 「客戶開發進度」標題右邊有「開發 dashboard」連結（https://dafon-mk.github.io/weekly-report/），**不顯示**潛在客戶家數。
- 沒有「本週重點」和「需副總決策」欄位；決策事項寫在各客戶的 `ask`。
- 沒有接觸／提案／報價／議約／成交的數量統計列。
- 循環標誌區塊順序固定：說明卡（`labelsNotes`）→ 「個案申請評估中」群組 → 「rPP 產品線（五項）」群組。群組順序由 `labels` 陣列中第一次出現的順序決定。
- 頁面是淺色主題、繁體中文、有 SVG 圖示、階段用圓點步驟條、AI 進度用圓環。

## 資料欄位速查

```
{
  week, range, updated,
  prospects: [{ name, industry, stage(1接觸 2提案 3報價 4議約 5成交), update, topics[{title, tag, tagType(done|wait), points[]}], details[], link{label,url}, next, ask, change(new|up|down|done|same) }],
  keyClients: [{ client, project, status(green|yellow|red), progress, milestones[{name, done}], update, risk }],
  keyClientsNote,                       // keyClients 為空時顯示的一句話
  labels: [{ group, item, stage(1資料準備 2送件 3審查 4補件 5核發), expected, note, details[], change }],
  labelsNotes: { title, items[], conditions[], flow[{step, desc}], links[{label,url}] },
  ai: [{ name, progress, phase, done[], next[], blockers, need }],
  aiNote,
  shares: [{ title, meta, summary, points[], link{label,url} }]   // 選填；有資料才會顯示「資訊分享」區塊（放在 AI 開發之後）
}
```

## 目前狀態（2026-09-22）

- 週次編號依 Kayla 的定義，不是 ISO 週：W38 = 2026/09/07–09/11、W39 = 2026/09/14–09/18，之後依此類推。
- **每次 Kayla 報新進度都要新開一週，保留上一週資料，不可覆蓋**（除非她明說是同一週補充）。
- 三週資料：W40（2026/09/21–09/25，進行中，Kayla 會陸續補內容）、W39、W38。
- W40 新增「資訊分享」區塊（`shares`），第一則是 DPP 產品數位護照產業論壇，連結到 https://claude.ai/artifact/UpNRnG6Evn3rGBTfjUAi5o。
- 客戶開發（W39）：華邦電子（提案）、遠東銀行（提案，6 項需求）、本田通商（接觸，保桿再生造粒＋rPP 提袋，窗口為研發部 Chris 經理）、瀚克寶寶（報價）。WACOM 於 W39 依 Kayla 要求移除（W38 保留）。
- 重點客戶：本週無。
- 循環標誌：個案評估中 3 項（HDPE 瓶器、雨傘、PVC 地板）、rPP 五項（資料準備中；布料最齊，掛繩等東昌新版工廠登記，名片盒／識別證套卡在振順無工廠登記）。
- AI 開發：兩個專案都 0%，盤點與規劃階段。
