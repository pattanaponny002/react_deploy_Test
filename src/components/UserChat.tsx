import React from "react";
import "../STYLES/UserChat/UserChat.css";
import ConversationCard from "./ConversationCard";
import { AuthContext } from "../contextAPI/AuthContextApi";
import { DataProps } from "../contextAPI/AuthContextApi";
import Axios from "axios";
import io, { Socket } from "socket.io-client";
import { spawn } from "child_process";
export interface converstationType {
  _id: string;
  members: string[];
}
interface onlineType {
  socketId: string;
  userId: string;
}
const UserChat = () => {
  // const socket = React.useRef<Socket | null>(null);
  const socket = io("http://localhost:4000");
  const { user } = React.useContext(AuthContext);
  const [ArrivalConveration, setArrivalConveration] = React.useState<
    converstationType[]
  >([]);
  const [onlineUsers, setOnlineUsers] = React.useState<onlineType[]>([]);
  async function fetch_conversation() {
    const url = `http://localhost:4000/conversation/api/${user._id}`;

    const response = await Axios(url, { method: "get" });
    if (response.status === 201) {
      setArrivalConveration((prev) => [...response.data.result]);
    } else {
      alert("Failed fetch conversation");
    }
  }

  // thing
  React.useEffect(() => {
    socket.on("getFriend", (message) => {
      alert(message);
      fetch_conversation();
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);
  React.useEffect(() => {
    if (ArrivalConveration.length === 0) {
      fetch_conversation();
    }

    socket?.on("getUsers", (online_users) => {
      console.log("userOnline", online_users);
      setOnlineUsers((prev) => online_users); // online user Context
    });
    return () => {};
  }, [user]);
  return (
    <div className="container_userchat">
      <div className="container_conversation">
        {ArrivalConveration &&
          ArrivalConveration.map((item, index) => (
            <div>
              <ConversationCard
                conversation={item}
                currentId={user._id}
                // onlineUsers={onlineUsers}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserChat;
