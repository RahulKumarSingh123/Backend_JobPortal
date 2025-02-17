const cloudinary = require("../configs/cloudinary-config");

const upload = async(filepath) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(filepath);
        return {
            secure_url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = upload;