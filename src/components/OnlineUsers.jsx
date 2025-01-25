import React from "react";

function OnlineUsers({ users }) {
  return (
    <div className="online-users">
      <h3>Online Users:</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default OnlineUsers;
