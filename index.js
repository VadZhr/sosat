const express = require("express");
const path=require("path");
const http = require("http");
const app = express();
let server = http.createServer(app);
let {Server}= require("socket.io");
let io = new Server(server);
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname +'/public/game.html');
});
const sockets = [];
let allMoves =[0,0,0,
              0,0,0,
              0,0,0]
io.on('connection', (socket) => {
  console.log('a user connected');
  if(sockets.length<2){
    sockets.push(socket.id);
    // socket.broadcast.emit("socket.broadcast", {socketId:sockets[sockets.length-1]});
    socket.on("socket.broadcast", data=>{
      
      allMoves[data.el-1]=1
      if(data.win===false){
        socket.broadcast.emit("socket.broadcast", {win:false})
      }
      if(data.win===true){
        socket.broadcast.emit("socket.broadcast", {win:false})
      }else{
        socket.broadcast.emit("socket.broadcast", {el:data.el, id:data.id, move:data.move})
      }
    
      console.log(allMoves);
    }
   )
    socket.on('privateMessage', id=>{
      io.to(id.id).emit("message",`${id.el}`)
    })
    console.log(sockets);
  }

  // socket.emit("message", {text: "Welcome", chatId: socket.id});
  // socket.on("chatMessage", function(message){
  //   console.log(message);
  // })
// io.emit('io.emit', {socketId:sockets[sockets.length-1]}) 
// socket.broadcast.emit("socket.broadcast", {socketId:sockets[sockets.length-1]});


// socket.emit("connected",{socketId:sockets[sockets.length-1]});



});

server.listen(3000, '172.28.0.83', () => {
  console.log('listening on *:3000');
});
