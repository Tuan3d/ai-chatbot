/**
 * Triển khai rate limiting cơ bản
 * Giới hạn số lượng yêu cầu trong một khoảng thời gian
 */
export interface RateLimitOptions {
  interval: number; // Khoảng thời gian (ms)
  limit: number; // Số lượng yêu cầu tối đa trong khoảng thời gian
  uniqueTokenPerInterval: number; // Số lượng token duy nhất được theo dõi
}

interface TokenEntry {
  tokens: number;
  lastCheck: number;
  resetTime: number;
}

export function rateLimit(options: RateLimitOptions) {
  const { interval, limit, uniqueTokenPerInterval } = options;
  const tokenCache = new Map<string, TokenEntry>();

  // Xóa các token cũ để tránh memory leak
  const cleanup = () => {
    const now = Date.now();
    const tokensToDelete: string[] = [];

    tokenCache.forEach((entry, token) => {
      if (now > entry.resetTime) {
        tokensToDelete.push(token);
      }
    });

    tokensToDelete.forEach(token => {
      tokenCache.delete(token);
    });
  };

  // Đảm bảo không có quá nhiều token trong bộ nhớ
  const enforceLimit = () => {
    if (tokenCache.size > uniqueTokenPerInterval) {
      // Sắp xếp theo thời gian kiểm tra cuối cùng
      const sortedEntries = [...tokenCache.entries()].sort(
        (a, b) => a[1].lastCheck - b[1].lastCheck
      );
      
      // Xóa các mục cũ nhất
      const entriesToRemove = sortedEntries.slice(
        0,
        sortedEntries.length - uniqueTokenPerInterval
      );
      
      entriesToRemove.forEach(([token]) => {
        tokenCache.delete(token);
      });
    }
  };

  return {
    /**
     * Kiểm tra xem token đã vượt quá giới hạn chưa
     * @param allowedCount Số lượng request cho phép
     * @param token Token đại diện cho client (thường là IP)
     */
    check: async (allowedCount: number, token: string): Promise<void> => {
      cleanup();
      enforceLimit();
      
      const now = Date.now();
      const tokenCount = Math.min(allowedCount, limit);
      
      if (!tokenCache.has(token)) {
        // Tạo mục mới nếu token chưa tồn tại
        tokenCache.set(token, {
          tokens: tokenCount - 1, // Trừ đi request hiện tại
          lastCheck: now,
          resetTime: now + interval
        });
      } else {
        const entry = tokenCache.get(token)!;
        
        // Reset token nếu đã hết thời gian
        if (now > entry.resetTime) {
          entry.tokens = tokenCount - 1;
          entry.resetTime = now + interval;
        } else if (entry.tokens > 0) {
          // Giảm token
          entry.tokens -= 1;
        } else {
          // Rate limit vượt quá
          const resetInMs = entry.resetTime - now;
          throw new Error(
            `Rate limit exceeded, retry in ${Math.ceil(resetInMs / 1000)} seconds`
          );
        }
        
        entry.lastCheck = now;
        tokenCache.set(token, entry);
      }
    }
  };
} 