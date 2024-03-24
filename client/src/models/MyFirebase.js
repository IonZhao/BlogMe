// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  query,
  orderBy,
  addDoc,
  deleteDoc,
  setDoc,
  doc,
  where,
} from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { Timestamp } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

function MyFirebase() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCCKKICoSKelELLm9LiVoLkQNmR_ApIdvE",
    authDomain: "blogme-7f01a.firebaseapp.com",
    projectId: "blogme-7f01a",
    storageBucket: "blogme-7f01a.appspot.com",
    messagingSenderId: "1025877536945",
    appId: "1:1025877536945:web:7714e133847c12e70c3290",
    measurementId: "G-XQYEMEBGGN",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const db = getFirestore(app);
  let users = [];
  let posts = [];

  const me = {};

  //get all the users
  me.getUsers = async () => {
    // clear the users array
    const usersRef = collection(db, "users");
    const q = query(usersRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const user = doc.data();
      user.id = doc.id;
      users.push(user);
    });
    return users;
  };

  // Check if the user exists
  me.checkUser = async (email, username) => {
    console.log("checkUser", email, username);

    const query1 = query(collection(db, "users"), where("email", "==", email));
    const query2 = query(
      collection(db, "users"),
      where("username", "==", username)
    );
    let combinedResults = [];

    // get all the users with the same email or name
    await Promise.all([getDocs(query1), getDocs(query2)])
      .then((results) => {
        results.forEach((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const user = doc.data();
            user.id = doc.id;

            combinedResults.push(user);
          });
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    // if the user exists, return the user
    return combinedResults.length > 0;
  };

  // Check the user's credentials
  me.login = async (user) => {
    const query1 = query(
      collection(db, "users"),
      where("username", "==", user.username)
    );
    users = [];

    await getDocs(query1).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        user.id = doc.id;
        users.push(user);
      });
    });

    // console.log("Firebase_users", users);
    return users;
  };

  me.getUser = async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };

  // Add a new user
  me.addUser = async (user) => {
    const docRef = await addDoc(collection(db, "users"), user);
    return docRef.id;
  };

  //Delete a user
  me.deleteUser = async (id) => {
    const request = await deleteDoc(doc(db, "users", id));
    return request;
  };

  // Update a user
  me.updateUser = async (user) => {
    const request = await setDoc(doc(db, "users", user.id), user);
    return request;
  };

  // Get all the posts
  me.getPosts = async () => {
    // clear the posts array
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    posts = [];
    querySnapshot.forEach((doc) => {
      const post = doc.data();
      post.id = doc.id;
      posts.push(post);
    });
    return posts;
  };

  // Get a specific post
  me.getPost = async (id) => {
    // console.log("getPost", id);
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    // console.log("docSnap", docSnap);
    return docSnap.data();
  };

  // Get posts from a specific cat
  me.getPostsFromCat = async (cat) => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("cat", "==", cat));
    const querySnapshot = await getDocs(q);
    posts = [];
    querySnapshot.forEach((doc) => {
      const post = doc.data();
      post.id = doc.id;
      posts.push(post);
    });
    return posts;
  };

  me.addPost = async (post) => {
    const timestamp = Date.now();
    post.date = timestamp;
    console.log("addPost", post);

    const docRef = await addDoc(collection(db, "posts"), post);
    return docRef.id;
  };

  me.deletePost = async (postId) => {
    const response = await deleteDoc(doc(db, "posts", postId));
    return response;
  };

  me.updatePost = async (post) => {
    // console.log("updatePost", post);
    const response = await setDoc(doc(db, "posts", post.id), post);
    return response;
  };

  me.uploadImg = async (file) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, `images/${file.name}`);
    const response = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(response.ref);
    return url;
  };

  return me;
}

export const myFirebase = new MyFirebase();
