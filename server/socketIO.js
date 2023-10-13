const Server  = require("socket.io");
const crypto = require('crypto')
const Orders = new Map;
const listenners = {
  order(order) {
    const sessionID = this.sessionID, id = order.id
    console.log("\nnew order from id: ",sessionID," => ", order)
    if(id) Orders.set(id, sessionID), this.msg("order passed")
    else this.error("couldnt pass the order")
  },

  notify(id) {
    console.log("\nnotification for order id: ", id)
    const sessionID = Orders.get(id)
    if(sessionID) console.log("UserId:", sessionID, "found for order id: ", id), this.broadcast(`order ready n°${id}`, Orders.get(id))
    else this.error(`No user found for order n°${id}`)
  },

  shopState(state){ this.broadcast(state,undefined,"shopState") },
}

function send(emitter, event, message){ return emitter.emit(event, message) }

exports.attach = (server)=>{
  const io = Server(server,{
    transports: ["polling", "websocket"],
    cors: {
      origin: "http://localhost:5173"
    }
  
  });
  
  io.use((socket, next) => {
    socket.sessionID = socket.handshake.auth.sessionID || crypto.randomUUID();
    (socket.isNew = !socket.handshake.auth.sessionID) && console.log("sessionID created")
    next();
  });

  io.on("connection", (socket) => {

    const {sessionID, isNew} = socket
    const listennerTools = {
      // datas
      sessionID,

      // responses
      msg(message){ return send(socket, 'msg', message) },
      broadcast(message, id, event="msg"){ return send( (id?io.to(id):io), event, message) },
      error(message){ return send(socket, 'error', new Error(message)) },
    }

    console.log(`connected with transport ${socket.conn.transport.name}`);
  
    socket
      .conn.on("upgrade", (transport) => { console.log(`transport upgraded to ${transport.name}`); })
      .on("disconnect", (reason) => { console.log(`disconnected due to ${reason}`); });

    socket.emit("session", sessionID)
    socket.join(sessionID);
    
    isNew ? console.log('new user') : console.log('new connection')

    Object.entries(listenners).forEach(([key, callback]) =>{
      socket.on(key, callback.bind(listennerTools))
    })
  });
}