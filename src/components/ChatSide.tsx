import React from "react";
import NavChat from "./NavChat";
import Message from "./Message";
import InputSection from "./InputSection";
import "../STYLES/ChatSide/ChatSide.css";
const ChatSide = () => {
  return (
    <div className="container_chatside">
      <NavChat />
      <Message />
      <InputSection />
    </div>
  );
};

export default ChatSide;
