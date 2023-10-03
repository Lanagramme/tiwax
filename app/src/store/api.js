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
    console.log('sent')
    const response = await fetch(SERVER+url, {
        method: "POST",
        body: JSON.stringify({ data }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    return response.json()
    
}

export default Api