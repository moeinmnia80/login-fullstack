import { authApi } from "../api/endpoint.js";

const logout = document.getElementById("logout");
const usersBox = document.getElementById("users-box");

const auth = localStorage.getItem("auth");
!auth && location.assign("/pages/login.html");
let data = [];

window.addEventListener("load", async () => {
  try {
    const res = await authApi.getUsers();

    if (res.length) {
      document.querySelector(".loader").classList.remove("active");

      res.forEach((piece, index) => {
        usersBox.insertAdjacentHTML(
          "beforeend",
          `
            <div class="user">
              <span class="user__number">${index + 1}</span>
              <div class="user__img">
              </div>
              <div class="user__info">
                <h3 class="user__name">Name: ${piece?.name}</h3>
                <p class="user__email">Email: ${piece?.email}</p>
              </div>
              <div class="user__actions">
                <button class="user__remove" data-email="${piece?.email}">Remove</button>
                <button class="user__edit">Edit</button>
              </div>
            </div>
          `,
        );
      });
      const removeBtn = document.querySelectorAll(".user__remove");
      removeBtn.forEach((btn) =>
        btn.addEventListener("click", async (e) => {
          const email = e.target.dataset?.email;

          email && (await authApi.deleteUser({ email }));
          window.location.reload();
        }),
      );
    }
  } catch (error) {
    console.log("get users err", error);
  }
});

logout.addEventListener("click", () => {
  authApi.logout();
  window.location.reload();
});
