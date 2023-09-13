import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { ProductDetailRoute } from "./routes/ProductRoutes";
import HomeRoute from "./routes/HomeRoute";
import MembershipRoutes from "./routes/MembershipRoutes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
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
    }, 3000);
  }, []);
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
        <Router>
          <div className="App">
            <div
              className="custom-cursor"
              style={{ left: cursorPosition.x, top: cursorPosition.y }}
            ></div>
            <Header />
            <Routes>
              <Route path="/" element={<HomeRoute />} />
              <Route path="/productdetail" element={<ProductDetailRoute />} />
              <Route path="/membership/sub" element={<MembershipRoutes />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      )}
    </>
  );
}

export default App;
