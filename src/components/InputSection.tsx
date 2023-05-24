import React from "react";
import "../STYLES/InputSection/InputSection.css";
import { AiOutlineSend, AiOutlineSearch } from "react-icons/ai";
import { BsFillSendFill, BsImage } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { AuthContext } from "../contextAPI/AuthContextApi";
import io from "socket.io-client";
import Axios from "axios";
import { Messages } from "./Message";
import { ChatContext } from "../contextAPI/ChatContextApi";
const InputSection = () => {
  const { user } = React.useContext(AuthContext);
  const { data } = React.useContext(ChatContext);
  const socket = io("http://localhost:4000");
  const [InputMessage, setSendingMessage] = React.useState<string>("");
  async function fetchMessage() {
    const url = "http://localhost:4000/message/api/add";

    const messages = {
      conversationId: data.chatId,
      senderId: data.user?._id,
      text: InputMessage,
    };

    const response = await Axios(url, {
      method: "POST",
      data: messages,
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      console.log("message", response.data.result);
      setSendingMessage((prev) => "");
      // alert("sending");
      socket.emit("sendMessage", data.user?._id);
    } else {
      alert("Failed");
      return;
    }
  }
  return (
    <div className="container_input">
      <div className="wrapper_input">
        <input
          value={InputMessage}
          type="text"
          placeholder="@Aa"
          className="inputText"
          onChange={(e) => setSendingMessage((prev) => e.target.value)}
        />
        <AiOutlineSearch size={25} className="icon_search" />
      </div>
      <div className="container_tool">
        {InputMessage && (
          <BsFillSendFill
            size={25}
            className="icon_tool"
            onClick={fetchMessage}
          />
        )}
        <BsImage size={25} className="icon_tool" />
        <FaMicrophone size={25} className="icon_tool" />
      </div>
    </div>
  );
};

export default InputSection;
