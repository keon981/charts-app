# Python FastAPI 學習路徑

## 專案目標
學習使用 Python FastAPI 創建後端 API，將 mock 數據透過 RESTful API 提供給前端使用。

## 專案結構
```
charts-app/
├── frontend/                 # React + Vite 前端
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/                  # FastAPI 後端
│   ├── app/
│   │   ├── main.py          # FastAPI 應用入口
│   │   ├── api/             # API 路由
│   │   ├── models/          # 數據模型
│   │   └── data/            # Mock 數據
│   └── requirements.txt
└── docs/
    └── python-learns.md     # 本文檔
```

## 學習階段

### 階段 1: 環境設置
- [ ] 安裝 Python 3.8+ 
- [ ] 創建虛擬環境
- [ ] 安裝 FastAPI 和相關依賴
- [ ] 驗證環境設置

**目標**: 建立可運行的 Python 開發環境

### 階段 2: FastAPI 基礎
- [ ] 創建第一個 FastAPI 應用
- [ ] 理解路由 (Routes) 概念
- [ ] 學習 HTTP 方法 (GET, POST, PUT, DELETE)
- [ ] 測試 API 端點

**目標**: 能夠創建簡單的 API 端點並測試

### 階段 3: 數據處理
- [ ] 讀取 JSON 檔案
- [ ] 創建數據模型 (Pydantic Models)
- [ ] 數據驗證和序列化
- [ ] 錯誤處理

**目標**: 能夠處理和驗證 JSON 數據

### 階段 4: API 設計
- [ ] 設計 RESTful API 結構
- [ ] 實作圖表數據 API 端點
- [ ] 添加查詢參數 (Query Parameters)
- [ ] API 文檔自動生成

**目標**: 完整的圖表數據 API

### 階段 5: 前後端整合
- [ ] 設置 CORS (跨域資源共享)
- [ ] 修改前端代碼調用 API
- [ ] 處理異步請求
- [ ] 錯誤處理和載入狀態

**目標**: 前端成功從後端 API 獲取數據

### 階段 6: 進階功能
- [ ] 添加中間件 (Middleware)
- [ ] 實作日誌記錄
- [ ] 性能優化
- [ ] 部署準備

**目標**: 生產就緒的 API 服務

## 學習資源

### 官方文檔
- [FastAPI 官方文檔](https://fastapi.tiangolo.com/)
- [Pydantic 文檔](https://pydantic-docs.helpmanual.io/)

### 推薦教程
- FastAPI 官方教程
- Python 虛擬環境管理
- RESTful API 設計原則

## 實作檢查點

### 檢查點 1: Hello World API
```python
# 能夠運行並返回 "Hello World"
@app.get("/")
def read_root():
    return {"message": "Hello World"}
```

### 檢查點 2: 圖表數據 API
```python
# 能夠返回圖表數據
@app.get("/api/charts/area-data")
def get_area_chart_data():
    return area_chart_data
```

### 檢查點 3: 前端整合
- 前端能夠成功調用後端 API
- 圖表正常顯示從 API 獲取的數據

## 常見問題與解決方案

### Q: 如何解決 CORS 錯誤？
A: 安裝並配置 `fastapi-cors` 中間件

### Q: 如何處理大型 JSON 檔案？
A: 使用異步檔案讀取和數據分頁

### Q: 如何優化 API 性能？
A: 實作數據快取和壓縮

## 下一步學習方向
- 數據庫整合 (SQLAlchemy)
- 身份驗證和授權
- API 測試 (pytest)
- 容器化部署 (Docker)
