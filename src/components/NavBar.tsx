import React from "react";
import "../STYLES/NavBar/NavBar.css";
import { AuthContext } from "../contextAPI/AuthContextApi";
import { useNavigation, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
const NavBar = () => {
  const navigation = useNavigate();
  const { user } = React.useContext(AuthContext);
  return (
    <div className="container_navbar">
      <div className="container_username">
        <div className="wrapper_image">
          <img className="profile" src={user.photoURL} />
        </div>
        <span className="username"> {user.username}</span>
      </div>

      <button className="button_logout" onClick={() => navigation("/")}>
        <span>Logout</span>
        <AiOutlineLogout size={30} />
      </button>
    </div>
  );
};

export default NavBar;
