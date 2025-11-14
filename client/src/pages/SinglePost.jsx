import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const nav = useNavigate();

  useEffect(()=>{
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(res=>setPost(res.data))
      .catch(()=>setPost(null));
  },[id]);

  async function handleDelete(){
    if(!confirm("Delete this post?")) return;
    try{
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      alert("Deleted");
      nav("/");
    }catch(err){
      alert("Delete failed");
    }
  }

  if(!post) return <div className="p-6 text-center dark:text-white">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow">
      <img src={post.imageURL} alt={post.title} className="w-full h-64 object-cover rounded" />
      <h1 className="text-3xl font-bold mt-4 dark:text-white">{post.title}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">By <b>{post.username}</b></p>
      <p className="mt-4 text-gray-700 dark:text-gray-200">{post.content}</p>

      <div className="mt-6 flex gap-4">
        <button onClick={()=>nav(`/edit/${post._id}`)} className="px-4 py-2 bg-blue-600 text-white rounded">Edit</button>
        <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
      </div>
    </div>
  );
}
