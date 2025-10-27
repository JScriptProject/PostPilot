import React, { useState } from "react";
import { Link } from 'react-router-dom';
function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data =>", form);
  };
  return (
    <div className="login-page">
      <h1>One step to manage your employees.</h1>
      <div className="login-container">
        <h3>LOGIN PAGE</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            name="email"
            onChange={onChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            name="password"
            onChange={onChange}
          />
          <div className="addon-login-options">
            <div className="login-remember-section">
              <input type="checkbox" name="remember" id="remember-check" /><label htmlFor="remember-check">Remember</label>
            </div>
            <div className="login-forget">
              <Link to="/forget-password">Forget password</Link>
            </div>
          </div>
          <button className="btn btn-outline block mx-auto" type="submit">
            Login
          </button>
        </form>
        <hr />
        <div className="addon-login">
          <p>Are you already registered ?</p>
          <Link to="/signup" className="font-bold">Signup</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
