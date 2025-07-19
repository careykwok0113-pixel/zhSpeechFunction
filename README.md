# zhSpeechFunction - Azure 語音朗讀評估 Function App

本專案是使用 Azure Function App 建立的語音評估後端 API，支援學生錄音後評分、教師分析使用行為。

---

## 🚀 功能特色

- 接收學生朗讀的音訊（Base64 編碼）
- 使用 Azure Speech Pronunciation Assessment API 進行評分
- 回傳 JSON 結果（含準確率、發音分析）
- 可記錄學生挑戰行為，支援 Application Insights 分析

---

## 📦 使用方式

### 📬 API 請求格式（POST）

```json
POST /api/pronAssess

{
  "referenceText": "友誼",
  "language": "zh-HK",
  "audio": "(Base64 編碼的 WAV 音訊)"
}
