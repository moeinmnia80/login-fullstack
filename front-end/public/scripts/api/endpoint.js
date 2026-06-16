import { http } from "./http.js";

export const authApi = {
  getUsers: () => http("/users"),
  deleteUser: (payload) => {
    http("/users/delete", {
      method: "DELETE",
      body: JSON.stringify(payload),
    });
  },
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
