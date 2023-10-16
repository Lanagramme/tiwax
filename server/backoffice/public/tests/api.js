const SERVER = "/api/v1/"

async function standardizeResponse(res){
  const target = res.target
  return target ? JSON.parse(target.responseText) : await res.json()
}

function createXMLHttpRequest(method, url, data){
  return new Promise((resolve, reject) => {
    checkRequiredParams(method, url)
    const Http = new XMLHttpRequest();
    Http.open(method, SERVER+url);
    Http.onload   = (res)  => standardizeResponse(res).then(resolve);
    Http.onerror  = (res)  => standardizeResponse(res).then(reject);
    Http.send(data);
  })
}

function createFetch(method, url, data){
  checkRequiredParams(method, url)
  return fetch(SERVER+url, {
    method,
    ...data ? {body: data} : {}, 
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(res => standardizeResponse(res))
}

function checkRequiredParams(method, url){ if(![method, url].every(x=>typeof x === "string")) throw new Error('the request method and url must be a string') }

export default {
  get     (url)       { return createXMLHttpRequest('GET', url)       },
  delete  (url)       { return createXMLHttpRequest("DELETE", url)    },
  post    (url, data) { return createFetch("post", url, data)         },
  put     (url, data) { return createXMLHttpRequest("PUT", url, data) },
}