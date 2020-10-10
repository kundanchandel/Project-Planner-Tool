const jwt = require("jsonwebtoken");

const auth = function isLoggedIn(req, res, next) {
    const token = req.cookies.authToken
    if (!token) {
        res.send("access denied");
    } else {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        console.log(req.user);
        next();
    }
}

module.exports = {
    auth
}