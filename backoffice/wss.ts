const
	Items = new Map,
	channel = new BroadcastChannel('available'),
	sockets = new Set<WebSocket>()


channel.onmessage = e => {
  console.log(e)
  // (e.target != channel) && channel.postMessage(e.data)
  // sockets.forEach(s => s.send(e.data))
}
  function broadcast(data){
    let i = 0, size = sockets.size;
    if(size < 2) console.log('less than 2 connection');
    else console.log(size, ' connection')
    sockets.forEach(socket => (send(socket, data), i++))
    console.log(size == i)
  }

function send(socket, data) { socket.send(JSON.stringify(data)) }

export function ws({ socket, response }) {
	
	socket.onopen = () => {
	  const before = sockets.size
	  sockets.add(socket)
	  const after = sockets.size
	  console.log("socket opened", before,after)
	};

	socket.onmessage = (e) => {
	  let data, res;
  
	  try { data = JSON.parse(e.data); } catch (error) { data = e.data }
  
	  const dataType = typeof data;
  
	  if( ["string", "number"].includes(dataType)) {
		  console.log("socket message:", e.data);
		  res = { type:"message", body: { data: new Date().toString(), dataType }};
	  } else {
		  res =  data.type === "broadcast" ? data : { type:"message", body: data }
	  }

	  if(res.type === "broadcast") channel.postMessage(res.body);// broadcast(res.body);
	  else send(socket, res.body);
	};
  
	socket.onerror = (e) => console.log("socket errored:", e.message);
	socket.onclose = () => {
		console.log("socket closed")
		sockets.delete(socket)
	};
	return response;
}
