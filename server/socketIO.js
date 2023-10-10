const Server  = require("socket.io");
const crypto = require('crypto')
const Orders = new Map;
const listenners = {
  order(socket, order) {
    console.log("\nnew order from id: ",socket.sessionID," => ", order)
    if(order.id) Orders.set(order.id, socket.sessionID), msg("order passed")
    else error("couldnt pass the order")
},

notify(socket, id) {
  console.log("\nnotification for order id: ", id)
  const sessionID = Orders.get(id)
  if(sessionID) console.log("UserId:", sessionID, "found for order id: ", id), socket.to(Orders.get(id))?.emit('msg', `order ready n°${id}`)
  else error(`No user found for order n°${id}`)
}
}

function msg(socket, event, message){
  return socket.emit('msg', {
    event, message,
    toString(){ return this.message }
  })
}

function error(socket, message){
  return socket.emit('error', new Error(message))
}

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
    const sessionID = socket.sessionID
    socket.join(sessionID);

    socket.emit("session", sessionID);

    console.log(`connected with transport ${socket.conn.transport.name}`);
  
    socket.conn.on("upgrade", (transport) => {
      console.log(`transport upgraded to ${transport.name}`);
    });
  
    socket.on("disconnect", (reason) => {
      console.log(`disconnected due to ${reason}`);
      // Sockets.delete(sessionID)
    });

    console.log('a user connected');
    Object.entries(listenners).forEach(([key, callback]) =>{
      socket.on(key, (...args)=>{ callback(socket, ...args) })
    })
  });
}