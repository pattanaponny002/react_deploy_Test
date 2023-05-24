import React from "react";
import "../STYLES/ConversationCard/ConversationCard.css";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { DataProps } from "../contextAPI/AuthContextApi";
import { converstationType } from "./UserChat";
import Axios from "axios";
import { ChatContext } from "../contextAPI/ChatContextApi";
import {
  REDUCER_TYPE_CHAT,
  state_chat,
  state_chat_data,
} from "../assets/reducer_utils";
import { spawn } from "child_process";

interface onlineType {
  userId: string;
  socketId: string;
}
interface ConversationCard {
  conversation: converstationType;
  currentId: string;
  onlineUsers?: onlineType[];
}
const ConversationCard = ({
  conversation,
  currentId,
  onlineUsers,
}: ConversationCard) => {
  const [receivers, setReceiver] = React.useState<DataProps>();
  const { data, DispatchChatContext } = React.useContext(ChatContext);

  const [online, setOnline] = React.useState<boolean>(false);
  function CheckOnline() {
    receivers &&
      onlineUsers?.map((users) => users.userId).includes(receivers._id) &&
      setOnline((prev) => !prev);
  }
  async function findFromID() {
    const friendId = conversation.members.find((m) => m !== currentId);

    const url = `http://localhost:4000/user/api/findId/${friendId}`;

    const response = await Axios(url, { method: "get" });

    if (response.status === 200) {
      const data = response.data.result;
      setReceiver((prev) => ({ ...prev, ...data }));
    } else {
    }
  }

  React.useEffect(() => {
    if (!receivers) {
      findFromID();
    }

    return () => {};
  }, [conversation._id]);
  // React.useEffect(() => {
  //   CheckOnline();
  //   return () => {};
  // }, []);
  return (
    <div className="conversationCard_container">
      <div className="container_profile">
        <div className="wrapper_profile">
          <img
            style={{ borderColor: online ? "mediumseagreen" : "red" }}
            className="profile"
            src={receivers?.photoURL}
            alt=""
          />
        </div>
      </div>
      <div className="wrapper_information">
        <span>
          Name :{receivers?.username} :{online ? "online" : "offline"}
        </span>
        <span>Email : {receivers?.email}</span>
      </div>
      <div
        className="wrapper_button"
        onClick={() => {
          const data = {
            chatId: conversation._id,
            user: receivers,
          };
          DispatchChatContext({
            type: REDUCER_TYPE_CHAT.ADD_CHAT,
            payload: data,
          });
        }}
      >
        <button>
          <BsFillChatSquareTextFill size={25} className="icon" />
        </button>
      </div>
    </div>
  );
};

export default ConversationCard;
