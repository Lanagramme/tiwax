const Server  = require("socket.io");
const crypto = require('crypto')
const Orders = new Map;
const listenners = {
  order({socket}, order) {
    console.log("\nnew order from id: ",socket.sessionID," => ", order)
    if(order.id) Orders.set(order.id, socket.sessionID), this.msg("order passed")
    else this.error("couldnt pass the order")
  },

  notify({io}, id) {
    console.log("\nnotification for order id: ", id)
    const sessionID = Orders.get(id)
    if(sessionID) console.log("UserId:", sessionID, "found for order id: ", id), this.broadcast(`order ready n°${id}`, Orders.get(id))
    else this.error(`No user found for order n°${id}`)
  }
}

function sendMsg(emitter, message){ return emitter.emit('msg', message) }

exports.attach = (server)=>{
  const io = Server(server,{
    transports: ["polling", "websocket"],
    cors: {
      origin: "http://localhost:5173"
    }
  
  });
  
  io.use((socket, next) => {
    socket.sessionID = socket.handshake.auth.sessionID || crypto.randomUUID();
    next();
  });

  io.on("connection", (socket) => {

    const emitters = {io, socket}
    const sessionID = socket.sessionID
    const listennerResponses = {
      msg(message){ return sendMsg(socket, message) },
      broadcast(message, id){ return sendMsg( (id?io.to(id):io), message) },
      error(message){ return socket.emit('error', new Error(message)) },
    }

    console.log(`connected with transport ${socket.conn.transport.name}`);
  
    socket
      .conn.on("upgrade", (transport) => { console.log(`transport upgraded to ${transport.name}`); })
      .on("disconnect", (reason) => { console.log(`disconnected due to ${reason}`); });

    socket.emit("session", sessionID)
    socket.join(sessionID);
    
    console.log('a user connected');

    Object.entries(listenners).forEach(([key, callback]) =>{
      socket.on(key, (...args)=>{ callback.bind(listennerResponses)(emitters, ...args) })
    })
  });
}