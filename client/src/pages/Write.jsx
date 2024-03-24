import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Write = () => {
  const [value, setValue] = React.useState("");

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          // value={title}
          onChange={(e) => setValue({ title: e.target.value })}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={(value) => setValue({ value })}
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
            // onChange={(e) => this.setState({ file: e.target.files[0] })}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick="">Publish</button>
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
              // onChange={(e) => this.setState({ cat: e.target.value })}
            />
            <label htmlFor="art">Art</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="science"
              id="science"
              // onChange={(e) => this.setState({ cat: e.target.value })}
            ></input>
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="technology"
              // onChange={(e) => this.setState({ cat: e.target.value })}
              id="technology"
            ></input>
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="cinema"
              id="cinema"
              // onChange={(e) => this.setState({ cat: e.target.value })}
            ></input>

            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="design"
              id="design"
              // onChange={(e) => this.setState({ cat: e.target.value })}
            ></input>
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="food"
              id="food"
              // onChange={(e) => this.setState({ cat: e.target.value })}
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
