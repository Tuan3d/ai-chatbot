/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hỗ trợ import file JSON
  webpack(config) {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });
    return config;
  },
  // Đảm bảo cấu hình hiện tại vẫn được giữ nguyên
  reactStrictMode: true,
  swcMinify: true,
  env: {
    // Biến môi trường mặc định (sẽ bị override bởi .env.local)
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
  },
}

module.exports = nextConfig 