import React from "react";
import "../STYLES/MessageCard/MessageCard.css";

import { Messages } from "./Message";
import { AuthContext } from "../contextAPI/AuthContextApi";
interface MessageCardProps {
  index: number;
  message: Messages;
}

const MessageCard = ({ index, message }: MessageCardProps) => {
  const image = "https://picsum.photos/id/237/200/300";
  const { user } = React.useContext(AuthContext);
  const owe = message.senderId === user._id;

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      ref={ref}
      className="wrapper_message"
      style={{
        alignItems: owe ? "flex-start" : "flex-end",
      }}
    >
      <div
        className="box_message"
        style={{
          backgroundColor: owe ? "rgba(223, 75, 122, 0.8)" : "orange",
        }}
      >
        <div className="wrapper_text">
          <span className="box_text">{message.text}</span>
        </div>
        {/* {owe ? (
          <div className="wrapper_image">
            <img src={image} className="image_message" alt="99" />
          </div>
        ) : (
          <span>{""}</span>
        )} */}
      </div>
    </div>
  );
};

export default MessageCard;
