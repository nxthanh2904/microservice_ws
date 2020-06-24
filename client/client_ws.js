const WebSocket = require('ws');
const express = require('express');
const app = express();
const ws = new WebSocket('ws://localhost:8080',{
    perMessageDeflate : false
});
const PORT = 3030;
const message = {
    // code = 1 get article by tag,
    // code = 2 get article by web
    code : 1,
    data: "trẻ hơn tuổi"
}

app.get('/get', async (req, res)=>{
    console.log('mesere', message);
    ws.on('open', async function open(){
        console.log('messss', message);
        ws.send(JSON.stringify(message));
    });
    
    ws.on('message', async function incoming(data){
        console.log(data);
        res.status(200).json(data);
    })
    
})


//const message = [1, 2, 3];
ws.on('open', function open(){
    ws.send(JSON.stringify(message));
});

ws.on('message', function incoming(data){
    console.log(data);
})


app.listen(PORT,()=> console.log(`Client is running on ${PORT}`));



