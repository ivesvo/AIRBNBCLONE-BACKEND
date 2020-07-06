const User = require("../models/user");
const jwt = require('jsonwebtoken')

exports.loginRequired = async (req, res, next) => {
    try {
        const token = req.body.token
        if (!token) {
            return res.status(400).json({ status: "Fail", message: "Token is required" })
        }
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findOne({ tokens: token, _id: decoded._id })
        if (!user) throw new Error("Unauthorised")
        req.user = user
        next();
    } catch (err) {
        return res.status(401).json({ status: "fail", error: err.message })

    }
    //     console.log("header", req.headers)
    //     if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
    //         return res.status(400).json({ status: "fail", error: "unauthorized" })
    //     }
    //     const token = req.headers.authorization.replace("Bearer ", "");
    // const decoded = jwt.verify(token, process.env.SECRET);
    //     const user = await User.findById(decoded._id);
    //     if (!user)
    //         return res.status(401).json({ status: "fail", error: "unauthorized" })
    //     req.user = user
    //     next();
    // } catch (err) {
    //     return res.status(401).json({ status: "fail", error: err.message })

    // }


}



exports.hostRequired = (req, res, next) => {
    if (req.user.role != "host") {
        return res.status(401).json({ status: "fail", message: "host required" })

    }

    next()

}

//sau mo64i middleware phai type next()

