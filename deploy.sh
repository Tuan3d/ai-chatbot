#!/bin/bash

# Script để đẩy thay đổi lên GitHub

# Đảm bảo đã đăng nhập GitHub
echo "Đảm bảo bạn đã đăng nhập GitHub (git config) trước khi chạy script này"
echo "------------------------------------------------------"

# Add tất cả thay đổi
git add .

# Commit với message
git commit -m "Fix: Sửa lỗi đọc file kienthuc.json và cải thiện hiệu suất"

# Push lên branch master
git push origin master

echo "------------------------------------------------------"
echo "Đã push tất cả thay đổi lên GitHub!"
echo "Truy cập https://github.com/Tuan3d/ai-chatbot để kiểm tra" 