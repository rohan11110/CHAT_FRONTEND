import React, { useState } from "react";
import ChatRoom from "./components/ChatRoom";
import RoomList from "./components/RoomList";

function App() {
  const [room, setRoom] = useState(null);
  const [username, setUsername] = useState("");

  return (
    <div className="App">
      {!room ? (
        <RoomList setRoom={setRoom} setUsername={setUsername} />
      ) : (
        <ChatRoom room={room} username={username} />
      )}
    </div>
  );
}

export default App;
