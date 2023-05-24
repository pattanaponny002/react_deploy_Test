import React from "react";
import "../STYLES/Message/Message.css";
import MessageCard from "./MessageCard";
import { ChatContext } from "../contextAPI/ChatContextApi";
import Axios from "axios";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
export interface Messages {
  conversationId: string;
  senderId: string | undefined;
  text: string;
  photoURL?: string;
}
const Message = () => {
  const interation = new Array(5).fill(0);
  const [DisplayMessages, setDisplayMessages] = React.useState<Messages[]>([]);
  const image = "https://picsum.photos/200/300";
  const socket = io("http://localhost:4000");
  const { data } = React.useContext(ChatContext);

  async function fetchMessage() {
    const url = `http://localhost:4000/message/api/${data.chatId}`;

    const response = await Axios(url, { method: "GET" });

    if (response.status === 200 && response.data.result) {
      setDisplayMessages((prev) => response.data.result);
    } else {
      return;
    }
  }
  React.useEffect(() => {
    data.chatId && fetchMessage();
    // fetchMessage();
    // fetchMessage();
  }, [data.chatId]);
  React.useEffect(() => {
    socket.on("getMessage", (message) => {
      fetchMessage();
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);
  return (
    <div className="container_message">
      <div className="container_input_message">
        {DisplayMessages &&
          DisplayMessages.map((message, index) => (
            <MessageCard key={index} index={index} message={message} />
          ))}
      </div>
    </div>
  );
};

export default Message;
