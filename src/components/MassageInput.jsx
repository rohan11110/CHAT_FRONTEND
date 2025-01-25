import React, { useState } from "react";

function MessageInput({ socket, username, room }) {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chatMessage", { username, room, text: message });
      setMessage("");
    }
  };

  const handleTyping = () => {
    socket.emit("typing", { username, room });
  };

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleTyping}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default MessageInput;
