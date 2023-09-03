const ws = new WebSocket(`wss://bold-dolphin-15.deno.dev/`);
const Links = {}
export const Store = {
  
}

export function linkData(key, callback){
  (Links[key] || (Links[key] = [])).push(callback)
}

export function updateData(key, val){
  sessionStorage.setItem(key, JSON.stringify(val))
  (Links[key] || []).forEach(cb => cb())
}

function newMenu(arr, item){
  const menu = { titre: item.type, liste: []}
  arr.push(menu)
  return menu
}

ws.addEventListener('open', function (_event) {
  ws.send('getItems');
  ws.send('getMenus');
  ws.send('shopState');
  ws.onmessage = (e) => {
    const res = JSON.parse(e.data);
    console.log(res)
    switch (true) {
    case res.method == 'get':
      Object.entries(res.data).forEach(([key, data]) => {
        console.log('key => ', key)
        switch (key) {
          case "items": Store.items = data; break;
          case "menus": Store.navigations = data.reduce((acc, val) => {
              const item = Store.items.find(({id})=> id === val.target)
              const details = {...val};
              delete details.target
              if(item){
                const menu = (acc.find(menu => menu.titre === item.type) || newMenu(acc, item))
                menu.liste.push({
                  ...item,
                  ...details
                })
                return acc
              }
            },[]); break;
        }
      })
      break;
    
    default:
      break;
    }
    console.log(Store)
    Object.entries(Store).forEach(([key, val])=> updateData(key, val))
  };
});
