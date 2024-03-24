import React from "react";
import { useEffect, useState } from "react";
import { getPosts } from "../controller/postController";

function Menu({ cat }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getFromStore = async () => {
      const data = await getPosts(cat);
      setPosts(data);
    };
    getFromStore();
  }, [cat]);

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={`${post?.img}`} alt="" />
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
}

export default Menu;
