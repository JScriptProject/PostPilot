import React from 'react';
import { logoutConnect } from '../api/auth.api.js';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = async()=>{
    const result = await logoutConnect();
    console.log(result);
    if(result.success)
    {
      navigate("/login", {replace:true});
    }
  }
  return (
    <>
     <div>Dashboard</div>
     <button onClick={handleLogout}>logout</button>
    </>
   
  )
}

export default Dashboard