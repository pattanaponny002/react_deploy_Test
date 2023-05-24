import React from "react";
import { ChatContext } from "../contextAPI/ChatContextApi";
import "../STYLES/NavChat/NavChat.css";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const NavChat = () => {
  const { data } = React.useContext(ChatContext);
  const navigation = useNavigate();
  return (
    <div className="container_navchat">
      <div className="wrapper_profile">
        <img src={data.user?.photoURL} alt="" />
      </div>
      <span> {data.user?.username}</span>
      <span className="wrapper_icon">
        <AiOutlineMenu
          size={30}
          className="icon_menu"
          onClick={() => navigation("/Home")}
        />
      </span>
    </div>
  );
};

export default NavChat;
