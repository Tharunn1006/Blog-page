import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold dark:text-white">
        My Blog
      </Link>

      <div className="flex gap-4 items-center">

        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded"
        >
          {dark ? "Light ☀" : "Dark 🌙"}
        </button>

        <Link to="/create" className="text-gray-800 dark:text-gray-200">
          Create Post
        </Link>

        {user ? (
          <>
            <Link to="/myposts" className="text-gray-800 dark:text-gray-200">
              My Posts
            </Link>
            <button
              onClick={logout}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-800 dark:text-gray-200">
              Login
            </Link>
            <Link to="/register" className="text-gray-800 dark:text-gray-200">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
