import {Server, Socket} from "socket.io";
import {Message, message} from "../models/message.model.js";


const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
  });

  const userSockets = new Map();// { userId:socketId}
  const userActivities = new Map();// { userId:isActivity}

  io.on("connection", (socket) => {

    Socket.on("user_connected",(userId)=>{
        userSockets.set(userId,socket.id);
        userActivities.set(userId,"Idle");

        // broadcast to all connected sockets that this user just logged in
        io.emit("user_connected",userId);

        socket.emit("user_online",Array.from(userSockets.keys()));

        io.emit("activities",Array.from(userActivities.entries()));
    })

    socket.on("update_activity", ({userId,activity}) => {
        userActivities.set(userId,activity);
        io.emit("activity_updated",{userId,activity});
    });

    socket.on("send_message",async (data)=>{
        try {
            const {senderId,receiverId} = data

            const message = await Message.create({
                senderId,
                receiverId,
                content
            })

            // send to receiver in realtime, if they are online
            const receiverSocketId = userSockets.get(receiverId);
            if(receiverSocketId){
                io.to(receiverSocketId).emit("receive_message",message);
            }

            socket.emit("message_sent",message);

        } catch (error) {
            console.error("message error: ",error);
            socket.emit("message_error",error.message);
        }
    })
  });
}