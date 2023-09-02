const Items = new Map, sockets = new Set<WebSocket>();

function broadcast(data){
  let i = 0, size = sockets.size;
	if(size < 2) console.log('less than 2 connection');
  else console.log(size, ' connection')
	sockets.forEach(socket => (send(socket, data), i++))
  console.log(size == i)
}

function send(socket, data) { socket.send(JSON.stringify(data)) }

function updateSockets(action, socket) {
  const track = []
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
	  let data, res;
  
	  try { data = JSON.parse(e.data); } catch (error) { data = e.data }
  
	  const dataType = typeof data;
  
	  if( ["string", "number"].includes(dataType)) {
		  console.log("socket message:", e.data);
		  res = { type:"message", body: { data: new Date().toString(), dataType }};
	  } else {
		  res =  data.type === "broadcast" ? data : { type:"message", body: data }
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
