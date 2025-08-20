# Charts App - Full Stack Learning Project

> 一個使用 React + TypeScript + Vite 前端和 Python FastAPI 後端的圖表應用程式，用於學習全端開發。

- [中文版](./docs/README.zh-TW.md)
- [Python 學習路徑](./docs/python-learns.md)

## 專案結構

```
charts-app/
├── frontend/                 # React + Vite 前端應用
│   ├── src/                 # 前端源碼
│   ├── public/              # 靜態資源
│   └── package.json         # 前端依賴
├── backend/                 # Python FastAPI 後端
│   ├── app/                 # 後端應用
│   │   ├── main.py         # FastAPI 入口
│   │   ├── api/            # API 路由
│   │   ├── models/         # 數據模型
│   │   └── data/           # Mock 數據
│   └── requirements.txt    # Python 依賴
└── docs/                   # 文檔
    ├── README.zh-TW.md     # 中文說明
    └── python-learns.md    # Python 學習路徑
```

## Requirements

### 前端
* NodeJS v20+
* pnpm v9+

### 後端
* Python 3.8+
* pip 或 pipenv

## Overview

> Built with type safety, scalability, and developer experience in mind. A batteries included Vite + React template.

* [⚡️](https://vitejs.dev/)**[Vite 5](https://github.com/vitejs/vite)** : for project building and running the dev server

  * **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)** uses [SWC](https://swc.rs/) for Fast Refresh
* **[⚛️ ](https://reactjs.org/)[React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)**
* 🏄 **[React-router v7.5+](https://reactrouter.com/docs/en/v6/getting-started/overview)** : Declarative routing for React apps at any scale.
* **[shadcn/ui](https://ui.shadcn.com)** : for React UI Components
* **[Tailwind CSS](https://tailwindcss.com/)**：for styling
* **ESLint v9.5.0+**: for linting and formatting

  * **[@antfu/eslint-config](https://github.com/antfu/eslint-config/tree/main)**: This project uses `@antfu/eslint-config` as its base ESLint configuration to maintain code quality and consistency.
    * Auto fix for formatting (aimed to be used standalone without Prettier)
    * Powered by [eslint-plugin-command](https://github.com/antfu/eslint-plugin-command). It is not a typical rule for linting, but an on-demand micro-codemod tool that triggers by specific comments.
    * Style principle: Minimal for reading, stable for diff, consistent
      * Sorted imports, dangling commas
      * Using ESLint Stylistic
  * **[vite-plugin-eslint](https://www.npmjs.com/package/vite-plugin-eslint)** : Integrates ESLint into the Vite build process for on-the-fly linting.
* Vitest : for unit test

  * React Testing Library - A very light-weight, best practice first, solution for testing React components
  * MSW（Mock Service Worker） - Mocking API tools

## Getting Started

### 前端開發

1. 進入前端目錄
   ```bash
   cd frontend
   ```

2. 安裝依賴
   ```bash
   pnpm install
   ```

3. 啟動開發伺服器
   ```bash
   pnpm dev
   ```

### 後端開發

1. 進入後端目錄
   ```bash
   cd backend
   ```

2. 創建虛擬環境
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # 或
   venv\Scripts\activate     # Windows
   ```

3. 安裝依賴
   ```bash
   pip install -r requirements.txt
   ```

4. 啟動 FastAPI 伺服器
   ```bash
   uvicorn app.main:app --reload
   ```

### 學習路徑

請參考 [Python 學習路徑文檔](./docs/python-learns.md) 來逐步學習 FastAPI 後端開發。

## Testing

Unit testing is handled by React Testing Library and Vitest while End-to-End (E2E) Testing is conducted by Playwright.

If you'd like to run all tests, Unit and E2E alike, execute the following command:

```
pnpm run test
```

### Unit Testing

When running unit test scripts, it is assumed that unit tests will be colocated with the source files. Take a look at the placeholder README file in `src/components` for [an example](src/components/README.md).

If you'd like to execute unit tests specifically, the below command will execute vitest:

```
pnpm run test:unit
```

If instead you are interested in coverage reporting, run:

```
pnpm run coverage
```


## License

No License. You can use this starter as you wish.
