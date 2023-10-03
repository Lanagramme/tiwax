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
  const io = new Server(server);
  io.on('connection', (socket) => {
    console.log('a user connected');

    Object.entries(listenners).forEach(([key, callback]) =>{
      socket.on(key, (...args)=>{ callback(socket, ...args) })
    })
  });
}