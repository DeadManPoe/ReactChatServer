const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ws = require('ws');

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const rooms = [{
    id : '1',
    name : 'room1'
},{
    id : '2',
    name : 'room2'
}]
const messages = []

app.get('/get_rooms', (req,res)=>{
    res.json({
        rooms : rooms
    })
})
app.post('/send_message',(req,res)=>{
    const message = req.body.message;
    res.end();
})

app.listen(8080, 'localhost', ()=>{
    console.log('listening')
} )