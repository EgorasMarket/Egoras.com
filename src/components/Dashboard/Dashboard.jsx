import React, { useEffect, useState } from "react";
import DashBoardNav from "./DashBoardNav";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import DashboardHeader from "./DashboardHeader";
import "./DashboardStyles/Dashboard.css";
import { useSelector } from "react-redux";
const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentRoute, setCurrentRoute] = useState("Dashboard");

  const currentPathname = location.pathname;

  const { user, loading, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user === null || (user === undefined && loading === false)) {
      window.location.href = "/login";
    }
    //console.logog(user);
  }, [user]);
  useEffect(() => {
    const currentRoute = routes.find(
      (data) => `${data.layout}/${data.path}` === currentPathname
    );
    if (currentRoute) {
      //console.logog(currentRoute.name);
      setCurrentRoute(currentRoute.name);
    }
  }, [currentPathname]);

  const getRoutes = (routes) => {
    return routes.map((data, key) => {
      if (data.layout === "/dashboard") {
        return (
          <Route
            path={`/dashboard/${data.path}`}
            element={data.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  if (user) {
    return (
      <div className="Dashboard">
        <div className="Dashboard_body_area_1">
          <DashBoardNav routes={routes} activeRoute={currentRoute} />
        </div>
        <div className="Dashboard_body_area">
          <DashboardHeader currentPathName={currentRoute} />
          <div className="Dashboard_body">
            <Routes>{getRoutes(routes)}</Routes>
          </div>
        </div>
      </div>
    );
  }

  // if (loading === false && user === null) {
  //   return (window.location.href = "/login");
  // }
};

export default Dashboard;
