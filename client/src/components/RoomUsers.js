import React from "react";

const RoomUsers = ({ users }) => {
  if (users) {
    return (
      <div>
        {users.map(({ userName }) => {
          return <p key={userName}>{userName}</p>;
        })}
      </div>
    );
  }

  return (
    <div>
      <h2>No users online</h2>
    </div>
  );
};

export default RoomUsers;
