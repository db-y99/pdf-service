# PDF Service

Microservice riêng để generate PDF từ HTML sử dụng Puppeteer.

## Quick Start

### 1. Cài đặt dependencies
```bash
cd pdf-service
npm install
```

### 2. Chạy service (Windows)
```bash
# Cách 1: Dùng batch file
start-dev.bat

# Cách 2: Dùng npm
npm run dev
```

### 3. Test service (Windows)
```bash
# Chạy test script
test-service.bat

# Hoặc manual
node test.js
```

Service chạy tại: **http://localhost:3001**

## API Endpoints

### GET /health
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "service": "pdf-generator"
}
```

### POST /generate
Generate PDF từ HTML

**Request:**
```json
{
  "html": "<html>...</html>"
}
```

**Response:** PDF file (application/pdf)

## Test Manual

```bash
# Health check
curl http://localhost:3001/health

# Generate PDF
curl -X POST http://localhost:3001/generate \
  -H "Content-Type: application/json" \
  -d "{\"html\":\"<h1>Test PDF</h1>\"}" \
  --output test.pdf
```

## Integration với Next.js

File `lib/pdf-generator.ts` đã được cập nhật để gọi PDF service:

```typescript
// Tự động gọi http://localhost:3001/generate
const buffer = await generatePDFFromHTML(contractHTML);
```

Environment variable trong `.env.local`:
```bash
PDF_SERVICE_URL=http://localhost:3001
```

## Deploy lên Railway

Chi tiết xem file `DEPLOY.md`

## Architecture

- `src/browser.ts` - Browser singleton (tránh launch nhiều lần)
- `src/pdf-generator.ts` - Logic generate PDF
- `src/server.ts` - Express API server (port 3001)
- `Dockerfile` - Docker config với Chromium + fonts

## Troubleshooting

### Service không start được
```bash
# Kiểm tra port 3001 có bị chiếm không
netstat -ano | findstr :3001

# Kill process nếu cần
taskkill /PID <PID> /F
```

### Lỗi Puppeteer
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Test không pass
```bash
# Kiểm tra service đang chạy
curl http://localhost:3001/health

# Check logs trong terminal chạy npm run dev
```
