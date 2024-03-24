import { myFirebase } from "../models/MyFirebase";

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
  const post = await myFirebase.getPost(id);
  const user = await myFirebase.getUser(post.uid);
  const data = {
    ...post,
    username: user.username,
    userImg: user.img,
  };
  return data;
}

async function deletePost(postId, userId) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.id !== userId) {
    return "You are not authorized to delete this post";
  }
  console.log("user", user);
  const response = await myFirebase.deletePost(postId);
  return response;
}

async function uploadImg(formData) {
  const file = formData.get("file");
  const url = await myFirebase.uploadImg(file);
  return url;
}

async function updatePost(post) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || post.uid !== user.id) {
    return "You are not authorized to delete this post";
  }
  const response = await myFirebase.updatePost(post);
  return response;
}

async function addPost(post) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return "You are not authorized to delete this post";
  }
  post.uid = user.id;

  const response = await myFirebase.addPost(post);
  return response;
}
export { getPosts, getPost, deletePost, uploadImg, updatePost, addPost };
