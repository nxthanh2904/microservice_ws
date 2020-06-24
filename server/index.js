const WebSocket = require('ws');
const mongoose = require('mongoose');
const express = require('express');
const Articles = require('./model/article');
const app = express();
const PORT = 7000;
// const db = "mongodb://localhost:27017/news-vietnamnet";

// mongoose.connect(db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => console.log("MongoDB connected succesfully"))
//     .catch(err => console.log(err));

require('./model');


const wss = new WebSocket.Server({
    port: 8080

})

wss.on('connection', async (ws) => {
    console.log('Client Connected');
    let mes;
    let res;
    ws.on('message', async function (message) {
        console.log("Receiver message : ", message);
        mes = JSON.parse(message);
        if (mes.code === 1) {
            res = await getByTag(mes.data);
        }
        else if (mes.code === 2) {
            res = await getByWeb(mes.data);
        }
        console.log(res);
        await ws.send(JSON.stringify(res));
        
    });
    ws.on('close', function (client) {

    })
})
async function getByTag(data) {
    console.log("get by tag", data);
    const articles = await Articles.find({ tags: data }).limit(1);
    console.log(articles);
    console.log('alo');
    
    if(articles.length) console.log(articles);
    else console.log("None");
    return articles;
}

async function getByWeb(web) {
    console.log('get by web');
    // const { web } = data;
    const articles = await Articles.find().limit(1);
    if(articles === null) console.log("null");
    console.log(articles);
    return articles;
}
app.listen(PORT, () => { console.log(`Server is running on ${PORT}`) });
