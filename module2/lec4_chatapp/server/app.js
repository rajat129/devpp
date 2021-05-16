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
  
  socket.on("userconnected" , function(username){
    let userobj = {id:socket.id,username:username};
    userlist.push(userobj);
    console.log(userlist);

    socket.emit("online-list",userlist);

    socket.broadcast.emit("joined",userobj);
  })

  socket.on("disconnect",function(){
    let leftuser;
    let rem = userlist.filter(function(userobj){
      if(userobj.id==socket.id){
        leftuser = {id:socket.id,username:userobj.username};
        return false;
      }else{
        return true;
      }
    })
    userlist = rem;
    socket.broadcast.emit("left",leftuser);
  })

  socket.on("leftchat",function(obj){
    socket.broadcast.emit("chat",obj);
  })

});



server.listen(5500,function(){
  console.log("app started");  
})