import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
const socket = io("ws://localhost:3000", {
  autoConnect: false,
  reconnectionDelayMax: 10000,
  // auth: {
  //   token: "123"
  // },
  query: {
    "my-key": "my-value"
  }
});

window.socket = socket // for testing purpose

socket.on('msg', function(e){console.log(e)})
socket.on("connect", () => {
  console.log(`connected with transport ${socket.io.engine.transport.name}`);

  socket.io.engine.on("upgrade", (transport) => {
    console.log(`transport upgraded to ${transport.name}`);
  });
});
socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

socket.on("disconnect", (reason) => {
  console.log(`disconnect due to ${reason}`);
});

export default socket