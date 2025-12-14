import http from 'http';
import { stat } from 'fs/promises';
import { createReadStream } from 'fs';
import path from 'path';
import url from 'url';

const root = process.cwd();

// Replace with your OpenAI API key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'your-openai-api-key-here';

const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon'
};

async function callOpenAI(message) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant for FRAM, a sustainable food delivery service that partners with local farms. Help customers with questions about products, delivery, partnerships with farms, and sustainability practices.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

const server = http.createServer(async (req, res) => {
  try {
    const parsed = url.parse(req.url);
    let urlPath = decodeURIComponent(parsed.pathname || '/');

    // Handle chat API endpoint
    if (urlPath === '/api/chat' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', async () => {
        try {
          const { message } = JSON.parse(body);
          const reply = await callOpenAI(message);
          
          res.writeHead(200, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(JSON.stringify({ reply }));
        } catch (error) {
          console.error('Chat error:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            error: 'Failed to get response',
            message: error.message 
          }));
        }
      });
      return;
    }

    // Serve static files
    if (urlPath === '/') urlPath = '/index.html';

    const filePath = path.join(root, urlPath);
    const s = await stat(filePath);

    if (s.isDirectory()) {
      const idx = path.join(filePath, 'index.html');
      try {
        await stat(idx);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return createReadStream(idx).pipe(res);
      } catch {
        res.writeHead(403).end('Directory listing disabled');
        return;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    createReadStream(filePath).pipe(res);
  } catch {
    res.writeHead(404).end('Not found');
  }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Serving ${root} on http://localhost:${PORT}`);
  console.log(`Chat API available at http://localhost:${PORT}/api/chat`);
});
