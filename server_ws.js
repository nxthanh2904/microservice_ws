const WebSocket = require('ws');
const mongoose = require('mongoose');
const express = require('express');
const Articles = require('./model/article');
const app = express();
const PORT = 8000;
const db = "mongodb://localhost/news-vietnamnet";

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected succesfully"))
    .catch(err => console.log(err));


const wss = new WebSocket.Server({
    port: 8080

})

wss.on('connection', async (ws) => {
    console.log('Client Connected');
    let mes;
    let res;
    ws.on('message', async function (message) {
        console.log('111')
        console.log("Receiver message : ", message);
        mes = JSON.parse(message);
        console.log('messs', mes);
        if (mes.code === 1) {
            console.log('222')
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
    // console.log(data);
    // const { tag } = data;
    const articles = await Articles.find({ tags: data });
    console.log(articles);
    return articles;
}

async function getByWeb(web) {

    // const { web } = data;
    const articles = Articles.find({ "website.name": web });
    return articles;
}
app.listen(PORT, () => { console.log(`Server is running on ${PORT}`) })