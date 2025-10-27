import React,{useState} from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({
    fname:"",
    email: "",
    password: "",
    confirm_password:"",
    organization:"",
    profile_photo:""
  });

  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);


  const { fname, email, password, confirm_password, organization, profile_photo} = form;

  const onChange = (e) => {
    let file = null;
    const { name, value } = e.target;
    if(name === "profile_photo")
    { file = e.target.files[0];}
    setForm((prev) => ({...prev, [name]: value }));
    if(file)
    {
      setFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data =>", form);
    const formData = new FormData();
formData.append("fname", form.fname);
formData.append("email", form.email);
formData.append("password", form.password);
formData.append("confirm_password", form.confirm_password);
formData.append("organization", form.organization);
formData.append("profile_photo", file); 
if(password === confirm_password){
console.log("Great!!");
}
else{
  console.log("password should match");
}
  };
  return (
    <div className="login-page">
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
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm_password}
            name="confirm_password"
            onChange={onChange}
            required
          />
           <input
            type="text"
            placeholder="Organization(optional)"
            value={organization}
            name="organization"
            onChange={onChange}
            required
          />
          <div className="input-box">
            
          <input
            type="file"
            value={profile_photo}
            name="profile_photo"
            onChange={onChange}
            id='profile_photo'
            required
          />
          <label htmlFor="profile_photo">Profile Photo</label>
           {fileName && <p className='filename'>{fileName}</p>}
          </div>   
          <button className="btn btn-outline block mx-auto" type="submit">
            Signup
          </button>
         
        </form>
        <hr />
        <div className="addon-login">
          <p>Are you already registered ?</p>
          <Link to="/login" className="font-bold">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup