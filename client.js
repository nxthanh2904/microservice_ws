var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error){
    console.log('Connect Error: '+ error.toString());
});

client.on('connect', function(connection){
    console.log('WebSocket Client Connected');
    connection.on('error', function(error){
        console.log('Connect Error: ' + error.toString());
    });
    client.on('connect', function(connection){
        console.log('WebSocket Client Connected 2');
        connection.on('error', function(error){
            console.log('echo-protocol Connection Closed');
        });
        
        connection.on('message', function(message){
            
            console.log(message)
            if(message.type === 'utf8'){
                console.log("Received: '"+message.utf8Data + "'.");
            }
        });
       
    })
})


client.connect('ws://localhost:8080/', 'echo-protocol');