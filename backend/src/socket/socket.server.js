import { Server } from "socket.io";
const initSocketServer = (httpServer) => {

  const io = new Server(httpServer,{});

  io.on("connection", (socket) => {
    console.log("new socket connection:", socket.id);
    
  });
};

export default initSocketServer
