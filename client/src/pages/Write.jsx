import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadImg, updatePost, addPost } from "../controller/postController";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Write = () => {
  const state = useLocation().state;

  const [value, setValue] = useState(state?.description || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const { currentUser } = useContext(AuthContext);

  const nevigate = useNavigate();

  const upload = async () => {
    if (!file) return;

    // console.log("uploading");
    const formData = new FormData();
    formData.append("file", file);
    // console.log(formData);

    const url = await uploadImg(formData);
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = await upload();

    const user = currentUser;

    let post = {
      title,
      description: value,
      cat,
    };
    if (state) {
      post.id = state.id;
      post.date = state.date;
      post.uid = state.uid;
      post.img = file ? url : state.img;
      if (!user || post.uid !== user.id) {
        alert("You are not authorized to update this post!");
        return;
      }
      post.uid = user.id;
      // console.log("Updating", post);
      nevigate("/");
      await updatePost(post);
    } else {
      post.img = file
        ? url
        : "https://source.unsplash.com/random?seed=" +
          Math.floor(Math.random() * 100);
      if (!user) {
        alert("You are not authorized to add this post, please login first!");
        return;
      }
      post.uid = user.id;
      // console.log("submitting", post);
      nevigate("/");
      await addPost(post);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>

        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="art"
              id="art"
              checked={cat === "art"}
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="science"
              id="science"
              checked={cat === "science"}
              onChange={(e) => setCat(e.target.value)}
            ></input>
            <label htmlFor="science">Science</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="technology"
              checked={cat === "technology"}
              onChange={(e) => setCat(e.target.value)}
              id="technology"
            ></input>
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="cinema"
              checked={cat === "cinema"}
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            ></input>

            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="design"
              id="design"
              checked={cat === "design"}
              onChange={(e) => setCat(e.target.value)}
            ></input>
            <label htmlFor="design">Design</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="food"
              id="food"
              checked={cat === "food"}
              onChange={(e) => setCat(e.target.value)}
            ></input>
            <label htmlFor="food">Food</label>
          </div>

          {/* Add other categories similarly */}
        </div>
      </div>
    </div>
  );
};

export default Write;
