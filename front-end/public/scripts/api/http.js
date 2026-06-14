import { env } from "../config/env.js";

async function http(url, options = {}) {
  const response = await fetch(`http://localhost:5000${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export { http };
