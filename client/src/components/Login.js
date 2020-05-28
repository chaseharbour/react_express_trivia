import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("General");

  return (
    <div className="shadow-lg p-6 max-w-2xl my-32 mx-auto bg-gray-100">
      <div className="max-w-md mx-auto border-b border-solid border-gray-600">
        <h1 className="mx-auto text-center">Login</h1>
      </div>
      <div className="flex flex-col items-center mt-4">
        <input
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          className="shadow-md mx-auto p-2 my-2"
        />
        <input
          placeholder={`Room Name: ${room} by default`}
          onChange={(e) => setRoom(e.target.value)}
          type="text"
          className="shadow-md mx-auto p-2 my-2"
        />
        <Link
          onClick={(e) => (!userName || !room ? e.preventDefault() : null)}
          to={`/chat?userName=${userName}&room=${room}`}
        >
          <button
            type="submit"
            className="bg-blue-400 mx-auto px-4 py-2 mt-4 text-white font-bold text-center hover:bg-blue-900"
          >
            Join
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
