import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { verifySession } from '../api/auth.api.js';

function ProtectedRoute({children}) {

    const [authChecked, setAuthChecked] = useState(false);
    const [authorized, setAuthorized] = useState(false);

    useEffect(()=>{
        const onSessionVerification = async()=>{
            const response = await verifySession();
            console.log("response =>", response);
            if(response.success)
            {
                setAuthorized(true);
            }else{
                setAuthorized(false);
            }
            setAuthChecked(true);
        }
        onSessionVerification();
    },[])

    if(!authChecked) return(<p>Chekcing session...</p>);
 console.log("final CHeck  =>", authChecked, authorized);
    return(
        authorized ? children : <Navigate to="/login" replace />
    )
}

export default ProtectedRoute