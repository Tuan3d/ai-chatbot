import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '../../utils/rateLimit';

// Danh sách từ cấm để chống spam đơn giản
const bannedWords = [
  'casino',
  'viagra',
  'xxx',
  'porn',
  'bet',
  'gambling',
  'sportsbet',
  'prescription',
  'lottery'
];

// Hàm kiểm tra nội dung spam
function containsBannedWords(text: string): boolean {
  const lowerText = text.toLowerCase();
  return bannedWords.some(word => lowerText.includes(word));
}

// Lưu trữ IP và timestamp để chống spam
const ipThrottling = new Map<string, number>();
const THROTTLE_TIME = 60000; // 1 phút giữa các lần gửi

// Rate limit: 5 requests per hour per IP
const limiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 500, // Max 500 users per hour
  limit: 5, // 5 requests per interval
});

// Cấu hình Telegram - Hardcode để đảm bảo hoạt động
// Thường không nên hardcode như thế này, nhưng đây là giải pháp tạm thời
const TELEGRAM_BOT_TOKEN = "7410040942:AAFlXTr8oCXwzRlThVpBfwzub2P8Ns7uq34";
const TELEGRAM_CHAT_ID = "6963178872";

export async function POST(request: NextRequest) {
  try {
    // Kiểm tra rate limit
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'anonymous';
    try {
      await limiter.check(5, ip);
    } catch {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Vui lòng thử lại sau.' },
        { status: 429 }
      );
    }

    // Kiểm tra giới hạn tần suất gửi
    const lastSendTime = ipThrottling.get(ip);
    const currentTime = Date.now();
    
    if (lastSendTime && (currentTime - lastSendTime) < THROTTLE_TIME) {
      return NextResponse.json(
        { error: 'Vui lòng đợi ít nhất 1 phút trước khi gửi góp ý tiếp theo' },
        { status: 429 }
      );
    }
    
    // Lấy dữ liệu từ request
    const { feedback, email } = await request.json();
    
    if (!feedback || feedback.trim() === '') {
      return NextResponse.json(
        { error: 'Nội dung góp ý không được để trống' },
        { status: 400 }
      );
    }
    
    // Kiểm tra độ dài và nội dung
    if (feedback.length > 1000) {
      return NextResponse.json(
        { error: 'Nội dung góp ý không được vượt quá 1000 ký tự' },
        { status: 400 }
      );
    }
    
    // Kiểm tra nội dung spam cơ bản
    if (containsBannedWords(feedback)) {
      return NextResponse.json(
        { error: 'Nội dung góp ý chứa từ không phù hợp' },
        { status: 400 }
      );
    }
    
    // Kiểm tra email
    if (email && typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email không hợp lệ' },
        { status: 400 }
      );
    }
    
    // Chuẩn bị gửi tin nhắn Telegram
    const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    // Chuẩn bị tin nhắn Telegram
    const emailInfo = email ? `\nEmail: ${email}` : '';
    const message = `📝 *PHẢN HỒI MỚI*\n\n${feedback}${emailInfo}\n\nIP: ${ip}`;
    
    // Gửi tin nhắn đến Telegram
    try {
      console.log('Đang gửi phản hồi đến Telegram:', { feedback, email });
      const response = await fetch(TELEGRAM_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Lỗi gửi tin nhắn Telegram:', errorData);
      } else {
        console.log('Đã gửi phản hồi thành công đến Telegram');
      }
    } catch (error) {
      console.error('Lỗi kết nối Telegram:', error);
      // Tiếp tục xử lý, không làm gián đoạn trải nghiệm người dùng
    }
    
    // Cập nhật thời gian gửi gần nhất để chống spam
    ipThrottling.set(ip, currentTime);
    
    // Xóa các IP cũ để tránh memory leak - cách tương thích ES5
    const fiveMinutesAgo = currentTime - 5 * 60 * 1000;
    const ipsToDelete: string[] = [];
    
    // Thu thập các IP cần xóa
    ipThrottling.forEach((timestamp, storedIp) => {
      if (timestamp < fiveMinutesAgo) {
        ipsToDelete.push(storedIp);
      }
    });
    
    // Xóa các IP cũ
    ipsToDelete.forEach(ipToDelete => {
      ipThrottling.delete(ipToDelete);
    });
    
    return NextResponse.json({ 
      success: true,
      message: 'Cảm ơn bạn đã gửi phản hồi!'
    });
  } catch (error) {
    console.error('Lỗi xử lý yêu cầu góp ý:', error);
    
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
} 