console.log('start')
async function handleConn(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  console.log('handleConn')
  for await (const e of httpConn) { e.respondWith(await handle(e.request)); }
}

async function handle(req) {

  console.log('handle')
  if (req.headers.get("upgrade") != "websocket") {
    const pathname = new URL(req.url).pathname;
    const isAsset = pathname.startsWith("/asset")
    const res = Deno.readFile(new URL('.', import.meta.url).pathname + isAsset ? +pathname : '/index.html');
    console.log(isAsset)
    console.log(res)

    return new Response(res);
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
console.log('end')