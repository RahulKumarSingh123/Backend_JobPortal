const multer = require("multer");
const path = require("path");

//multer storage setup
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    },
});


//file filter funciton 
const checkFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new Error("Not an image Please upload again"))
    }
}


module.exports = multer({
    storage: storage,
    fileFilter: checkFileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});