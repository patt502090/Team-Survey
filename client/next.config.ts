module.exports = {
  crossOrigin: 'use-credentials', // Add crossOrigin attribute to <script> tags
  async headers() {
    return [
      {
        source: '/api/:path*', // Apply this to all API routes
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://localhost:3000', // Replace with the frontend URL if different
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE', // Allow methods as needed
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization', // Allow headers as needed
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true', // Enable credentials (cookies, authorization)
          },
        ],
      },
    ];
  },
};
