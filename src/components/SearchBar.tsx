import React from "react";
import "../STYLES/SearchBar/SearchBar.css";
import { AiFillAccountBook, AiOutlineSearch } from "react-icons/ai";
import Axios from "axios";
import { AuthContext, DataProps } from "../contextAPI/AuthContextApi";
import { motion as m } from "framer-motion";
import SearchCard from "./SearchCard";
import { spawn } from "child_process";
import io from "socket.io-client";
const SearchBar = () => {
  const [UserSearch, setUserSearch] = React.useState<string>("");
  const [Conversation, setConversation] = React.useState<DataProps[]>([]);
  const { user } = React.useContext(AuthContext);
  const socket = io("http://localhost:4000");

  async function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const search_name = e.target.value;
    const url = `http://localhost:4000/user/api/find?username=${search_name}`;
    const response = await Axios(url, { method: "get" });
    if (response.data.result && search_name.length > 0) {
      const userChats = response.data.result;
      setConversation((prev) => userChats);
    } else if (search_name.length === 0) {
      console.log("non of them");
      setConversation((prev) => []);
    }
  }
  async function onAddFriend(receiverID: string) {
    const url = "http://localhost:4000/conversation/api/add";
    const data = {
      senderID: user._id,
      receiverID: receiverID,
    };

    const response = await Axios(url, {
      method: "post",
      data,
      headers: { "Content-Type": "application/json" },
    });

    socket.emit("addFreind", "succeeded");

    if (response.status === 200) {
      alert(response.data.message);
    } else {
      alert(response.data.message);
    }
  }

  // React.useEffect(() => {
  //   if (Conversation.length > 0) {
  //   const filterConversation = Conversation.filter(
  //     (item, index) => item._id !== user._id
  //   );
  //     setConversation((prev) => filterConversation);

  //     console.log("length :", Conversation.length);
  //     console.log("filter ==>", filterConversation);
  //   }
  //   return () => {};
  // }, [Conversation]);
  return (
    <div className="container_searchbar">
      <div className="container_search">
        <input
          type="text"
          placeholder="@search friends"
          className="search"
          onChange={onSearch}
        />
        <AiOutlineSearch size={30} className="icon_search" />
      </div>
      <div className="searched_friend">
        {Conversation.length > 0 ? (
          Conversation.map((item, index) => {
            const checkedUser = item._id === user._id;

            if (checkedUser && Conversation.length === 1) {
              return (
                <div className="non_user">
                  <span>None of the user is searched..</span>
                  <AiOutlineSearch size={50} color="grey" />
                </div>
              );
            } else if (checkedUser) {
              return null;
            }
            return (
              <span
                className="wrapper_Card"
                onClick={() => onAddFriend(item._id)}
              >
                <SearchCard index={index} conversation={item} />
              </span>
            );
          })
        ) : (
          <div className="non_user">
            <span>None of the user is searched..</span>
            <AiOutlineSearch size={50} color="grey" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
