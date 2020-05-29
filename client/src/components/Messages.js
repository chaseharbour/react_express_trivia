import React from "react";
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";

const Messages = ({ messages, userName }) => {
  return (
    <ScrollToBottom className="h-56">
      {messages.map((msg, i) => (
        <div key={i}>
          <Message message={msg} userName={userName} />
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
