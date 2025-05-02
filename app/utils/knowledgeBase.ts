import knowledgeBaseData from '../../kienthuc.json';

interface KnowledgeItem {
  question: string;
  answer: string;
}

// Hàm đọc nội dung từ file kienthuc.json
export async function readKnowledgeBase(): Promise<KnowledgeItem[]> {
  try {
    return knowledgeBaseData as KnowledgeItem[];
  } catch (error) {
    console.error('Lỗi khi đọc dữ liệu kiến thức:', error);
    return [];
  }
}

// Hàm tìm kiếm thông tin liên quan từ cơ sở kiến thức
export async function searchKnowledge(query: string): Promise<string> {
  const knowledgeItems = await readKnowledgeBase();
  if (!knowledgeItems.length) return 'Không tìm thấy thông tin.';

  // Tiền xử lý câu hỏi
  const normalizedQuery = query.toLowerCase().trim();
  
  // Tìm kiếm câu hỏi khớp chính xác
  const exactMatch = knowledgeItems.find(
    item => item.question.toLowerCase() === normalizedQuery
  );
  
  if (exactMatch) {
    return exactMatch.answer;
  }
  
  // Tìm kiếm câu hỏi chứa query
  const partialMatch = knowledgeItems.find(
    item => item.question.toLowerCase().includes(normalizedQuery)
  );
  
  if (partialMatch) {
    return partialMatch.answer;
  }
  
  // Tìm kiếm câu trả lời chứa query
  const answerMatch = knowledgeItems.find(
    item => item.answer.toLowerCase().includes(normalizedQuery)
  );
  
  if (answerMatch) {
    return answerMatch.answer;
  }
  
  // Tìm kiếm theo từ khóa
  const keywords = normalizedQuery.split(' ')
    .filter(word => word.length > 3); // Chỉ lấy từ có độ dài > 3
    
  if (keywords.length > 0) {
    // Tạo mảng các item với số từ khóa khớp
    const scoredItems = knowledgeItems.map(item => {
      const questionScore = keywords.reduce((score, keyword) => 
        score + (item.question.toLowerCase().includes(keyword) ? 1 : 0), 0);
      const answerScore = keywords.reduce((score, keyword) => 
        score + (item.answer.toLowerCase().includes(keyword) ? 1 : 0), 0);
      return { item, score: questionScore + answerScore };
    });
    
    // Sắp xếp theo điểm và lấy item có điểm cao nhất
    scoredItems.sort((a, b) => b.score - a.score);
    
    if (scoredItems[0].score > 0) {
      return scoredItems[0].item.answer;
    }
  }
  
  return 'Xin lỗi, tôi không tìm thấy thông tin liên quan đến câu hỏi của bạn trong cơ sở kiến thức.';
}

// Helper function để escape các ký tự đặc biệt trong regex
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Đếm số lần xuất hiện của từ khóa trong văn bản
function countKeywordOccurrences(text: string, keyword: string): number {
  const regex = new RegExp(escapeRegExp(keyword), 'g');
  const matches = text.match(regex);
  return matches ? matches.length : 0;
} 