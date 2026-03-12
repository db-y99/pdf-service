# Setup PDF Service cho Short Loan Project

## Tổng quan

PDF Service là microservice riêng để generate PDF từ HTML, thay thế Puppeteer chạy trực tiếp trong Next.js app.

**Lợi ích:**
- Tách biệt logic PDF generation
- Tránh memory leak của Puppeteer trong Next.js
- Dễ scale và deploy riêng
- Browser singleton để tối ưu performance

## Setup Local Development

### 1. Cài đặt PDF Service

```bash
cd pdf-service
npm install
```

### 2. Start PDF Service

```bash
# Windows
start-dev.bat

# Linux/Mac
npm run dev
```

Service sẽ chạy tại: **http://localhost:3001**

### 3. Cấu hình Next.js App

File `.env.local` đã được cập nhật:
```bash
PDF_SERVICE_URL=http://localhost:3001
```

File `lib/pdf-generator.ts` đã được cập nhật để gọi PDF service thay vì Puppeteer local.

### 4. Test Integration

```bash
# Terminal 1: Start PDF Service
cd pdf-service
npm run dev

# Terminal 2: Start Next.js App
cd ..
npm run dev

# Terminal 3: Test PDF Service
cd pdf-service
node test.js
```

## Workflow Development

1. **Start PDF Service trước**: `cd pdf-service && npm run dev`
2. **Start Next.js App**: `npm run dev`
3. **Test tạo hợp đồng** trong Next.js app
4. **Check logs** trong terminal PDF service

## Deploy Production

### Local → Railway

1. **Deploy PDF Service lên Railway** (xem `DEPLOY.md`)
2. **Lấy URL** từ Railway (ví dụ: `https://pdf-service-production-xxxx.up.railway.app`)
3. **Cập nhật Vercel env**:
   ```bash
   vercel env add PDF_SERVICE_URL production
   # Nhập: https://pdf-service-production-xxxx.up.railway.app
   ```
4. **Redeploy Next.js app** trên Vercel

### Environment Variables

| Environment | PDF_SERVICE_URL |
|-------------|-----------------|
| Local | `http://localhost:3001` |
| Production | `https://pdf-service-production-xxxx.up.railway.app` |

## Troubleshooting

### PDF Service không start
```bash
# Check port 3001
netstat -ano | findstr :3001

# Kill process if needed
taskkill /PID <PID> /F

# Reinstall
rm -rf node_modules
npm install
```

### Next.js không connect được PDF Service
```bash
# Check PDF service health
curl http://localhost:3001/health

# Check .env.local
cat .env.local | grep PDF_SERVICE_URL

# Check Next.js logs
npm run dev
```

### PDF generation lỗi
```bash
# Check PDF service logs
# Trong terminal chạy npm run dev

# Test PDF service riêng
cd pdf-service
node test.js
```

## File Structure

```
pdf-service/
├── src/
│   ├── browser.ts          # Browser singleton
│   ├── pdf-generator.ts    # PDF generation logic
│   └── server.ts           # Express API (port 3001)
├── Dockerfile              # Docker config
├── package.json            # Dependencies
├── test.js                 # Test script
├── start-dev.bat          # Windows start script
└── README.md              # Documentation
```

## Next Steps

1. ✅ PDF Service setup local
2. ✅ Next.js integration
3. 🔄 Test tạo hợp đồng
4. 🔄 Deploy lên Railway
5. 🔄 Update production env