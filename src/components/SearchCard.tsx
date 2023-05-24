import React from "react";
import { DataProps } from "../contextAPI/AuthContextApi";
import { motion as m } from "framer-motion";
import "../STYLES/SearchCard/SearchCard.css";
interface SearchCardProps {
  conversation: DataProps;
  index: number;
}
const SearchCard = ({ conversation, index }: SearchCardProps) => {
  return (
    <m.div
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.3, duration: 0.2 }}
      className="friend_card"
      key={index}
    >
      <div className="profile">
        <img src={conversation.photoURL} alt="" />
      </div>
      <span>{conversation.username}</span>
      <span>{conversation.email}</span>
    </m.div>
  );
};

export default SearchCard;
