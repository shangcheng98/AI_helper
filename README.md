# shangchengAI

shangchengAI 是一个网页版 AI 助手，界面风格类似 ChatGPT，但使用灰色系配色。它仅回答与德国外管局（Ausländerbehörde）相关的问题，并通过 OpenAI API 生成回复。

## 功能
- ChatGPT 风格的灰色主题单页聊天界面
- 调用 OpenAI Chat Completions API
- 仅回答德国外管局相关问题（关键词过滤 + 系统提示约束）

## 本地运行

### 1. 安装依赖
```bash
npm install
```

### 2. 配置环境变量
```bash
cp .env.example .env
```
编辑 `.env`，填写你的 `OPENAI_API_KEY`。

### 3. 启动服务
```bash
npm run dev
```

服务默认运行在 `http://localhost:3000`。

## 使用说明
1. 在浏览器打开 `http://localhost:3000`
2. 在输入框中输入与德国外管局相关的问题
3. 系统将调用 OpenAI 并返回回答

## 限制
- 如果输入内容与德国外管局无关，会返回拒答提示。
- 请确保你的 OpenAI API Key 有效且具备访问权限。
