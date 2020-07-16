const WebSocket = require('ws');
const express = require('express');
const app = express();
const ws = new WebSocket('ws://ws-server:8080',{
    perMessageDeflate : false
});
const message = {
    // code = 1 get article by tag,
    // code = 2 get article by web
    code : 1,
    data: "trẻ hơn tuổi"
}



//const message = [1, 2, 3];
ws.on('open', function open(){
    ws.send(JSON.stringify(message));
});

ws.on('message', function incoming(data){
    console.log(data);
})




