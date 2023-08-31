import { serveDir } from "https://deno.land/std@0.200.0/http/file_server.ts";

async function handleConn(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);

  for await (const e of httpConn) { e.respondWith(await handle(e.request)); }
}

async function handle(req) {
  if (req.headers.get("upgrade") != "websocket") {
    const pathname = new URL(req.url).pathname;
    
    if (pathname.startsWith("/asset")) return serveDir(req, { fsRoot: new URL('.', import.meta.url).pathname + "/asset" });

    return new Response(await Deno.readFile(new URL('.', import.meta.url).pathname + '/index.html'));
  }

  // Upgrade the incoming HTTP request to a WebSocket connection
  const { socket, response } = Deno.upgradeWebSocket(req);
  socket.onopen = () => console.log("socket opened");
  socket.onmessage = (e) => {
    console.log("socket message:", e.data);
    socket.send(new Date().toString());
  };
  socket.onerror = (e) => console.log("socket errored:", e.message);
  socket.onclose = () => console.log("socket closed");

  return response;
}

const listener = Deno.listen({ hostname: "localhost", port: 8080 });