const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://erc.dev.fatalent.cn',
      changeOrigin: true
    })
  );
  app.use(
    '^/attachment',
    createProxyMiddleware({
      target: 'https://attachment.dev.fatalent.cn',
      changeOrigin: true
    })
  );

  app.use(
    '^/ui_components/exceed_components',
    createProxyMiddleware({
      target: 'http://ued.dev.fatalent.cn',
      changeOrigin: true
    })
  );

  app.use(
    '^/ui_components/components-core',
    createProxyMiddleware({
      target: 'http://ued.dev.fatalent.cn',
      changeOrigin: true
    })
  );
};
