let express = require('express');
let app = express();
let http = require('http');
let server = http.createServer(app);
let { Server } = require("socket.io");
let io = new Server(server);

app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
});

const userIds = [];

io.on('connection', (socket) => {
    userIds.push(socket.id);
    socket.broadcast.emit('new user', socket.id)
    socket.on('privateMessage', id => {
        io.to(id).emit('message', 'ПИШУ В ЛИЧКУ')
    })
    // console.log('a user connected');
    // socket.emit("message", {text: "Welcome", chatId: socket.id});
    // socket.on("chatMessage", (text) => console.log(text))
    // io.emit('io.emit', 'io.emit')
    // socket.broadcast.emit("socket.broadcast", 'socket.broadcast');

    // socket.on('disconnect', () => console.log(socket.id))
});


  
server.listen(3000, () => {
    console.log('listening on *:3000');
});
