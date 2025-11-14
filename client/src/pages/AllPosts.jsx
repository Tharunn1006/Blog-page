import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import samplePosts from "../services/samplePosts.js";

export default function AllPosts(){
  const [posts, setPosts] = useState([]);
  useEffect(()=> {
    axios.get("http://localhost:5000/api/posts")
      .then(res => setPosts(res.data.length?res.data:samplePosts))
      .catch(()=>setPosts(samplePosts));
  }, []);
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">All Posts</h1>
      <div className="space-y-4">
        {posts.map(p=>(
          <div key={p._id} className="p-4 bg-white dark:bg-gray-900 rounded shadow">
            <Link to={`/post/${p._id}`} className="text-xl font-semibold dark:text-white">{p.title}</Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">{p.content?.substring(0,120)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
