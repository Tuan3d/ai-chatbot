import { NextRequest, NextResponse } from 'next/server';
import { searchKnowledge } from '@/app/utils/knowledgeBase';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Tin nhắn không hợp lệ' },
        { status: 400 }
      );
    }
    
    // Tìm kiếm câu trả lời từ cơ sở kiến thức
    const response = await searchKnowledge(message);
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Lỗi khi xử lý yêu cầu:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi xử lý yêu cầu' },
      { status: 500 }
    );
  }
} 