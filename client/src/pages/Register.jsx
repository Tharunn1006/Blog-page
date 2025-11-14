import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username: form.username,
          email: form.email,
          password: form.password,
        }
      );

      alert("User Registered Successfully!");
      console.log(res.data);

    } catch (err) {
      console.log(err);
      if (err.response) {
        setError(err.response.data.message || "Server Error");
      } else {
        setError("Network Error");
      }
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <label>Username</label>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        <label>Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Register
        </button>

      </form>
    </div>
  );
}
