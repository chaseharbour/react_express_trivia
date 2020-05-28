import React from "react";

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form>
      <input
        className="mx-auto border-solid border-2 border-gray-400 p-1"
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
      ></input>
      <button
        onClick={(e) => sendMessage(e)}
        className="mx-auto mt-2 bg-blue-400 py-2 px-4 text-center rounded-sm"
      >
        Send
      </button>
    </form>
  );
};

export default Input;
