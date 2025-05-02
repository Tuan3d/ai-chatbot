# Bắt đầu với AI Chatbot

Hướng dẫn chi tiết giúp bạn bắt đầu sử dụng và triển khai AI Chatbot.

## Yêu cầu hệ thống

- [Node.js](https://nodejs.org/) phiên bản 14.6.0 trở lên
- [Git](https://git-scm.com/) (để quản lý mã nguồn)
- Trình duyệt web hiện đại (Chrome, Firefox, Edge...)

## Cài đặt và chạy trên máy tính cá nhân

### Bước 1: Clone repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Chạy ứng dụng

```bash
npm run dev
```

Sau đó mở trình duyệt và truy cập: http://localhost:3000

## Cấu trúc dự án

```
/
├── app/                 # Thư mục chính của ứng dụng Next.js
│   ├── api/             # API endpoints
│   ├── components/      # React components
│   ├── utils/           # Utility functions
│   ├── globals.css      # CSS toàn cục
│   ├── layout.tsx       # Layout chính
│   └── page.tsx         # Trang chính
├── public/              # Tài nguyên tĩnh (hình ảnh, favicon...)
├── kienthuc.txt         # File chứa kiến thức cho chatbot
├── package.json         # Quản lý dependencies
└── README.md            # Thông tin dự án
```

## Tùy chỉnh chatbot

### Cập nhật kiến thức

Xem chi tiết trong file [HOW_TO_UPDATE.md](HOW_TO_UPDATE.md).

### Tùy chỉnh giao diện

1. **Màu sắc chủ đạo**: Chỉnh sửa file `tailwind.config.js` để thay đổi bảng màu.
2. **Layout**: Chỉnh sửa file `app/layout.tsx` và `app/page.tsx`.
3. **Components**: Tùy chỉnh các components trong thư mục `app/components/`.

### Cải thiện thuật toán tìm kiếm

Để cải thiện khả năng tìm kiếm và trả lời của chatbot:

1. Mở file `app/utils/knowledgeBase.ts`
2. Tùy chỉnh hàm `searchKnowledge` để cải thiện thuật toán tìm kiếm

## Triển khai

Chi tiết triển khai lên GitHub và Vercel xem tại [DEPLOYMENT.md](DEPLOYMENT.md).

## Giải quyết vấn đề

### Chatbot không tìm thấy thông tin

- Kiểm tra xem file `kienthuc.txt` đã có đầy đủ thông tin chưa
- Kiểm tra định dạng nội dung trong file (xem HOW_TO_UPDATE.md)
- Xem log trong Console của trình duyệt để tìm lỗi

### Lỗi khi triển khai lên Vercel

- Kiểm tra log build trên Vercel dashboard
- Đảm bảo tất cả dependencies đã được liệt kê trong package.json
- Kiểm tra cấu hình trong vercel.json (nếu có)

## Hỗ trợ và đóng góp

Nếu bạn gặp vấn đề hoặc muốn đóng góp cải tiến, vui lòng:

1. Tạo issue trên GitHub repository
2. Hoặc tạo pull request với cải tiến của bạn

## License

Dự án này được phân phối dưới giấy phép [MIT](LICENSE). 