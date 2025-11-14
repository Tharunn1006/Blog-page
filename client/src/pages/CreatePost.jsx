import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [msg, setMsg] = useState("");

  const { user, token } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts",
        {
          title,
          imageURL,
          content,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMsg("Post created successfully!");
      setTitle("");
      setImageURL("");
      setContent("");
      setCategory("General");
    } catch (err) {
      console.log(err);
      setMsg("Error creating post");
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5">
      <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full border p-2 rounded"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Image URL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded h-40"
          placeholder="Write your content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <select
          className="w-full border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>General</option>
          <option>Technology</option>
          <option>World</option>
          <option>Sports</option>
          <option>Finance</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Post
        </button>
      </form>

      {msg && <p className="mt-4 text-green-600">{msg}</p>}
    </div>
  );
}
