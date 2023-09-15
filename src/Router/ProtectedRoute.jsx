import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  if (user) {
    return (
      <div>
        <Header />

        <Outlet />
      </div>
    );
  }

  if (user === null) {
    return navigate("/login");
  }
};

export default ProtectedRoute;
