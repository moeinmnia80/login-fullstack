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
  data = {};
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
  try {
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
  } catch (err) {
    console.error("Auth error:", err);
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
