import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MyPosts() {
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);

  async function loadPosts() {
    if (!username.trim()) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/api/posts/mine/${username}`
      );
      setPosts(res.data);
    } catch (err) {
      console.log(err);
      alert("Error loading posts");
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">My Posts</h2>

      <input
        className="border p-2 rounded w-full mb-4"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button
        onClick={loadPosts}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Load My Posts
      </button>

      <div className="mt-6">
        {posts.length === 0 && <p>No posts found.</p>}

        {posts.map((post) => (
          <div key={post._id} className="border p-4 rounded mb-4">
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p className="text-gray-600 mb-2">By {post.username}</p>

            <Link
              to={`/post/${post._id}`}
              className="text-blue-600 underline"
            >
              View Post
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
