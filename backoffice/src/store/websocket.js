import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
const sessionID = localStorage.getItem("sessionID");

const socket = io("ws://localhost:3000", {
  autoConnect: false,
  reconnectionDelayMax: 10000,
  // auth: {
  //   token: "123"
  // },
  // query: {
  //   "my-key": "my-value"
  // }
});

window.socket = socket // for testing purpose
if (sessionID) { socket.auth = { sessionID }; }

socket.on('msg', function(e){ console.log(e, ""+e, `${e}`) })
socket.on('error', function(e){
  console.error(e)
  console.error(""+e)
  console.error(`${e}`)
})
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

socket.on("session", (sessionID) => {
  // attach the session ID to the next reconnection attempts
  socket.auth = { sessionID };
  // store it in the localStorage
  localStorage.setItem("sessionID", sessionID);
  // save the ID of the user
  // socket.userID = userID;
});

export default {
  connect(){ socket.connect() },
  disconnect(){ socket.disconnect() },
  notify(id){ socket.emit('order', data) }
}