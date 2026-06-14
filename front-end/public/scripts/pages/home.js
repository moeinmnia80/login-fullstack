import { authApi } from "../api/endpoint.js";

const auth = localStorage.getItem("auth");
!auth && location.assign("/pages/login.html");
const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  authApi.logout();
  window.location.reload();
});
