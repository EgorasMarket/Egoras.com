import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const useProtect = () => {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user === null || user === undefined) {
      // navigate("/login");
      window.location.href = "/login";
    }
  }, [user]);
  return user;
};

export default useProtect;
