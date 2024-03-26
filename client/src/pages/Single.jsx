import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import Menu from "../components/Menu";
import { useEffect, useState, useContext } from "react";
import { getPost, deletePost } from "../controller/postController";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = useState([]);

  const params = useParams();
  const nevagate = useNavigate();
  // const location = useLocation();
  // const id = location.pathname.split("/")[2];

  const id = params.id;
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getFromStore = async () => {
      // console.log("id", id);
      const data = await getPost(id);
      // console.log("data", data);
      data.id = id;
      setPost(data);
    };
    getFromStore();
  }, [id]);

  const handleDelete = async () => {
    const user = currentUser;
    if (!user || user.id !== post.uid) {
      alert("You are not authorized to delete this post!");
      return;
    }
    await deletePost(id, post.uid);
    nevagate("/");
  };

  return (
    <div className="single">
      <div className="content">
        <img src={post?.img} alt="image"></img>
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="image"></img>}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment.unix(post.date?.seconds).fromNow()}</p>
          </div>

          {currentUser && currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>

              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1 className="title">{post?.title}</h1>

        <p
          className="description"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.description),
          }}
        ></p>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
