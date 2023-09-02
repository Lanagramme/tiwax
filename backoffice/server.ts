import { serveDir } from "https://deno.land/std@0.200.0/http/file_server.ts";

async function handleConn(conn: Deno.Conn) { for await (const e of Deno.serveHttp(conn)) e.respondWith(await handle(e.request)); }

function getPath(...args){ return new URL(...args).pathname }

async function handle(req) {

  if (req.headers.get("upgrade") != "websocket") {
    const dirName = getPath('.', import.meta.url);

    if(getPath(req.url).startsWith("/assets")) return serveDir(req, { fsRoot: dirName });

    return new Response(await Deno.readFile(dirName + '/index.html'));
  }

  // Upgrade the incoming HTTP request to a WebSocket connection
  const { socket, response } = Deno.upgradeWebSocket(req);
  socket.onopen = () => console.log("socket opened");
  socket.onmessage = (e) => {
    const data = JSON.parse(e.data), dataType = typeof data;

    if( ["string", "number"].includes(dataType)) {
      console.log("socket message:", data);
      res = { type:"message", message: new Date().toString(), dataType};
    } else {
      res = data
    }

    socket.send(JSON.stringify(res));
  };
  socket.onerror = (e) => console.log("socket errored:", e.message);
  socket.onclose = () => console.log("socket closed");
  return response;
}

const listener = Deno.listen({ hostname: "localhost", port: 8080 });
for await (const conn of listener) { handleConn(conn); }