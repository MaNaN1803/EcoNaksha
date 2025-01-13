import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket;

const Collaboration = () => {
  const [roomId, setRoomId] = useState("eco-naksha-room");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io();

    socket.emit("joinRoom", roomId);

    socket.on("previousMessages", (loadedMessages) => {
      setMessages(loadedMessages);
    });

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { roomId, message, senderId: "user1" }; // Replace "user1" with actual user ID
      socket.emit("sendMessage", newMessage);
      setMessages((prev) => [...prev, { ...newMessage, timestamp: new Date() }]);
      setMessage("");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Real-Time Collaboration</h1>
      <div className="border p-4 mb-4 max-h-96 overflow-auto bg-gray-100 rounded">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <span className="font-semibold">{msg.senderId}:</span>{" "}
            {msg.message} <span className="text-sm text-gray-500">({new Date(msg.timestamp).toLocaleTimeString()})</span>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="flex-grow border p-2 rounded"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Collaboration;
