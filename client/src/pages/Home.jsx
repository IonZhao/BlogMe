import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "../controller/postController";

// const posts = [
//   {
//     id: 1,
//     title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean volutpat, nulla tempor vestibulum facilisis, nunc lorem accumsan lorem, ut congue tortor nibh ut enim. In vel vehicula ante. Curabitur eget ultricies magna, id posuere dolor. Suspendisse ut ligula vitae lorem iaculis molestie. Suspendisse molestie lacus eget tincidunt sodales. Nunc sed eleifend dui, sed condimentum nibh. Suspendisse at ipsum malesuada velit ultrices ultricies in in nulla. Etiam ut malesuada purus. Fusce pharetra dui ut ullamcorper dictum. Aliquam erat volutpat. Sed eu efficitur augue.",
//     img: "https://source.unsplash.com/random",
//   },
//   {
//     id: 2,
//     title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean volutpat, nulla tempor vestibulum facilisis, nunc lorem accumsan lorem, ut congue tortor nibh ut enim. In vel vehicula ante. Curabitur eget ultricies magna, id posuere dolor. Suspendisse ut ligula vitae lorem iaculis molestie. Suspendisse molestie lacus eget tincidunt sodales. Nunc sed eleifend dui, sed condimentum nibh. Suspendisse at ipsum malesuada velit ultrices ultricies in in nulla. Etiam ut malesuada purus. Fusce pharetra dui ut ullamcorper dictum. Aliquam erat volutpat. Sed eu efficitur augue.",
//     img: "https://source.unsplash.com/random",
//   },
//   {
//     id: 3,
//     title:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit.rem iaculis molestie.",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean volutpat, nulla tempor vestibulum facilisis, nunc lorem accumsan lorem, ut congue tortor nibh ut enim. In vel vehicula ante. Curabitur eget ultricies magna, id posuere dolor. Suspendisse ut ligula vitae lorem iaculis molestie. Suspendisse molestie lacus eget tincidunt sodales. Nunc sed eleifend dui, sed condimentum nibh. Suspendisse at ipsum malesuada velit ultrices ultricies in in nulla. Etiam ut malesuada purus. Fusce pharetra dui ut ullamcorper dictum. Aliquam erat volutpat. Sed eu efficitur augue.",
//     img: "https://source.unsplash.com/random",
//   },
// ];

const getText = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent;
};

const Home = () => {
  const [posts, setPosts] = useState([]);

  const location = useLocation();
  const cat = new URLSearchParams(location.search).get("cat");

  useEffect(() => {
    const getFromStore = async () => {
      const data = await getPosts(cat);
      setPosts(data);
    };
    getFromStore();
  }, [cat]);

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="image">
              <img src={post.img} alt="" />
            </div>

            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.description)}</p>

              <Link className="link" to={`/post/${post.id}`}>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
