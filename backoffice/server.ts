import { serve } from 'https://deno.land/std/http/server.ts';
import { dishesData } from './data.ts'; // Import your data

const server = serve({ port: 80 }), Routes = new Map();
Routes.set('/ws', function(req){
  const { acceptWebSocket, acceptable } = ws(Deno.upgradeWebSocket(req));
  console.log(acceptWebSocket, acceptable)
  if (acceptable(req)) {
    acceptWebSocket({
      conn: req.conn,
      bufReader: req.r,
      bufWriter: req.w,
      headers: req.headers,
    })
    .then(handleWebSocket);
  }
})
Routes.set('/', function(req){
  const body = await Deno.readFile('static/index.html');
  req.respond({ body });
})
Routes.set('/styles.css', getRessource)
Routes.set('/client.js', getRessource)

for await (const req of server) {
  // Handle HTTP requests
  switch (true) {
  
  case req.url === :
  case req.url === :
    
  }
}
function getRessource(req){
  const filePath = `static${req.url}`;
  const headers = new Headers();
  headers.set('Content-Type', 'text/css'); // Adjust Content-Type if needed
  const body = await Deno.readFile(filePath);
  req.respond({ body, headers });
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
