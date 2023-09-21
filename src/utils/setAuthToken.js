import axios from "axios";
const setAuthToken = (token) => {
  console.log(localStorage.getItem("x-token"), "manhattan");
  axios.defaults.headers.common["x-token"] = token;
};
export const deleteAuthToken = () => {
  delete axios.defaults.headers.common["x-token"];
};
export default setAuthToken;
