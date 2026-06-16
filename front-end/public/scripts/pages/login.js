import { authApi } from "../api/endpoint.js";

const loginForm = document.querySelector("#login-form form");
const registerForm = document.querySelector("#register-form form");
const loginInputs = document.querySelectorAll("#login-form input");
const registerInputs = document.querySelectorAll("#register-form input");

const switchToRegister = document.querySelector(
  ".toggle-link a[onclick*='register-form']",
);
const switchToLogin = document.querySelector(
  ".toggle-link a[onclick*='login-form']",
);

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
async function handleSubmit(event) {
  event.preventDefault();

  if (isStatus === "login-form") {
    const res = await authApi.login(data);

    if (res?.data) {
      localStorage.setItem("auth", true);
      location.assign("/home.html");
    }
  } else {
    const res = await authApi.register(data);

    if (res?.data) {
      toggleForm("login-form");
    }
  }
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
