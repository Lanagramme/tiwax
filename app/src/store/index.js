const ws = new WebSocket(`wss://slow-oyster-61.deno.dev/`);
export const Store = {
  
}
ws.addEventListener('open', function (_event) {
  ws.send('getItems');
  ws.send('getMenus');
  ws.send('shopState');
  ws.onmessage = (e) => {
    const res = JSON.parse(e.data);
    console.log(res)
    switch (true) {
    case res.method == 'get': Object.entries(res.data).forEach((key, data) => {
        switch (key) {
          case "items": Store.items = data; break;
          case "menu": Store.navigations = data.reduce((acc, val) => {
              const item = Store.items.find(({id})=> id === val.target)
              delete val.target
              if(item){
                (acc[item.type] || (acc[item.type] = {
                    titre: item.type,
                    liste: []
                  }))
                  .liste.push({
                    ...item,
                    ...val
                  })
              }
            },{}); break;
        }
      })
      break;
    
    default:
      break;
    }
    console.log('Store => ',Store)
  };
});