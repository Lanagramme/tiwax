const SERVER_URL = "http://localhost:3000/api/v1/"
const Api = () => {
}
Api.get = (path)=> {
    return new Promise((resolve, reject)=> {
        const Http = new XMLHttpRequest();
        Http.open("GET", SERVER_URL+path);
        Http.onload = resolve;
        Http.onerror = reject;
        Http.send();
    })
}
Api.delete = (path)=> {
    return new Promise((resolve, reject)=> {
        const Http = new XMLHttpRequest();
        Http.open("DELETE", SERVER_URL+path);
        Http.onload = resolve;
        Http.onerror = reject;
        Http.send();
    })
}
Api.post = async (path, data)=> {
    return new Promise((resolve, reject)=> {
        const Http = new XMLHttpRequest();
        Http.open("POST", SERVER_URL+path);
        Http.onload = resolve;
        Http.onerror = reject;
        Http.send(data);
    })   
}
Api.put = async (path, data)=> {
    return new Promise((resolve, reject)=> {
        const Http = new XMLHttpRequest();
        Http.open("PUT", SERVER_URL+path);
        Http.onload = resolve;
        Http.onerror = reject;
        Http.send(data);
    })   
}

export default Api