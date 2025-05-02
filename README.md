# AI Chatbot với Kiến thức Y tế

Chatbot AI chạy hoàn toàn trên frontend, phân tích và trả lời dựa trên dữ liệu từ file `kienthuc.json`.

## Tính năng

* 💬 Giao diện chat thân thiện, dễ sử dụng
* 🔍 Tìm kiếm thông tin từ kiến thức y tế trong `kienthuc.json`
* 🧠 Hoạt động hoàn toàn trên frontend, không cần API bên ngoài
* 🌓 Hỗ trợ chế độ sáng/tối tự động
* 📱 Thiết kế responsive, hiển thị tốt trên mọi thiết bị

## Cách hoạt động

Chatbot sử dụng phương pháp RAG (Retrieval Augmented Generation) đơn giản:

1. Đọc cơ sở kiến thức từ file `kienthuc.json`
2. Tìm kiếm thông tin liên quan đến câu hỏi
3. Trả về thông tin phù hợp nhất

## Cài đặt và chạy

1. Clone repository:

```bash
git clone https://github.com/Tuan3d/ai-chatbot.git
cd ai-chatbot
```

2. Cài đặt dependencies:

```bash
npm install
```

3. Chạy ứng dụng ở môi trường development:

```bash
npm run dev
```

4. Để build cho production:

```bash
npm run build
npm start
```

## Chỉnh sửa cơ sở kiến thức

Để thêm, sửa kiến thức, chỉnh sửa file `kienthuc.json` theo định dạng:

```json
[
  {
    "question": "Câu hỏi?",
    "answer": "Câu trả lời."
  },
  ...
]
```

## Triển khai

Dự án này có thể được triển khai miễn phí trên Vercel:

1. Fork repository này
2. Kết nối với Vercel
3. Triển khai

## Phát triển

1. Tạo branch mới cho tính năng của bạn
2. Commit các thay đổi
3. Tạo Pull Request

## License

MIT 