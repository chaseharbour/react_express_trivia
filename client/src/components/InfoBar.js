import React from "react";
import closeIcon from "../icons/closeIcon.png";
import onlineIcon from "../icons/onlineIcon.png";

const InfoBar = (props) => {
  return (
    <div className="flex">
      <div className="flex">
        <img
          className="flex-start self-center mb-1"
          src={onlineIcon}
          alt="online"
        />
        <h3 className="flex-end pl-2">{props.room}</h3>
      </div>
      <div className="bg-gray-700 flex-end self-center ml-auto p-1">
        <a href="/">
          <img src={closeIcon} alt="close" />
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
