import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import "../../../../../tools/index.mjs";
// const { reduceDir, capitalize } = tools
const sessionID = localStorage.getItem("sessionID");
console.log('tools => ',reduceDir, capitalize)
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

function sessionHandler() {
  function addID(sessionID) { return (socket.auth = { sessionID }), sessionID }
  function newID() { socket.on("session", (id) => { store(addID(id)) }) }
  function store(sessionID) { localStorage.setItem("sessionID", addID(sessionID)) }

  sessionID ? addID(sessionID) : newID();
}

window.socket = socket // for testing purpose
sessionHandler()

socket.on('new order', function(e){ console.log('new order passed =>', e) })
socket.on('msg', function(e){ console.log(e) })
socket.on('error', function(e){ console.error(e) })
socket.on("connect", () => {
  const engine = socket.io.engine
  console.log(`connected with transport ${engine.transport.name}`);
  engine.on("upgrade", (transport) => { console.log(`transport upgraded to ${transport.name}`) });
});
socket.on("connect_error", (err) => {   console.log(`connect_error due to ${err.message}`) });

socket.on("disconnect", (reason) => { console.log(`disconnect due to ${reason}`) });

export default {
  connect(){ socket.connect() },
  disconnect(){ socket.disconnect() },
  notify(id){ socket.emit('order', data) }
}