import React from "react";
import "../STYLES/SearchSide/SearchSide.css";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import UserChat from "./UserChat";
const SearchSide = () => {
  return (
    <div className="container_search_side">
      <NavBar />
      <SearchBar />
      <UserChat />
    </div>
  );
};

export default SearchSide;
