const multer = require("multer")
const path = require("path")

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb)=>{
        console.log(file);
        const ext = path.extname(file.originalname)
        console.log(ext);

        if(ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg"){
            return cb(new Error("formato incorrecto"), false)
        }else {
        cb(null, true)
    }}
})