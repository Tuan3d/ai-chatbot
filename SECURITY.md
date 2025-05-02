# Hướng dẫn bảo mật

## Xử lý rò rỉ token Telegram

Token Telegram đã bị lộ trong mã nguồn. Bạn nên thực hiện các bước sau ngay lập tức:

1. **Hủy token cũ**:
   - Truy cập và chat với [@BotFather](https://t.me/botfather) trên Telegram
   - Sử dụng lệnh `/revoke` và chọn bot của bạn
   - BotFather sẽ tạo token mới cho bot

2. **Cập nhật token mới**:
   - Tạo file `.env.local` (đã được thêm vào .gitignore)
   - Thêm token mới vào file `.env.local`:
     ```
     TELEGRAM_BOT_TOKEN=your_new_token_here
     TELEGRAM_CHAT_ID=your_chat_id_here
     ```

3. **Cấu hình triển khai**:
   - Nếu sử dụng Vercel/Netlify, hãy thêm các biến môi trường trong bảng điều khiển
   - Với các máy chủ khác, hãy cấu hình biến môi trường theo quy trình của máy chủ đó

4. **Hạn chế quyền của bot** (tùy chọn):
   - Xem xét giới hạn quyền của bot chỉ cho các tác vụ cần thiết
   - Tránh sử dụng bot cho các tính năng nhạy cảm khác

## Các thực hành tốt

- **Không bao giờ** commit token, khóa API hoặc thông tin xác thực vào mã nguồn
- Luôn sử dụng biến môi trường cho thông tin nhạy cảm
- Cân nhắc sử dụng các công cụ như [git-secrets](https://github.com/awslabs/git-secrets) để ngăn commit thông tin nhạy cảm
- Định kỳ thay đổi token và khóa API

## Báo cáo lỗ hổng bảo mật

Nếu bạn phát hiện lỗ hổng bảo mật trong mã nguồn này, vui lòng liên hệ trực tiếp với người duy trì dự án qua email hoặc kênh liên lạc khác. 