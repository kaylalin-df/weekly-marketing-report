// ============================================================
// 每週行銷會議報告資料
// 每週新增一筆物件放在陣列「最前面」，網頁預設顯示第一筆。
// 欄位說明見 README.md
// ============================================================
window.WEEKLY_DATA = [
  {
    week: "2026-W38",
    range: "2026/09/14 – 09/18",
    updated: "2026/09/14",
    highlights: [
      "示範資料：本週新增 2 家潛在客戶進入提案階段，pipeline 共 6 家。",
      "示範資料：A 客戶回收再生料專案進入量產驗證，預計 10 月完成。",
      "示範資料：AI 報價助理完成第一版，下週內部試用。"
    ],
    decisions: [
      { title: "B 公司報價折扣授權", detail: "對方要求量價折扣 8%，超出業務授權範圍，需副總核定。", due: "9/19" },
      { title: "循環標誌第三方檢測預算", detail: "產品 Y 檢測費用約 NT$120K，需確認是否本季執行。", due: "9/26" }
    ],
    prospects: [
      { name: "A 公司", industry: "家電", stage: 4, owner: "Kayla", update: "完成第二輪議約，對方法務審合約中", next: "9/20 前回覆合約修訂", change: "up" },
      { name: "B 公司", industry: "包材", stage: 3, owner: "Kayla", update: "報價已送出，對方要求折扣", next: "等副總核定折扣後回覆", change: "same" },
      { name: "C 公司", industry: "汽車零件", stage: 2, owner: "Sam", update: "完成提案簡報，對方採購主管有興趣", next: "安排工廠參訪", change: "up" },
      { name: "D 公司", industry: "建材", stage: 2, owner: "Sam", update: "初步提案，需補充 PCR 料規格書", next: "下週補件", change: "new" },
      { name: "E 公司", industry: "紡織", stage: 1, owner: "Kayla", update: "展會認識，已寄公司簡介", next: "約線上會議", change: "new" },
      { name: "F 公司", industry: "電子", stage: 1, owner: "Sam", update: "對方暫無需求，保持聯繫", next: "Q4 再追", change: "down" }
    ],
    keyClients: [
      {
        client: "X 客戶", project: "再生 PP 料導入量產", status: "green", progress: 70,
        milestones: [
          { name: "樣品認證", done: true }, { name: "小量試產", done: true },
          { name: "量產驗證", done: false }, { name: "正式供貨", done: false }
        ],
        update: "量產驗證第一批 5 噸已出貨，客戶回饋物性符合規格。",
        risk: "無"
      },
      {
        client: "Y 客戶", project: "包材減碳方案", status: "yellow", progress: 40,
        milestones: [
          { name: "需求訪談", done: true }, { name: "方案提出", done: true },
          { name: "碳足跡計算", done: false }, { name: "客戶簽核", done: false }
        ],
        update: "碳足跡計算需客戶提供上游數據，對方窗口回覆延遲。",
        risk: "時程可能延後 2 週，已向對方主管反映。"
      },
      {
        client: "Z 客戶", project: "年度回收合約續約", status: "red", progress: 20,
        milestones: [
          { name: "續約提案", done: true }, { name: "價格談判", done: false },
          { name: "合約簽署", done: false }
        ],
        update: "對方比價後認為我方價格偏高，要求降價 10%。",
        risk: "有流失風險，建議副總出面與對方高層洽談。"
      }
    ],
    labels: [
      { item: "產品 Y（再生 PET 片材）", stage: 3, expected: "2026/11", owner: "Kayla", note: "審查中，主管機關要求補充來源證明", change: "same" },
      { item: "產品 W（再生 PP 粒）", stage: 2, expected: "2026/12", owner: "Sam", note: "本週已送件", change: "up" },
      { item: "產品 V（再生 HDPE 粒）", stage: 1, expected: "2027/Q1", owner: "Sam", note: "整理第三方檢測報告中", change: "new" },
      { item: "產品 U（再生 PVC 地板）", stage: 5, expected: "已核發", owner: "Kayla", note: "9/10 取得證書", change: "done" }
    ],
    ai: [
      {
        name: "AI 報價助理", progress: 60,
        done: ["完成報價規則整理與第一版 prompt", "串接產品資料庫"],
        next: ["內部業務試用一週", "收集回饋修正"],
        blockers: "", need: ""
      },
      {
        name: "客戶開發線索自動整理", progress: 35,
        done: ["完成展會名單匯入格式", "測試自動分類產業別"],
        next: ["加入 CRM 同步"],
        blockers: "CRM API 權限尚未開通", need: "需 IT 協助開 API 權限"
      },
      {
        name: "碳足跡計算小工具", progress: 85,
        done: ["完成計算邏輯驗證", "UI 調整"],
        next: ["提供 Y 客戶試用"],
        blockers: "", need: ""
      }
    ]
  },
  {
    week: "2026-W37",
    range: "2026/09/07 – 09/11",
    updated: "2026/09/07",
    highlights: [
      "示範資料：上週版本，用來測試週次切換。",
      "示範資料：產品 U 循環標誌核發。"
    ],
    decisions: [],
    prospects: [
      { name: "A 公司", industry: "家電", stage: 3, owner: "Kayla", update: "報價送出", next: "議約", change: "up" },
      { name: "B 公司", industry: "包材", stage: 3, owner: "Kayla", update: "報價準備中", next: "送出報價", change: "same" },
      { name: "C 公司", industry: "汽車零件", stage: 1, owner: "Sam", update: "初次接觸", next: "提案", change: "new" },
      { name: "F 公司", industry: "電子", stage: 2, owner: "Sam", update: "提案中", next: "等回覆", change: "same" }
    ],
    keyClients: [
      {
        client: "X 客戶", project: "再生 PP 料導入量產", status: "green", progress: 55,
        milestones: [
          { name: "樣品認證", done: true }, { name: "小量試產", done: true },
          { name: "量產驗證", done: false }, { name: "正式供貨", done: false }
        ],
        update: "小量試產完成。", risk: "無"
      }
    ],
    labels: [
      { item: "產品 Y（再生 PET 片材）", stage: 3, expected: "2026/11", owner: "Kayla", note: "審查中", change: "same" },
      { item: "產品 U（再生 PVC 地板）", stage: 5, expected: "已核發", owner: "Kayla", note: "取得證書", change: "done" }
    ],
    ai: [
      { name: "AI 報價助理", progress: 45, done: ["整理報價規則"], next: ["串接產品資料庫"], blockers: "", need: "" }
    ]
  }
];
