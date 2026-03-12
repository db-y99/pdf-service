# Deploy PDF Service lên Railway

## Bước 1: Chuẩn bị

1. Tạo tài khoản Railway: https://railway.app
2. Push code lên GitHub repo

## Bước 2: Deploy

### Cách 1: Deploy từ GitHub (Recommended)

1. Vào Railway Dashboard → **New Project**
2. Chọn **Deploy from GitHub repo**
3. Chọn repo của bạn
4. Railway sẽ tự động detect Dockerfile
5. Nếu không tự detect:
   - Vào Settings → Build
   - Set **Root Directory** = `pdf-service`
   - Set **Dockerfile Path** = `Dockerfile`
6. Click **Deploy**

### Cách 2: Deploy từ CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
cd pdf-service
railway init
railway up
```

## Bước 3: Lấy URL

1. Sau khi deploy xong, vào **Settings → Networking**
2. Click **Generate Domain**
3. Copy URL (ví dụ: `https://pdf-service-production-xxxx.up.railway.app`)

## Bước 4: Cập nhật Next.js

### Local (.env.local)
```bash
PDF_SERVICE_URL=https://pdf-service-production-xxxx.up.railway.app
```

### Vercel (Production)
```bash
# Thêm environment variable trên Vercel Dashboard
# Hoặc dùng CLI:
vercel env add PDF_SERVICE_URL production
# Nhập: https://pdf-service-production-xxxx.up.railway.app
```

## Bước 5: Test

```bash
# Health check
curl https://your-pdf-service.railway.app/health

# Generate PDF
curl -X POST https://your-pdf-service.railway.app/generate \
  -H "Content-Type: application/json" \
  -d '{"html":"<h1>Test</h1>"}' \
  --output test.pdf
```

## Monitoring

- **Logs**: Railway Dashboard → Logs
- **Metrics**: Railway Dashboard → Metrics
- **Restart**: Railway Dashboard → Settings → Restart

## Pricing

- **Free tier**: $5 credit/month (~500 hours)
- **Hobby**: $5/month (unlimited hours)
- **Pro**: $20/month (team features)

## Troubleshooting

### Lỗi: Chromium not found
```bash
# Kiểm tra Dockerfile đã install chromium
# Check logs: railway logs
```

### Lỗi: Timeout
```bash
# Tăng timeout trong Railway Settings
# Hoặc optimize HTML (giảm size)
```

### Lỗi: Out of memory
```bash
# Upgrade plan
# Hoặc check browser singleton đang hoạt động đúng
```

### Lỗi: Port already in use
```bash
# Railway tự động set PORT env variable
# Code đã handle: process.env.PORT || 3000
```

## Tips

1. **Browser Singleton**: Code đã implement browser singleton để tránh launch nhiều lần
2. **Memory**: Mỗi request dùng ~100-200MB RAM
3. **Cold Start**: Lần đầu sau khi idle có thể mất 5-10s
4. **Logs**: Luôn check logs để debug
