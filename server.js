const http = require('http');
const WebSocketServer = require("websocket").server;
let connection = null
const httpserver = http.createServer((req, res) => {
    console.log('we have received a request');
})

const websocket = new WebSocketServer({
    "httpServer": httpserver,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    return true
}

websocket.on("request", request => {

    if (!originIsAllowed(request.origin)) {
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' reject ');
        return;
    }


    connection = request.accept('echo-protocol', request.origin);
   // console.log("9999", connection);
   
    console.log((new Date() + ' Connection accepted. '));
    connection.on('message', function (message) {
    
        if (message.type == 'utf8') {
            console.log('Recived Message: ' + message.utf8Data)
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + 'bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('open', function open() {
        connection.send('Hello');
    })

    connection.on('close', function (reasonCode, description) {
        console.log((new Date()) + ' peer ' + connection.remoteAddress + 'disconnected.');
    });
    //  connection.on("onopen", () => console.log("Opened !!!!!!!"))
    //  connection.on("onopen", () => console.log("Closed !!!!!!!"))
    //  connection.on("onmessage", message =>{
    //      console.log(`Received message ${message}`)
    //  })
})

httpserver.listen(8080, () => console.log('My server is listening 8080 !!!!'));
