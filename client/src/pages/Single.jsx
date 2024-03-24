import React from "react";
import { Link } from "react-router-dom";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import Menu from "../components/Menu";

// const Single = () => {
//   return (
//     <div className="single">
//       <div className="content">
//         <img src={`../upload/${this.state.post.img}`} alt="image"></img>
//         <div className="user">
//           <img src={this.state.post.userImg} alt="image"></img>
//           <div className="info">
//             <span>{this.state.post.username}</span>
//             <p>Posted {moment(this.state.post.date).fromNow()}</p>
//           </div>
//           {currentUser && currentUser.username === this.state.post.username && (
//             <EditPart post={this.state.post} />
//           )}
//         </div>
//         <h1 className="title">
//           {this.state.post ? this.state.post.title : null}
//         </h1>
//         {getText(this.state.post.description)}
//       </div>
//       <Menu cat={this.state.post.cat} />
//     </div>
//   );
// };

const Single = () => {
  return (
    <div className="single">
      <div className="content">
        <img src={`https://source.unsplash.com/random`} alt="image"></img>
        <div className="user">
          <img src={"https://source.unsplash.com/random"} alt="image"></img>
          <div className="info">
            <span>John</span>
            <p>Posted 2 days ago</p>
          </div>
          <div className="edit">
            <Link to={`/write?edit=2`}>
              <img src={Edit} alt="" />
            </Link>

            <img src={Delete} alt="" />
          </div>
          {/* {currentUser && currentUser.username === this.state.post.username && (
            <EditPart post={this.state.post} />
          )} */}
        </div>
        <h1 className="title">
          {/* {this.state.post ? this.state.post.title : null} */}
          lorem ipsum dolor sit amet
        </h1>
        <p>Lorem sadasdasd</p>
        {/* {getText(this.state.post.description)} */}
      </div>
      <Menu />
    </div>
  );
};

export default Single;
