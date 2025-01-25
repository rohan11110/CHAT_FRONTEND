import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [room, setRoom] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle joining or creating a room
  const handleCreateOrJoinRoom = async () => {
    if (!room.trim()) {
      setError("Room name cannot be empty.");
      return;
    }

    try {
      // Check if the room already exists (Optional API call)
      const response = await axios.post("http://localhost:5000/api/rooms", {
        roomName: room,
      });

      if (response.data.success) {
        navigate(`/chat/${room}`); // Navigate to the new room
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("An error occurred while creating the room.");
    }
  };

  return (
    <div className="home">
      <h1>Welcome to Real-Time Chat</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Room Name"
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
            setError("");
          }}
        />
        <button onClick={handleCreateOrJoinRoom}>Create/Join Room</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Home;
