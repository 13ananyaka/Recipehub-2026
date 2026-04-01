const http = require('http');

const proxyRequest = (req, res, targetPort) => {
  const options = {
    hostname: 'localhost',
    port: targetPort,
    path: req.originalUrl,
    method: req.method,
    headers: {
      'Content-Type': req.headers['content-type'] || 'application/json',
      ...req.headers
    }
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error('Proxy error:', err);
    res.status(502).json({ error: 'Bad Gateway' });
  });

  req.pipe(proxyReq);
};

module.exports = { proxyRequest };
