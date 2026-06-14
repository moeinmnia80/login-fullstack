import { http } from "./http.js";

export const authApi = {
  register: (payload) =>
    http("/users/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  login: (payload) =>
    http("/users/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  logout: () => {
    localStorage.removeItem("auth");
  },
};
