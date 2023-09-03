import { items, available } from "./data.ts"

const sockets = new Set<WebSocket>();
let shopOpen = true;

function broadcast(data){
  let i = 0, size = sockets.size;
  if(size < 2) console.log('less than 2 connection');
  else console.log(size, ' connection')
  sockets.forEach(socket => (send(socket, data), i++))
  console.log(size == i)
}

function send(socket, data) { socket.send(JSON.stringify(data)) }

function updateSockets(action, socket) {
  const track:number[] = []
  track.push(sockets.size)
  sockets[action](socket)
  track.push(sockets.size)
  return track
}
export function ws({ socket, response }) {
  
  socket.onopen = () => {
    console.log("socket opened", ...updateSockets('add', socket))
  };

  socket.onmessage = (e) => {
    let data:any, res:{type:string, body: any};
  
    try { data = JSON.parse(e.data); } catch (error) { data = e.data }
  
    const dataType = typeof data;
  
    if( ["string", "number"].includes(dataType)) {
      console.log("socket message:", data);
      switch (data) {
        case 'getItems':
          res = { type:"message", body: { method: 'get', data: { items } }}
          break;
        case 'getMenus':
          res = { type:"message", body: { method: 'get', data: { menus: available } }}
          break;
        case 'shopState':
          res = { type:"broadcast", body: { method: 'get', data: { shopOpen } }}
        case 'openShop':
          shopOpen = true
          res = { type:"broadcast", body: { method: 'get', data: { shopOpen } }}
          break;
        case 'closeShop':
          shopOpen = false
          res = { type:"broadcast", body: { method: 'get', data: { shopOpen } }}
          break;
        default: res = { type:"message", body: { data: new Date().toString(), dataType }};
          break;
      }
      
    } else {

      switch (true) {
        case data.method == "post":
          if(data.item?.type) {
            data.item.id = crypto.randomUUID()
            items.push(data.item)
          } else console.log(data.method,' => ',data);
          res = { type:"broadcast", body: { method: 'get', data: { items } }}
          break;
        case data.method == "delete":
          if(data.item?.type) {
            const id = data.item.id 
            items.splice(items.findIndex(item => item.id === id), 1)
          } else console.log(data.method,' => ',data);
          res = { type:"broadcast", body: { method: 'get', data: { items } }}
          break;
        case data.method == "patch":

          const changes:any = data.item
          if(changes?.type) {
            const id = changes.id 
            const item = items.find(item => item.id === id)
            item && Object.entries(changes).forEach(([key,val]) => { item.hasOwnProperty(key) && (item[key] = val) })
            console.log(items)
          } else console.log(data.method,' => ',data);
          res = { type:"broadcast", body: { method: 'get', data: { items } }}
          break;
        default: res = { type:"message", body: { data: new Date().toString(), dataType }};
          break;
      }
    }

    if(res.type === "broadcast") broadcast(res.body);
    else send(socket, res.body);
  };
  
  socket.onerror = (e) => console.log("socket errored:", e.message);
  socket.onclose = () => {
    console.log("socket closed", ...updateSockets('delete', socket))
  };
  return response;
}
