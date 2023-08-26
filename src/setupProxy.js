const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Change this path to match the API endpoint
    createProxyMiddleware({
      target: 'https://ap-south-1.aws.data.mongodb-api.com', // MongoDB Data API URL
      changeOrigin: true,
      secure: false, // This might be needed if the API has issues with SSL certificates
    })
  );
};
