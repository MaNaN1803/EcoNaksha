import { Server } from "socket.io";
import Collaboration from "@/models/Collaboration";
import connectMongo from "@/lib/mongodb";

let io;

export default async function handler(req, res) {
  if (!io) {
    io = new Server(res.socket.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("New user connected:", socket.id);

      socket.on("joinRoom", async (roomId) => {
        console.log(`User joined room: ${roomId}`);
        socket.join(roomId);

        // Load previous chat messages
        const messages = await loadMessages(roomId);
        socket.emit("previousMessages", messages);
      });

      socket.on("sendMessage", async ({ roomId, message, senderId }) => {
        const newMessage = {
          sender: senderId,
          message,
          timestamp: new Date(),
        };

        // Save message to MongoDB
        await saveMessage(roomId, newMessage);

        // Broadcast to other users in the room
        io.to(roomId).emit("receiveMessage", newMessage);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });

    console.log("Socket.IO server initialized.");
  }

  res.end();
}

const loadMessages = async (roomId) => {
  await connectMongo();
  const room = await Collaboration.findOne({ sessionId: roomId });
  return room ? room.messages : [];
};

const saveMessage = async (roomId, message) => {
  await connectMongo();
  let room = await Collaboration.findOne({ sessionId: roomId });

  if (!room) {
    room = await Collaboration.create({ sessionId: roomId, messages: [message] });
  } else {
    room.messages.push(message);
    await room.save();
  }
};
