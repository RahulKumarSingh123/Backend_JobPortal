const jwt = require('jsonwebtoken');
const authMiddleware = async(req, res, next) => {
    try {
        const token = await req.headers["authorization"];
        const userInfo = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
        if (userInfo) {
            req.user = userInfo;
        } else {
            return res.status(400).json({
                success: false,
                message: "Access Denied",
            })
        }
        next();
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "token expired",
        })
    }
}
module.exports = authMiddleware;