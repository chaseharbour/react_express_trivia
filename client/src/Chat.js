import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const ENDPOINT = "http://localhost:5000";

const Chat = () => {
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const socket = io(ENDPOINT, { transports: ["websocket"] });

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit("SEND_MESSAGE", {
      author: userName,
      text: message,
    });

    setMessage("");
  };

  socket.on("RECEIVE_MESSAGE", function (data) {
    addMessage(data);
  });

  const addMessage = (data) => {
    console.log(data);
    setMessages([...messages, data]);
  };

  return (
    <div className="p-10">
      <div className="container h-auto mx-auto border-solid border-4 border-gray-600 p-2">
        <h1>Test</h1>
        <div className="h-64 mx-auto border-solid border-4 border-gray-500">
          <ul>
            {messages.map((msg) => {
              return (
                <li key={uuidv4()}>
                  {msg.author}: {msg.text}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mx-auto flex flex-col mt-4">
          <input
            className="mx-auto border-solid border-2 border-gray-400 p-1"
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></input>
          <input
            className="mx-auto border-solid border-2 border-gray-400 p-1"
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
          <button
            onClick={sendMessage}
            className="mx-auto mt-2 bg-blue-400 py-2 px-4 text-center rounded-sm"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
