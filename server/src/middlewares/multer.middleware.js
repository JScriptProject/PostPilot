import multer from 'multer';
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        const uploadPath = path.resolve("public/temp");
        console.log("The Upload path  =>", uploadPath);
        cb(null, uploadPath)
    },
    filename:(req,file, cb)=>{
        cb(null, Date.now() + "-" + file.fieldname);
    }
})

export const upload = multer({storage:storage});
