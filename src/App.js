import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import HomeRoute from "./routes/Home/HomeRoute";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.pageX, y: e.pageY });
  };
  return (
    <Router>
      <div className="App">
        <div
          className="custom-cursor"
          style={{ left: cursorPosition.x, top: cursorPosition.y }}
        ></div>
        <Header />
        <Routes>
          <Route path="/" element={<HomeRoute />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
