import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import evtsMaps from "./events.js";

function sessionHandler() {
  function addID(sessionID) { return (socket.auth = { sessionID }), sessionID }
  function newID() { socket.on("session", (id) => { store(addID(id)) }) }
  function store(sessionID) { localStorage.setItem("sessionID", addID(sessionID)) }

  sessionID ? addID(sessionID) : newID();
}

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

sessionHandler()
window.socket = socket // for testing purpose

for(const action of ['on','emit']) [...evtsMaps[action]||[]].forEach(([evt,fn]) => {
  socket[action](evt,fn.bind(socket))
});


export default {
  connect(){ socket.connect() },
  disconnect(){ socket.disconnect() },
  notify(id){ socket.emit('order', data) }
}