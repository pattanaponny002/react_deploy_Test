import React from "react";
import { patterns_check } from "../assets/regex_utils";
import "../STYLES/SectionContent/SectionContent.css";
import SearchSide from "../components/SearchSide";
import ChatSide from "../components/ChatSide";
const SectionContent = () => {
  const [test, setTest] = React.useState<string>("");
  const [validate, setValidate] = React.useState<boolean>(false);
  const pattern = new RegExp(/^[A-Za-z0-9]{5,15}/); // global flag start from the last
  function handlerChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const checked = patterns_check.username.test(e.target.value);

    console.log(
      "Username:",
      e.target.value,
      "length:",
      e.target.value.length,
      "Validation Result:",
      checked
    );

    setValidate(checked);
  }
  return (
    <div className="container_section">
      <div className="container_chat">
        <SearchSide />
        <ChatSide />
      </div>
    </div>
  );
};

export default SectionContent;
