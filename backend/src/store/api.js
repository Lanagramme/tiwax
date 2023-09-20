const SERVER = "http://localhost:3000/api/v1/"
const Api = () => {
}
Api.get = (url)=> {
    return new Promise((resolve, reject)=> {
        const Http = new XMLHttpRequest();
        Http.open("GET", SERVER+url);
        Http.onload = resolve;
        Http.onerror = reject;
        Http.send();
    })
}
Api.post = async (url, data)=> {
    // console.log('sent')
    // fetch(SERVER+url, {
    //     method: "POST",
    //     body: JSON.stringify({ data }),
    //     headers: { "Content-type": "application/json; charset=UTF-8" }
    // })
    // .then( x => { return response.json() })
    // .catch(x => { return {fail: true} }) 
    return new Promise((resolve, reject)=> {
        const Http = new XMLHttpRequest();
        Http.open("POST", SERVER+url);
        Http.onload = resolve;
        Http.onerror = reject;
        Http.send(data);
    })   
}

export default Api