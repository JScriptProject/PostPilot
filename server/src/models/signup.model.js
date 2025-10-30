import mongoose from "mongoose";

const signUpSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
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
    },
    organization:{
        type:String
    },
    profile_photo:{
        type:String,
        required:true
    }
},{timestamps:true});

export const Signup = mongoose.model("Signup", signUpSchema);