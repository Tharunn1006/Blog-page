import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!post) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>

      {post.imageURL && (
        <img
          src={post.imageURL}
          alt="post"
          className="w-full h-64 object-cover rounded my-4"
        />
      )}

      <p className="text-gray-600 text-sm mb-4">
        By <b>{post.username}</b> — {new Date(post.createdAt).toLocaleString()}
      </p>

      <p className="text-lg leading-relaxed">{post.content}</p>
    </div>
  );
}
