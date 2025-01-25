import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://chat-backend-0xhn.onrender.com");

function ChatRoom({ room, username }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]); // State for online users

  useEffect(() => {
    // Join room and load chat history when the component mounts or when room/username changes
    socket.emit("joinRoom", { username, room });

    // Listen for chat history event when user joins
    socket.on("chatHistory", (history) => {
      setMessages(history); // Set chat history as soon as it's received
    });

    // Listen for new messages in real-time
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Append new message to messages list
    });

    // Typing indicator
    socket.on("typing", (user) => {
      setTypingUser(user);
    });

    // Listen for the list of online users
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users); // Update the list of online users
    });

    // Cleanup socket on component unmount
    return () => {
      socket.off("chatHistory");
      socket.off("message");
      socket.off("typing");
      socket.off("onlineUsers");
    };
  }, [room, username]); // Effect depends on room and username; it will re-run if either changes

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chatMessage", { username, room, text: message });
      setMessage(""); // Reset the message input
    }
  };

  const handleTyping = () => socket.emit("typing", { username, room });

  return (
    <div className="chat-container">
      <h2>Room: {room}</h2>

        {/* Online Users */}
        <div className="online-users">
        <h3>Online Users:</h3>
        <ul>
          {onlineUsers.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
      <div className="messages">
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.username}</strong>: {msg.text}
          </p>
        ))}
      </div>
      {typingUser && <p className="typing-indicator">{typingUser} is typing...</p>}
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleTyping}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatRoom;
