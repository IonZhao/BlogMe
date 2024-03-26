import { myFirebase } from "../models/MyFirebase";

async function register(user) {
  const exists = await myFirebase.checkUser(user.email, user.username);
  if (exists) {
    return "User already exists!";
  } else {
    user.image =
      "https://source.unsplash.com/random?seed=" +
      Math.floor(Math.random() * 100);
    console.log("user", user);
    await myFirebase.addUser(user);
    return "User has been created!";
  }
}

async function login(user) {
  const users = await myFirebase.login(user);
  console.log("users", users);
  //   console.log("users.length", users.length);

  if (users.length === 0) {
    return "User not found!";
  } else if (users[0].password !== user.password) {
    return "Wrong username or password!";
  }
  const { password, ...other } = users[0];
  return other;
}

// async function logout() {

//   return "User has been logged out!";
// }

export { register, login };
