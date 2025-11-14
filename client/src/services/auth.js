// client/src/services/auth.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // <-- ensure backend runs at port 5000
});

// register: { username, password }
export async function registerUser(payload) {
  const res = await API.post("/auth/register", payload);
  return res.data; // expects { message, token, ... } or similar
}

// login: { username, password }
export async function loginUser(payload) {
  const res = await API.post("/auth/login", payload);
  return res.data;
}
