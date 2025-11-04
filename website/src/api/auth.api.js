import axios from "axios";
const SERVER_URI = "http://localhost:8000";
export const signupConnect = async (formData) => {
  try {
    const response = await axios.post(`${SERVER_URI}/api/v1/signup`, formData);
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
    const response = await axios.post(`${SERVER_URI}/api/v1/login`, formData);
    console.log(response);
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
    const response = await axios.post(`${SERVER_URI}/api/v1/me`,{}, {
      withCredentials: true,
    });
    console.log(response);
    return {
      success: true,
      message: response.data.message,
      user: response.data.data.user,
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
