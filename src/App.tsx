import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import AuthContextApi from "./contextAPI/AuthContextApi";
import ChatContextApi from "./contextAPI/ChatContextApi";
import SectionContent from "./screens/SectionContent";
function App() {
  return (
    <div className="App">
      <AuthContextApi>
        <ChatContextApi>
          <Routes>
            <Route path="/">
              <Route index element={<Login />} />
              <Route path="Home" element={<Home />} />
              <Route path="SectionContent" element={<SectionContent />} />
            </Route>
          </Routes>
        </ChatContextApi>
      </AuthContextApi>
    </div>
  );
}

export default App;
