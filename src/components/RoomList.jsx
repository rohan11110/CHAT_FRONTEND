import React, { useState } from "react";

function RoomList({ setRoom, setUsername }) {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [name, setName] = useState("");

  const joinRoom = () => {
    if (selectedRoom && name) {
      setRoom(selectedRoom);
      setUsername(name);
    } else {
      alert("Please enter a username and select a room.");
    }
  };

  return (
    <div className="room-list">
      <h1>Join a Chat Room</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter room name"
        value={selectedRoom}
        onChange={(e) => setSelectedRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
}

export default RoomList;
