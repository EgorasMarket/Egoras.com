import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import { VERIFY_USER } from "./services/auth";
import { verifyUser } from "./features/auth/authActions";
import { useDispatch } from "react-redux";
import Dashboard from "./components/Dashboard/Dashboard";
import RouteInit from "./routes/HomeRoutes";
import HomeRoutes from "./routes/HomeRoutes";
import DefaultComponentLoading from "./components/Common/CommonUI/Modals/DefaultComponentLoading/DefaultComponentLoading";
import ProtectedRoute from "./Router/ProtectedRoute";
import ProductDetail from "./components/Market/ProductDetail";
import { fetchWalletBalance } from "./features/walletServices/walletActions";
function App() {
  const dispatch = useDispatch();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [loadingDiv, setLoadingDiv] = useState(true);

  const verify_user = async () => {
    // const response = await VERIFY_USER();
    const response = dispatch(verifyUser());
  };

  const fetch_walllet = async () => {
    // const response = await VERIFY_USER();
    const response = dispatch(fetchWalletBalance());
  };
  useEffect(() => {
    verify_user();
    fetch_walllet();
  }, []);
  // useEffect(() => {
  //   document.addEventListener("mousemove", handleMouseMove);
  //   return () => {
  //     document.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, []);

  // const handleMouseMove = (e) => {
  //   setCursorPosition({ x: e.pageX, y: e.pageY });
  // };uth
  useEffect(() => {
    setLoadingDiv(true);
    const timer = setTimeout(() => {
      setLoadingDiv(false);
    }, 2000);
  }, []);
  const currentPage = window.location.pathname;
  const myArr = currentPage.split("/");
  return (
    <>
      {/* <div
        className="custom-cursor"
        style={{ left: cursorPosition.x, top: cursorPosition.y }}
      ></div> */}
      {/* <Route
        exact
        path="/verify/email/address/:id"
        component={Appverification}
      /> */}
      {loadingDiv === true ? (
        <DefaultComponentLoading />
      ) : (
        <div className="App">
          <div
            className="custom-cursor"
            style={{ left: cursorPosition.x, top: cursorPosition.y }}
          ></div>
          <div className="dark App">
            {myArr[1] === "dashboard" ? null : <Header />}
            <Routes>
              <Route
                path="/dashboard"
                element={<Navigate to="/dashboard/home" replace />}
              />
            </Routes>

            {myArr[1] === "dashboard" ? <Dashboard /> : <RouteInit />}

            {myArr[1] === "dashboard" ? null : <Footer />}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
