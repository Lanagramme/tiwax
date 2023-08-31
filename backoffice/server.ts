import { serve } from 'https://deno.land/std/http/server.ts';
import { acceptWebSocket, acceptable } from 'https://deno.land/std/ws/mod.ts';
import { dishesData } from './data.ts'; // Import your data

const server = serve({ port: 80 });

for await (const req of server) {
  // Handle HTTP requests
  switch (true) {
  case req.url === '/ws':
    if (acceptable(req)) {
      acceptWebSocket({
        conn: req.conn,
        bufReader: req.r,
        bufWriter: req.w,
        headers: req.headers,
      })
        .then(handleWebSocket);
      }
    break;
  
  case req.url === '/':
    const body = await Deno.readFile('static/index.html');
    req.respond({ body });
    break;
  
  case req.url === '/styles.css':
  case req.url === '/client.js':
    const filePath = `static${req.url}`;
    const headers = new Headers();
    headers.set('Content-Type', 'text/css'); // Adjust Content-Type if needed
    const body = await Deno.readFile(filePath);
    req.respond({ body, headers });
    break;
  }
}

async function handleWebSocket(ws: WebSocket) {
  for await (const event of ws) {
  if (typeof event === 'string') {
    if (event === 'getDishes') {
    ws.send(JSON.stringify(dishesData)); // Send data to the client
    }
    // Handle other WebSocket events here
  }
  }
}
