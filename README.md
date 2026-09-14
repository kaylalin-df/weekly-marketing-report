# 行銷週報 Dashboard

每週與副總行銷會議用的報告網頁，發佈於 GitHub Pages。

## 檔案結構

- `index.html`：公版頁面，平常不需修改。
- `data/weeks.js`：每週資料，一週一筆，新的一週放在陣列最前面。

## 每週更新流程

1. 用以下格式把重點內容傳給 Claude：

```
週次：2026-W39（9/21–9/25）
【客戶開發】
- A公司（家電，Kayla）：階段 議約 → 本週進展… → 下一步… → 待討論（需副總決定的事）…
【重點客戶】
- X客戶 專案名：綠燈 70%，本週…，風險…
【循環標誌】
- 產品Y：審查中，預計 11 月，備註…
【AI開發】
- AI報價助理 60%：本週完成…；下週…；阻礙…
```

2. 報告人是自己，資料裡不放負責人；Claude 會把長段內容潤飾成「需求項目卡」（標題＋狀態標籤＋2～3 句重點），再轉成 `data/weeks.js` 的一筆資料、本機檢查畫面，然後 commit & push。
3. GitHub Pages 約 1 分鐘後自動更新。

## 資料欄位

| 區塊 | 欄位 |
|---|---|
| prospects | name, industry, stage(1接觸 2提案 3報價 4議約 5成交), update(一句摘要), topics[{title, tag, tagType(done/wait), points[]}](需求項目卡), next, ask(待討論), change(new/up/down/done/same) |
| keyClients | client, project, status(green/yellow/red), progress(0-100), milestones[{name, done}], update, risk |
| labels | group(分組名), item, stage(1資料準備 2送件 3審查 4補件 5核發), expected, note(一句), details[](短條列), change |
| ai | name, progress, phase(階段標籤), done[], next[], blockers, need |

選填欄位：
- prospects / labels 每筆可加 `details[]`（條列細項）、prospects 可加 `link {label, url}`。
- 每區塊可加 `xxxNotes {title, items[], conditions[], flow[{step, desc}], links[]}` 補充說明卡（conditions 畫成編號格、flow 畫成流程圖）（prospectsNotes / keyClientsNotes / labelsNotes / aiNotes）。
- keyClients 或 ai 為空時，可用 `keyClientsNote` / `aiNote` 顯示一句說明。
