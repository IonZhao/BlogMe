import { myFirebase } from "../models/MyFirebase";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

async function getPosts(cat) {
  if (cat) {
    const data = await myFirebase.getPostsFromCat(cat);
    return data;
  } else {
    const data = await myFirebase.getPosts();
    return data;
  }
}

async function getPost(id) {
  // console.log("Get_Post_id", id);
  const post = await myFirebase.getPost(id);
  // console.log("Get_Post", post);
  const user = await myFirebase.getUser(post.uid);
  // console.log("Get_User", user);
  const data = {
    ...post,
    username: user.username,
    userImg: user.image,
  };
  return data;
}

async function deletePost(postId, userId) {
  // const { currentUser } = useContext(AuthContext);
  // const user = JSON.parse(localStorage.getItem("user"));
  // const user = currentUser;
  // console.log("user", user);
  // if (!user || user.id !== userId) {
  //   return "You are not authorized to delete this post";
  // }
  const response = await myFirebase.deletePost(postId);
  return response;
}

async function uploadImg(formData) {
  const file = formData.get("file");
  const url = await myFirebase.uploadImg(file);
  return url;
}

async function updatePost(post) {
  // const { currentUser } = useContext(AuthContext);
  // const user = JSON.parse(localStorage.getItem("user"));
  // const user = currentUser;
  // console.log("user", user);
  // if (!user || post.uid !== user.id) {
  //   return "You are not authorized to delete this post";
  // }
  const response = await myFirebase.updatePost(post);
  return response;
}

async function addPost(post) {
  // const { currentUser } = useContext(AuthContext);
  // const user = JSON.parse(localStorage.getItem("user"));
  // const user = currentUser;
  // console.log("user", user);
  // if (!user) {
  //   return "You are not authorized to add this post";
  // }
  // post.uid = user.id;

  const response = await myFirebase.addPost(post);
  return response;
}
export { getPosts, getPost, deletePost, uploadImg, updatePost, addPost };
