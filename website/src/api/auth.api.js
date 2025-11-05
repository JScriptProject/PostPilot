import api from "../api/axiosInstance.js";

export const signupConnect = async (formData) => {
  try {
    const response = await api.post(`/api/v1/signup`, formData);
    console.log("Response =>", response);
    console.log("response data =>", response.data);
    // return response.data.message;
    return {
      success: true,
      message: response.data.message,
      status: response.status,
    };
  } catch (error) {
    const errorMessage = error.response.data.error || "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      status: error.response?.status || 500,
    };
  }
};

export const loginConnect = async (formData) => {
  try {
    const response = await api.post(`/api/v1/login`, formData);
    console.log("Login connect Response in aAPI =>",response);
    return {
      success: true,
      message: response.data.message,
      user: response.data.data.user,
      profile: response.data.data.profile_photo,
      status: response.status,
    };
  } catch (error) {
    console.log(error);
    const errorMessage = error.response.data?.message || "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      status: error.response?.status || 500,
    };
  }
};

export const verifySession = async () => {
  try {
    const response = await api.post(`/api/v1/me`);
    console.log("Verify Session resposne in API",response);
    return {
      success: true,
      message: response.data.message,
      user: response.data.data,
      status: response.status,
    };
  } catch (error) {
    console.log(error);
    const errorMessage = error.response.data?.message || "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      status: error.response?.status || 500,
    };
  }
};

export const logoutConnect = async() =>{

  try {
       const response = await api.post(`/api/v1/logout`);
       console.log("Logout Response =>",response);
       return{
        success:true,
        message:response.data.message,
        status:response.status
       };
  } catch (error) {
     console.log(error);
     const errorMessage = error.response?.data?.message || "logout failed";
     return{
      success:false,
      message:errorMessage,
      status:error.response?.status || 500
     }
  }
};