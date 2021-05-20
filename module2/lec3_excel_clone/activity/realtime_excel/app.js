const express = require("express");

// server is created !!!
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

// app.get("/",function(reques,response){
//   response.send("welcome to home page");
// })

let userlist = [];

io.on('connection', (socket) => {

  // console.log(socket.id);
  
  socket.on("userconnected",function(username){
    userlist.push({username:username,id:socket.id});
    console.log(userlist);
  });

  socket.on("click",function(obj){
    
    socket.broadcast.emit("click",obj);

  });

  socket.on("cellval",function(cellval){
    socket.broadcast.emit("cell-val",cellval);
  })

  socket.on("bold",function(lastselectedcell){
    socket.broadcast.emit("bold",lastselectedcell);
  })

  socket.on("italics",function(lastselectedcell){
    socket.broadcast.emit("italics",lastselectedcell);
  })

  socket.on("underline",function(lastselectedcell){
    socket.broadcast.emit("underline",lastselectedcell);
  })


});



server.listen(5500,function(){
  console.log("app started");  
})