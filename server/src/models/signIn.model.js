import mongoose from "mongoose";

const signInSchema = new mongoose.Schema({
    
    email:{
        type:String,
        required:[true,"Please enter a valid email id"],
        unique:true,
        lowercase:true,
        match:[/^\S+@\S+\.\S+$/, "Please enter a valid email format"]
    },
    password:{
        type:String,
        required:[true,"Password is required!"],
        minlength:[6, "password must be atleast 6 character long !"]
    }
},{timestamps:true});

export const SignIn = mongoose.model("SignIn", signInSchema);