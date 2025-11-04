import React, { useState } from "react";
import { signupConnect } from "../api/auth.api.js";
import { Link } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    fname: "",
    email: "",
    password: "",
    confirm_password: "",
    organization: "",
    profile_photo: "",
  });

  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({msg:"",success:null});
  const [passwordValidating, setPasswordValidating] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    fname,
    email,
    password,
    confirm_password,
    organization,
    profile_photo,
  } = form;
  const onChange = (e) => {
    let file = null;
    const { name, value } = e.target;
    if (name === "profile_photo") {
      file = e.target.files[0];
    }
    setForm((prev) => ({ ...prev, [name]: value }));
    if (file) {
      setFile(file);
      setFileName(file.name);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form data =>", form);
    const formData = new FormData();
    formData.append("fname", form.fname);
    formData.append("email", form.email);
    formData.append("password", form.password);

    formData.append("organization", form.organization || "No Org");
    formData.append("profile_photo", file);
      console.log("Great!!");
      const result = await signupConnect(formData);
      console.log("Result =>", result.message);
      setLoading(false);
      setForm({
        fname: "",
        email: "",
        password: "",
        confirm_password: "",
        organization: "",
        profile_photo: "",
      });
      setFile(null);
      setFileName("");
      setMessage({msg:result.message, success:result.success});
      setTimeout(() => {
        setMessage({msg:"",success:null});
      }, 4000);
  
  };

  const onBlurPassword = (e) => {
    const value = e.target.value;
    if (value.length < 6) {
      setMessage({msg:"Password should be minimum 6 character", success:false});
    } else {
      setMessage({msg:"", success:null});
    }
  };

  const onBlurConfirm = (e) => {
    const value = e.target.value;
    if (value !== password) {
      setMessage({msg:"Password should match", success:false});
    } else {
      setMessage({msg:"", success:null});
    }
  };

  return (
    <div className="login-page">
      {/* {message && <p className="message">{message}</p>} */}
      <h1>One step to manage your employees.</h1>
      <div className="login-container">
        <h3>SINGNUP PAGE</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={fname}
            name="fname"
            onChange={onChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            name="email"
            onChange={onChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            name="password"
            onChange={onChange}
            minLength={6}
            onBlur={onBlurPassword}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm_password}
            name="confirm_password"
            onChange={onChange}
            onBlur={onBlurConfirm}
            required
          />
          <input
            type="text"
            placeholder="Organization(optional)"
            value={organization}
            name="organization"
            onChange={onChange}
          />
          <div className="input-box">
            <input
              type="file"
              value={profile_photo}
              name="profile_photo"
              onChange={onChange}
              id="profile_photo"
              required
            />
            <label htmlFor="profile_photo">Profile Photo</label>
            {fileName && <p className="filename">{fileName}</p>}
          </div>
          <button
            className="btn btn-outline block mx-auto btn-auth"
            type="submit"
            disabled={loading || passwordValidating}
          >
            {loading ? (
              <div className="btn-loader">
                <div className="spinner-small"></div>
                <span>Signing Up...</span>
              </div>
            ) : (
              "Signup"
            )}
          </button>
        </form>
        <hr />
        <div className="addon-login">
          <p>Are you already registered ?</p>
          <Link to="/login" className="font-bold">
            Login
          </Link>
        </div>
      </div>
      {(message.msg && !message.success) && <p className="error-message message">{message.msg}</p>}
      {(message.msg && message.success) && <p className="success-message message">{message.msg}</p>}
    </div>
  );
}

export default Signup;
