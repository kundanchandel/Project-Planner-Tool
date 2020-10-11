const jwt = require("jsonwebtoken");
var auth = {}
const TOKENSECRET = 'superSecretTokenOfQDineIn'

auth.isloggedin = function(req, res, next){
    const token = req.headers.authtoken
    if (!token) {
        res.send("access denied");
    } else {
        const verified = jwt.verify(token, TOKENSECRET);
        req.user = verified;
        console.log(req.user);
        next();
    }
}

module.exports = auth