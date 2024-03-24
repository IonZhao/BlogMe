import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../controller/userController";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const nevigate = useNavigate();

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
    const response = await register(inputs);
    if (response === "User has been created!") {
      nevigate("/login");
    } else {
      setError(response);
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Register</button>
        {error && <p>{error}</p>}
        <span>
          Don you have an account?
          <br />
          <Link to="/login">login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
