// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  deleteDoc,
  setDoc,
  doc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

function MyFirebase() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAvEpU6_CjAmWwnf2s6guawjWI6brPOwT4",
    authDomain: "shoppingcart-79404.firebaseapp.com",
    projectId: "shoppingcart-79404",
    storageBucket: "shoppingcart-79404.appspot.com",
    messagingSenderId: "984852353278",
    appId: "1:984852353278:web:f3850b3cf7890a552b95af",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  let products = [];

  const me = {};

  me.getProducts = async () => {
    // clear the products array

    const productsRef = collection(db, "Products");
    // https://stackoverflow.com/questions/46590155/firestore-permission-denied-missing-or-insufficient-permissions

    const q = query(productsRef, orderBy("createdDate", "desc"));
    // const q = query(productsRef);
    const querySnapshot = await getDocs(q);

    products = [];
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      product.id = doc.id;
      products.push(product);
    });

    // console.log("firebase_length:", products.length);
    return products;
  };

  //select a range of products
  me.getProductsRange = (start, end) => {
    return [products.slice(start, end), products.length];
  };

  me.addProduct = async (product) => {
    // console.log("addProduct", product);
    const docRef = await addDoc(collection(db, "Products"), product);
    // console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  };

  me.deleteProduct = async (id) => {
    // console.log("deleteProduct", id);
    const request = await deleteDoc(doc(db, "Products", id));
    return request;
  };

  //update a product
  me.updateProduct = async (product) => {
    // console.log("updateProduct", product.id, product);

    // const request = await updateDoc(doc(db, "Products", id), product);
    const request = await setDoc(doc(db, "Products", product.id), product);

    return request;
  };

  return me;
}

export const myFirebase = new MyFirebase();
