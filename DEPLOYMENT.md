# Hướng dẫn triển khai ChatBot AI

## Triển khai lên GitHub và Vercel

### 1. Đẩy code lên GitHub

Sử dụng các lệnh sau để đẩy code lên GitHub:

```bash
# Đảm bảo đã đăng nhập GitHub (git config) trước khi chạy các lệnh

# Add tất cả thay đổi
git add .

# Commit với message
git commit -m "Fix: Sửa lỗi đọc file kienthuc.json và cải thiện hiệu suất"

# Push lên branch master
git push origin master
```

### 2. Triển khai trên Vercel

1. Đăng nhập vào [Vercel](https://vercel.com)
2. Nhấp vào "Add New" > "Project"
3. Chọn repository GitHub của bạn
4. Giữ cấu hình mặc định và nhấp "Deploy"

## Lỗi đã sửa

1. **Lỗi cú pháp trong file kienthuc.json**: Đã xóa dòng `ilyen` và sửa các lỗi format JSON
2. **Lỗi đọc file filesystem trên Vercel**: Đã chuyển sang import trực tiếp file JSON
3. **Cập nhật cấu hình**: Đã thêm hỗ trợ import JSON trong webpack

## Kiểm tra ứng dụng

1. Chạy ứng dụng trong môi trường development:
```bash
npm run dev
```

2. Build ứng dụng cho production:
```bash
npm run build
npm start
```

3. Truy cập ứng dụng tại http://localhost:3000 