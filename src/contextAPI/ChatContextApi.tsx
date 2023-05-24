import React, { Dispatch } from "react";
import { Action } from "../assets/reducer_utils";
import {
  reducer_chat,
  reducer_signup,
  reducer,
  state_chat_data,
  REDUCER_TYPE_CHAT,
} from "../assets/reducer_utils";
import { DataProps } from "./AuthContextApi";

interface ChatContextApi {
  children: React.ReactNode;
}
export interface onlineType {
  socketId: string;
  userId: string;
}
export interface ChatProps {
  chatId: string;
  user: DataProps | undefined;
}
interface ChatContextProps {
  data: ChatProps;
  DispatchChatContext: Dispatch<Action>;
}

const initialState: state_chat_data = {
  data: {
    chatId: "",
    user: {
      _id: "",
      username: "",
      password: "",
      email: "",
      phone_number: "",
      photoURL: "",
    },
  },
};
const initialStateContext: ChatContextProps = {
  data: {
    chatId: "",
    user: undefined,
  },
  DispatchChatContext: () => {}, /// how to define that correctly ()=>{}
};
export const ChatContext =
  React.createContext<ChatContextProps>(initialStateContext);
const ChatContextApi = ({ children }: ChatContextApi) => {
  const [data, dispatch] = React.useReducer(reducer_chat, initialState); // this { username : "" ,password : ""}
  const context: ChatContextProps = {
    data: data.data,
    DispatchChatContext: dispatch,
  };
  return (
    <ChatContext.Provider value={context}>{children}</ChatContext.Provider>
  );
};

export default ChatContextApi;
