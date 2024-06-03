require("dotenv").config();

const jwt = require("jsonwebtoken");

function verify(req, resp, next) {

    const token = req.headers.token;

    console.log("token  ", req.headers.token)

    if (token) {

        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) {
                console.log("user not found")
                resp.status(403).json("Token is not valid")
                return
            };
            if (user) {
                console.log("user ", user)
                // console.log(user.isSuperAdmin ,"  user")
                req.user = user;
                next();
            }
        })
    }
    else {
        return resp.status(401).json("You are not authorised")
    }
}


module.exports = verify;