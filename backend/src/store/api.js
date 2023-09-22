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
Api.delete = (url)=> {
    return new Promise((resolve, reject)=> {
        const Http = new XMLHttpRequest();
        Http.open("DELETE", SERVER+url);
        Http.onload = resolve;
        Http.onerror = reject;
        Http.send();
    })
}
Api.post = async (url, data)=> {
    return new Promise((resolve, reject)=> {
        const Http = new XMLHttpRequest();
        Http.open("POST", SERVER+url);
        Http.onload = resolve;
        Http.onerror = reject;
        Http.send(data);
    })   
}
Api.put = async (url, data)=> {
    return new Promise((resolve, reject)=> {
        const Http = new XMLHttpRequest();
        Http.open("PUT", SERVER+url);
        Http.onload = resolve;
        Http.onerror = reject;
        Http.send(data);
    })   
}

export default Api