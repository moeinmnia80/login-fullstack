import { authApi } from "../api/endpoint.js";

const $ = document;
const loginForm = $.querySelector("#login-form form");
const registerForm = $.querySelector("#register-form form");
const loginInputs = $.querySelectorAll("#login-form input");
const registerInputs = $.querySelectorAll("#register-form input");

const switchToRegister = $.querySelector(
  ".toggle-link a[onclick*='register-form']",
);
const switchToLogin = $.querySelector(".toggle-link a[onclick*='login-form']");

let isStatus = "login-form";
let data = {};

function toggleForm(formId) {
  document.querySelectorAll(".form-box").forEach((box) => {
    box.classList.remove("active");
  });
  isStatus = formId;
  document.getElementById(formId).classList.add("active");
}

const setupInputs = (inputs) => {
  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      data[e.target.name] = e.target.value;
    });
  });
};

setupInputs(loginInputs);
setupInputs(registerInputs);
const auth = localStorage.getItem("auth");
auth && location.assign("/home.html");
function handleSubmit(event) {
  event.preventDefault();

  isStatus === "login-form"
    ? authApi
        .login(data)
        .then((res) =>
          res?.data
            ? ((location.pathname = "/home.html"),
              localStorage.setItem("auth", true))
            : null,
        )
    : authApi.register(data).then((res) => console.log(res));
}
loginForm.addEventListener("submit", handleSubmit);
registerForm.addEventListener("submit", handleSubmit);

document.querySelectorAll(".toggle-link a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = e.target.textContent.toLowerCase().includes("register")
      ? "register-form"
      : "login-form";
    toggleForm(targetId);
  });
});
