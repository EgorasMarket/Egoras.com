import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomeRoutes from "./routes/HomeRoutes";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [loadingDiv, setLoadingDiv] = useState(true);
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.pageX, y: e.pageY });
  };
  useEffect(() => {
    setLoadingDiv(true);
    const timer = setTimeout(() => {
      setLoadingDiv(false);
    }, 1000);
  }, []);
  const currentPage = window.location.pathname;
  const myArr = currentPage.split("/");
  return (
    <>
      {loadingDiv === true ? (
        <div className="loading_div_area">
          <img
            src="/img/egoras_loading.gif"
            alt=""
            className="loading_div_area_img"
          />
        </div>
      ) : (
        <div className="App">
          <div
            className="custom-cursor"
            style={{ left: cursorPosition.x, top: cursorPosition.y }}
          ></div>
          {myArr[1] === "dashboard" ? null : <Header />}
          <Routes>
            <Route
              path="/dashboard"
              element={<Navigate to="/dashboard/home" replace />}
            />
          </Routes>
          {myArr[1] === "dashboard" ? <Dashboard /> : <HomeRoutes />}

          {myArr[1] === "dashboard" ? null : <Footer />}
        </div>
      )}
    </>
  );
}

export default App;
