console.log('start')
import { serveDir } from "https://deno.land/std@0.200.0/http/file_server.ts";

async function handleConn(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  console.log('handleConn')
  for await (const e of httpConn) { e.respondWith(await handle(e.request)); }
}
function getPath(...args){
  return new URL(...args).pathname
}
async function handle(req) {

  console.log('handle')
  if (req.headers.get("upgrade") != "websocket") {
    const pathname = getPath(req.url), dirName = getPath('.', import.meta.url);
    if(pathname.startsWith("/asset")) return serveDir(req, { fsRoot: dirName + "/asset" });

    return new Response(Deno.readFile(dirName + '/index.html'));
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
for await (const conn of listener) { handleConn(conn); }
console.log('end')