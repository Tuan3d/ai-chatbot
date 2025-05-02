# Hướng dẫn cập nhật kiến thức cho Chatbot AI

Chatbot AI này hoạt động bằng cách đọc và tìm kiếm thông tin từ file `kienthuc.txt`. Bạn có thể dễ dàng cập nhật kiến thức cho chatbot bằng cách sửa đổi file này.

## Định dạng dữ liệu

Bạn có thể thêm thông tin vào file `kienthuc.txt` theo hai cách:

### 1. Định dạng hỏi đáp

```
Hỏi: Câu hỏi của bạn?
Trả lời: Câu trả lời cho câu hỏi.
```

Ví dụ:
```
Hỏi: ChatGPT là gì?
Trả lời: ChatGPT là một mô hình ngôn ngữ lớn được phát triển bởi OpenAI, có khả năng tạo ra văn bản tự nhiên, trả lời câu hỏi và thực hiện nhiều tác vụ xử lý ngôn ngữ tự nhiên khác nhau.
```

### 2. Định dạng văn bản tự do

Bạn cũng có thể thêm đoạn văn bản thông thường, chatbot sẽ cố gắng tìm đoạn văn có liên quan nhất đến câu hỏi của người dùng.

Ví dụ:
```
Next.js là một framework phát triển web dựa trên React. Nó cung cấp các tính năng như Server-Side Rendering (SSR), Static Site Generation (SSG), API Routes, và nhiều tính năng khác giúp việc phát triển ứng dụng web trở nên đơn giản và hiệu quả hơn.
```

## Cách thêm kiến thức mới

### Thông qua GitHub Web Interface

1. Truy cập repository GitHub của bạn
2. Nhấp vào file `kienthuc.txt`
3. Nhấn vào biểu tượng bút chì (edit) ở góc trên bên phải của nội dung file
4. Thêm thông tin mới
5. Cuộn xuống dưới, điền thông tin commit và nhấn "Commit changes"

### Thông qua Git trên máy tính

1. Clone repository về máy tính (nếu chưa có)
2. Mở file `kienthuc.txt` bằng trình soạn thảo
3. Thêm thông tin mới
4. Lưu file
5. Mở terminal/command prompt và thực hiện các lệnh:
   ```bash
   git add kienthuc.txt
   git commit -m "Thêm kiến thức mới về [chủ đề]"
   git push
   ```

## Cách tổ chức nội dung hiệu quả

1. **Phân nhóm thông tin**: Tổ chức thông tin theo chủ đề để dễ quản lý
2. **Sử dụng từ khóa phù hợp**: Đảm bảo các câu hỏi và nội dung có chứa các từ khóa mà người dùng có thể sẽ tìm kiếm
3. **Định dạng nhất quán**: Giữ định dạng nhất quán để hệ thống dễ dàng tìm kiếm

## Lưu ý

- Sau khi cập nhật file `kienthuc.txt` và push lên GitHub, Vercel sẽ tự động triển khai lại website
- Thông tin trong file `kienthuc.txt` nên được viết bằng tiếng Việt có dấu để chatbot hoạt động tốt nhất
- Chatbot sẽ chỉ biết những thông tin mà bạn đã thêm vào file `kienthuc.txt`, nó không có khả năng tự tạo ra kiến thức mới 