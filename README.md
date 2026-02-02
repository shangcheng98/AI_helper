# AI Helper

This repository contains a simple API server that exposes `POST /api/chat` and forwards messages to the OpenAI API with a system prompt that restricts responses to German Ausländerbehörde topics.

## Setup

1. Install dependencies:

   ```bash
   cd server
   npm install
   ```

2. Create a `.env` file in `server/` (or export environment variables) with your OpenAI credentials:

   ```bash
   OPENAI_API_KEY=your_api_key_here
   # Optional: override the default model
   OPENAI_MODEL=gpt-4o-mini
   # Optional: override the port
   PORT=3001
   ```

3. Start the server:

   ```bash
   npm start
   ```

## API

**POST** `/api/chat`

Request body:

```json
{
  "message": "Ich möchte meinen Aufenthaltstitel verlängern."
}
```

Response:

```json
{
  "reply": "..."
}
```
