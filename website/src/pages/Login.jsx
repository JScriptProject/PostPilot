import React, { useState, useEffect } from "react";
import {loginConnect, verifySession} from '../api/auth.api.js';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  //declair all states
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember:false
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] =  useState("");
  const [checkingSession, setCheckingSession] = useState(true);

  //destructing
  const { email, password, remember } = form;

  const navigate = useNavigate();
  //useEffect to redirect to dashboard for logged in user

   useEffect(()=>{
    const onSessionVerification = async()=>{
      const response = await verifySession();
      console.log("response =>", response);
      if(response.success)
      {
        navigate("/dashboard");
      }
      else{
        setCheckingSession(false);
      }
    }
    onSessionVerification();
   },[navigate])

  //Onchnage function
  const onChange = (e) => {
    const { name, type, value, checked } = e.target;
    if(checked)
    {
      console.log("Checkbox Value =>", checked);
    }
    setForm((prev) => ({ ...prev, [name]: type==="checkbox" ? checked : value }));
  };

  //onClick event onSubmit function
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form data =>", form);
    const result = await loginConnect(form);
    console.log(result);
  
    if(result.success)
    {
      navigate("/dashboard");
    }
    setLoading(false);
    if(!result.success)
    {
      setMessage(result.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

//return JSX

  if(checkingSession)  return<p>Checking session...</p>
 
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
              <input type="checkbox" name="remember" id="remember-check" checked={remember} onChange={onChange} /><label htmlFor="remember-check">Remember</label>
            </div>
            <div className="login-forget">
              <Link to="/forget-password">Forget password</Link>
            </div>
          </div>
          <button className="btn btn-outline block mx-auto btn-auth" type="submit" disabled={loading}>
           {
            loading ? (<div className="btn-loader">
              <div className="spinner-small"></div>
              <span>Logging In...</span>
            </div>) : "Login"
           }
          </button>
        </form>
        <hr />
        <div className="addon-login">
          <p>Are you already registered ?</p>
          <Link to="/signup" className="font-bold">Signup</Link>
        </div>
      </div>
      {message && <p className="error-message message">{message}</p>}
    </div>
  );
}

export default Login;
