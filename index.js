const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ws = require('ws');

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());

const rooms = [{
    id : '1',
    name : 'room1',
    thumbnail : 'http://lorempixel.com/50/50/',
    thumbnail_width : 50,
    thumbnail_height : 50,
},{
    id : '2',
    name : 'room2',
    thumbnail : 'http://lorempixel.com/50/50/',
    thumbnail_width : 50,
    thumbnail_height : 50
}]
const messages = []
let ws_ref;
const wss = new ws.Server({ port: 8888 });

wss.on('connection', function connection(ws) {
  ws_ref = ws;
});

app.get('/get_rooms', (req,res)=>{
    res.json({
        rooms : rooms
    })
})
app.post('/send_message',(req,res)=>{
    const message = req.body.message;
    const room = req.body.room;
    ws_ref.send(JSON.stringify({message:{text: message, author:`anonym-${(new Date()).toDateString()}`, time:(new Date()).toDateString()}, room : room}));
    res.end();
})
app.listen(8080, 'localhost', ()=>{
    console.log('listening')
} )