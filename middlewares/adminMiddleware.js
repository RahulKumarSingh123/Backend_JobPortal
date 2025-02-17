const adminMiddleware = (req, res, next) => {
    try {
        if (req.user.role === "admin") {
            next();
        } else {
            return res.status(400).json({
                success: false,
                message: "Access Denied! Login using admin account"
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Something went wrong",
        })
    }
}
module.exports = adminMiddleware;