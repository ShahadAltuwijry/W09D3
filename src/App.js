import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserPage from "./components/UserPage";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Tasks from "./components/Tasks";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/tasks" element={<Tasks />} />
        <Route exact path="/userInfo" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
