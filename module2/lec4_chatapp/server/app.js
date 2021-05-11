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

io.on('connection', (socket) => {
  console.log('a user connected');
});



app.listen(5500,function(){
  console.log("app started");  
})