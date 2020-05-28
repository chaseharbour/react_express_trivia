import React from "react";
import closeIcon from "../icons/closeIcon.png";
import onlineIcon from "../icons/onlineIcon.png";

const InfoBar = (props) => {
  return (
    <div>
      <div>
        <img src={onlineIcon} alt="online" />
        <h3>{props.room}</h3>
      </div>
      <div>
        <a href="/">
          <img src={closeIcon} alt="close" />
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
