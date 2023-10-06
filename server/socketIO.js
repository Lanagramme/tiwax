const Server  = require("socket.io");
const orders = new Map;
const listenners = {
  order(socket, order){
    console.log("order")
    if(order.id) orders.set(order.id, socket), socket.emit('msg', "order passed")
    else socket.emit('msg', "error: couldnt pass the order")
  },
  notify(socket, id){ console.log("notify"), orders.get(id)?.emit('msg', "order ready") }
}

exports.attach = (server)=>{
  console.log(Server)
  const io = Server(server,{
    transports: ["polling", "websocket"],
    cors: {
      origin: "http://localhost:5173"
    }
  
  });
  io.on("connection", (socket) => {
    console.log(`connected with transport ${socket.conn.transport.name}`);
  
    socket.conn.on("upgrade", (transport) => {
      console.log(`transport upgraded to ${transport.name}`);
    });
  
    socket.on("disconnect", (reason) => {
      console.log(`disconnected due to ${reason}`);
    });

    console.log('a user connected');
    // Object.entries(listenners).forEach(([key, callback]) =>{
    //   socket.on(key, (...args)=>{ callback(socket, ...args) })
    // })
  });
}