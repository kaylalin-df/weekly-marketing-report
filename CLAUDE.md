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
- 「客戶開發進度」標題**不放**「開發 dashboard」外部連結（Kayla 於 2026-10-02 要求移除，不要外連），也**不顯示**潛在客戶家數。
- 沒有「本週重點」和「需副總決策」欄位；決策事項寫在各客戶的 `ask`。
- 沒有接觸／提案／報價／議約／成交的數量統計列。
- 循環標誌區塊順序（Kayla 於 2026-10-02 調整）：「rPP 產品線（五項）」→「下一階段送件（規劃中）」→「個案申請評估中」放最下面。不放說明卡（`labelsNotes`，W39 起已刪）。群組順序由 `labels` 陣列中第一次出現的順序決定。
- 頁面是淺色主題、繁體中文、有 SVG 圖示、階段用圓點步驟條、AI 進度用圓環。

## 資料欄位速查（補充）

- `work: [{ name, status(進行中|已完成), done[], next[], blockers }]`：選填，「行銷工作進度」區塊（W47 起，Kayla 於 2026-11-13 要求把行銷工作台的工作內容放進週報），排在循環標誌之後、資訊分享之前。

## 資料欄位速查

```
{
  week, range, updated,
  outreach: { hint, stats[{label,value,sub}], monthly[{month,sent,open,click,reply,total}], monthlyNote, hot{title, counts[{value,label}], list[{name,note,status,tagType(done|wait)}]}, timeline[{date,text}], next, ask },   // 選填；「新客戶開發進度」（開發信成效），排在最前面
  prospects: [{ name, industry, stage(1接觸 2提案 3報價 4議約 5成交), update, topics[{title, tag, tagType(done|wait), points[]}], details[], link{label,url}, next, ask, change(new|up|down|done|same) }],
  keyClients: [{ client, project, status(green|yellow|red), progress, milestones[{name, done}], update, risk }],
  keyClientsNote,                       // keyClients 為空時顯示的一句話
  labels: [{ group, item, stage(1資料準備 2送件 3審查 4補件 5核發), expected, note, details[], change }],
  labelsNotes: { title, items[], conditions[], flow[{step, desc}], links[{label,url}] },
  ai: [{ name, progress, phase, done[], next[], blockers, need }],
  aiNote,
  shares: [{ title, meta, summary, points[], link{label,url} }]   // 選填；有資料才會顯示「資訊分享」區塊（放在循環標誌之後、AI 開發之前）
}
```

## 目前狀態（2026-10-05）

- 週次編號依 Kayla 的定義，不是 ISO 週：W38 = 2026/09/07–09/11、W39 = 2026/09/14–09/18，之後依此類推。
- **每次 Kayla 報新進度都要新開一週，保留上一週資料，不可覆蓋**（除非她明說是同一週補充）。
- 四週資料：W41（2026/09/28–10/02，Kayla 要求 10/3、10/5 的進度也放在 W41，先不要開 W42）、W40、W39、W38。
- W41 循環標誌：單紗布 10/3 被要求補件（附表 1-3）、10/5 已補件重送；多功能掛繩 10/3 被判不符紡織品類別規格，平台建議改個案申請。
- W41 新增「新客戶開發進度」區塊（outreach），放在最前面：開發信累計成效、每月成效、熱名單、開發歷程。資料來自 Kayla 貼的試算表截圖；**頁面是公開的，熱名單只放公司名與狀態，不放對接窗口姓名、電話、分機**。
- W40 新增「資訊分享」區塊（`shares`），第一則是 DPP 產品數位護照產業論壇，連結到 https://claude.ai/artifact/UpNRnG6Evn3rGBTfjUAi5o。
- 客戶開發（W41）：安斯泰莫台中（接觸，新客戶；報廢制服約 2,500 件、約 600 kg，請午洋做布纖熱壓板禮品 200～300 份，剩餘布料去化待決定）、遠東銀行（提案，等對方行銷部門內部討論；不推衣to衣，非大豐服務範疇，不要再提）、瀚克寶寶（報價；今年 800 kg PP 容器進全興廠＋300 個提袋＋簽約，明年接完整循環行銷服務）。**本田通商因無新進度於 W41 暫時隱藏**（資料留在 W40，有新進度時從 W40 複製回來）。華邦電子於 W41 刪除。WACOM 於 W39 移除。
- 重點客戶：本週無。
- 循環標誌：個案評估中 3 項（HDPE 瓶器、雨傘、PVC 地板）、rPP 五項（資料準備中；布料最齊，掛繩等東昌新版工廠登記，名片盒／識別證套卡在振順無工廠登記）。
- AI 開發：Kayla 於 2026-10-02 要求刪除此區塊。W41 起資料不放 `ai`（沒有 `ai` 欄位時，區塊、導覽列、hero 計數都不顯示）；之後新開的週次也不要加回來。W38～W40 的歷史資料保留。

## 目前狀態（2026-11-13）

- 新增 W47（2026/10/05–11/13，W42–W47 彙整），Kayla 要求把上個月到現在的進度一次放進來。
- 資料來源：行銷工作台（mh_* 工具：本週回報、任務、10/2・10/5・10/15・11/5 會議）＋陌生開發即時數據（`ESG consultant` 的 Apps Script stats API 與 `desk_api.py int-get` 互動紀錄）。
- outreach 的「點擊率」沿用 stats 的 anyClick（與 W41 口徑一致）。熱名單只放公司名與狀態。
- 新客戶：台灣日鑛金屬（PP 箱體回製中空板，長期布局）、年輕人眼鏡（11/19 來訪）；瀚克寶寶已先回簽報價單 → 成交，但回收與產品下單改到明年 2～3 月執行。安斯泰莫台中、遠東銀行於 W47 依 Kayla 要求拿掉（資料留在 W41，有新進度時從 W41 複製回來）。第一金控放在熱名單（10/27 線上會議，結果待補）。
- W47 循環標誌：單紗、複紗布料、識別證套、名片盒四項已通過（核發）；掛繩維持。單紗提袋、複紗提袋分別送件，以第二類 2-3 單一塑膠材料被退件，塑膠類承辦說應申請第一類紡織類，紡織類承辦 11/9 說內部討論後回覆，11/13 尚未收到。下一階段準備送 rPP 塑膠板材、歐邁嘉 rPET 帽子與 T-shirt，廠商資料索取中。
- W47 補充：歐邁嘉無法提供工廠登記等證明，rPET 帽子、T-shirt 暫緩；雨傘（資源循環署仍認定無法申請）、PVC 地板（環境部明確不接受 PVC）停止執行。四項放在最下面的「暫緩／停止」群組；個案評估只剩 HDPE 瓶器。
- W47 outreach 新增兩個選填欄位（index.html 已支援）：`note {title, text, points[]}`（統計格下方的說明卡）、`cards [{title, summary, img, alt, caption, points[]}]`（開發歷程後的圖文卡，圖片放 `assets/`）。
- 開信率口徑（Kayla 2026-11-13 要求）：開信含系統自動掃描，W47 起統計格顯示「實際開信率」（排除寄出後 3 分鐘內的開信，約 22%，以 10/12 前 678 封明細估算）與「真人點擊率」（stats 的 click）；每月表的點擊率也改用真人點擊。
- 通話工作台截圖 `assets/calldesk_1113.png`：已模糊窗口姓名、電話、Email。之後放截圖一律先遮個資（頁面公開）。
- outreach 可加 `nextHl: true`，「下一步」文字顯示為紅字（W47 起用於工讀生延後的說明）。
- W47 台灣日鑛金屬：依客戶 11/2 兩份包材處理說明（PDF 在 Kayla 的下載資料夾，會議上由 Kayla 開檔說明）改寫為兩階段（拆解回收約 2,700 箱、清潔回用）＋待解決議題＋「待討論確認事項」四題。頁面公開，不放 PDF 截圖、不寫台積電（用「南科的晶圓廠」）。`ask` 支援 `
` 換行。
