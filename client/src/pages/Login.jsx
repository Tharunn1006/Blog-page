import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        usernameOrEmail,
        password,
      });

      // SAVE USER + TOKEN
      login(res.data.user, res.data.token);

      navigate("/");
    } catch (err) {
      console.log(err);
      setMsg("Invalid login");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-5">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full border p-2 rounded"
          placeholder="Username or Email"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Login
        </button>
      </form>

      {msg && <p className="mt-4 text-red-600">{msg}</p>}
    </div>
  );
}
