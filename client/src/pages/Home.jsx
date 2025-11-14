import { useEffect, useState } from "react";
import axios from "axios";
import samplePosts from "../services/samplePosts";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(4);

  async function loadPosts() {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");

      if (res.data.length === 0) setPosts(samplePosts);
      else setPosts(res.data);
    } catch (err) {
      console.log("Error loading posts:", err);
      setPosts(samplePosts);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="flex dark:bg-gray-900">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 min-h-screen p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Categories</h2>

        <ul className="space-y-2">
          <li className="text-gray-700 dark:text-gray-300">Technology</li>
          <li className="text-gray-700 dark:text-gray-300">Sports</li>
          <li className="text-gray-700 dark:text-gray-300">World News</li>
          <li className="text-gray-700 dark:text-gray-300">Entertainment</li>
          <li className="text-gray-700 dark:text-gray-300">Business</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-4xl font-bold mb-6 dark:text-white text-center">
          Latest News
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.slice(0, visible).map((post) => (
            <div
              key={post._id || post.title}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={post.imageURL}
                alt={post.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="text-2xl font-semibold dark:text-white">
                  {post.title}
                </h2>

                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  {post.content.substring(0, 120)}...
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  Posted by <b>{post.username || "Admin"}</b>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visible < posts.length && (
          <div className="text-center mt-6">
            <button
              onClick={() => setVisible(visible + 4)}
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
            >
              Load More
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
