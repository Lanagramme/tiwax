import { Server } from "socket.io";
import { randomUUID } from 'crypto';
import controller from './controller/methods.js';

const apiActions = (map => map.get.bind(map))(controller);
const idsMap = new Map;
const Orders = [];
const toLog = [idsMap, Orders]
const collection = { collection:'commandes'};
const fullfilled = { fullfilled: true};
const assign = Object.assign;
const listenners = {
  order(order) {
    const sessionID = order.clientID = this.sessionID
    console.log("\nOrder => ")

    create('commandes', order)
      .then(({message, success}) => {
        if(!success) throw message
        idsMap.set(message.id, sessionID)
        Orders.push(message._doc)
        this.broadcast(message, undefined, 'new order')
        this.msg("order passed")
      })
      .catch(err=>(console.log(err),this.error("couldnt pass the order")))
      .finally(log)

  },

  notify(id) {
    console.log("\nnotification for order id: ", id)
    if(!idsMap.get(id)) this.error(`Order n°${id} doesnt exist or already fullfilled`);
    else update(collection, id).then(({message, success}) => {
        if(!success) throw message;
        const {clientID, id} = message
        updateObject(id, message._doc)
        console.log("UserId:", clientID, "found for order id: ", id), this.broadcast(`order ready n°${id}`)
      })
      .catch(err => this.error(err))
      .finally(log)
  },

  shopState(state){ this.broadcast(state, undefined, "shopState") },

  log
}

function create(collection, data)       { return apiActions ( 'createOne' ) ({collection},data) }
function read(collection)               { return apiActions ( 'readMany'  ) (collection) }
function update(collection, id)         { return apiActions ( 'updateOne' ) (assign({id},collection), fullfilled) }
function updateObject(id, o)            { return idsMap.delete(id), (Orders[Orders.findIndex(({_id})=>_id == id)] = o) }
function send(emitter, event, message)  { return emitter.emit(event, message) }
function log()                          { toLog.forEach(o=>console.table(o)) }

read(collection).then(({message, success})=>{
  if(!success) throw message
  message.forEach(entry=> {
    Orders.push(entry._doc)
    !entry.fullfilled && idsMap.set(entry.id, entry.clientID)
  })
}).catch(err => console.error(new Error(err)))

export function attach(server){
  const io = new Server(server,{
    transports: ["polling", "websocket"],
    cors: {
      origin: "http://localhost:5173"
    }
  
  });
  
  io.use((socket, next) => {
    socket.sessionID = socket.handshake.auth.sessionID || randomUUID();
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
      error(message){
        const err = new Error(message)
        console.log('socket error =>', err)
        return send(socket, 'error', message)
      },
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