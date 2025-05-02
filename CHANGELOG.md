# Lịch sử cập nhật

## Phiên bản 1.0.0 (Ngày hiện tại)

### Thay đổi chính
- **Cấu trúc dữ liệu:** Chuyển từ định dạng dữ liệu TXT sang JSON để cấu trúc rõ ràng hơn
- **Giao diện người dùng:** 
  - Thêm chế độ tối (dark mode) mặc định
  - Tối ưu giao diện cho thiết bị di động
  - Cải thiện UI chuyên nghiệp hơn
  - Xóa dòng giới thiệu "tôi là chatbot AI..." và thay bằng lời chào đơn giản
- **Chức năng mới:**
  - Thêm chức năng gửi góp ý qua Telegram
  - Thêm bản quyền "Anh Tuan - Studio"

### Sửa lỗi
- Sửa lỗi bảo mật khi token Telegram bị lộ trong mã nguồn
- Sửa lỗi TypeScript trong ChatMessage.tsx liên quan đến thuộc tính 'inline'
- Sửa lỗi hiển thị trên một số thiết bị di động

### Cải tiến hiệu suất
- Tối ưu hóa mã nguồn
- Cải thiện thời gian tải trang 