import axios from "axios"
const SERVER_URI = "http://localhost:8000";
const signupConnect = async(formData) => {
    
    try {
        const response = await axios.post(`${SERVER_URI}/api/v1/signup`,formData);
    // return response.data.message;
    return{
        success:true,
        message:response.data.message,
        status:response.status
    }
        
    } catch (error) {
        const errorMessage = error.response.data.error || "Something went wrong";
        return{
            success:false,
            message:errorMessage,
            status:error.response?.status || 500,
        }
    }
    
}
export { signupConnect }