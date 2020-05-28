import React from "react";

const Message = ({ message: { user, text }, userName }) => {
  let isSentByCurrUser = false;

  const trimmedUserName = userName.trim().toLowerCase();

  if (user === trimmedUserName) {
    isSentByCurrUser = true;
  }

  return isSentByCurrUser ? (
    //Justify end
    <div className="flex p-2 items-center">
      <p className="flex-end">{trimmedUserName}</p>

      <div className="flex-start ml-4 bg-blue-400 text-white p-2 rounded text-lg font-bold">
        <p>{text}</p>
      </div>
    </div>
  ) : (
    //Justify start
    <div className="flex p-2 items-center">
      <p className="flex-start mr-4 bg-gray-300 p-2 rounded text-lg font-black">
        {text}
      </p>

      <div className="flex-end text-center">
        <p>{user}</p>
      </div>
    </div>
  );
};

export default Message;
