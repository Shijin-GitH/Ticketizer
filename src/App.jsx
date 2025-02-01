import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import SplashCursor from "./ui/SplashCursor";
import axios from "axios";
import Signup from "./Pages/Signup";

function App() {
  axios.defaults.baseURL = "http://127.0.0.1:5000";

  return (
    <>
      <SplashCursor />
      <Router>
        <div className="absolute select-none flex justify-center items-center inset-0 h-screen w-screen bg-black bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:70px_70px]">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
