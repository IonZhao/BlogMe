import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const nevigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    //setInputs({ ...inputs, [e.target.name]: e.target.value });
    // Or you can use this:
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(inputs);
    // console.log("response_2", response);

    if (typeof response === "object") {
      //Store the user in the local storage
      // localStorage.setItem("user", JSON.stringify(response));

      //Redirect to the home page
      // console.log("nevigate", nevigate);
      nevigate("/");
    } else {
      setError(response);
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {error && <p>{error}</p>}
        <span>
          Don't you have an account?
          <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
