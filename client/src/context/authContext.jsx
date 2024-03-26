import { createContext, useEffect } from "react";
import { login as userLogin, register } from "../controller/userController";
import { useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(
  //   JSON.parse(localStorage.getItem("user")) || null
  // );
  const [currentUser, setCurrentUser] = useState();
  // console.log("authProvider", currentUser);

  const login = async (inputs) => {
    const response = await userLogin(inputs);
    setCurrentUser(response);
    return response;
  };

  const logout = () => {
    // localStorage.removeItem("user");
    setCurrentUser(null);
  };

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(currentUser));
  // }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
