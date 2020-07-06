const User = require("../models/user");
const passport = require("../oauth/index")


exports.loginWithEmail = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ status: "fail", error: "Email and password are required" })
    }
    const user = await User.loginWithEmail(email, password);
    if (!user) {
        return res.status(401).json({ status: "fail", error: "Wrong email or password" })
    }
    const token = await user.generateToken();
    res.json({status: "OK", data: {user:user, token: token}})
}

exports.logout = async (req,res)=>{
    const token = req.headers.authorization.replace("Bearer ", "");
    req.user.tokens.filter(item=>item.token !=token)
    res.json({status: "OK", data: null})

}

console.log(passport) ///dasdasdas
exports.loginFacebook = passport.authenticate("facebook", {scope:['email']})

exports.facebookAuthHandler = function(req, res, next) {
    passport.authenticate("facebook", async function(err, profile) {
        // if email exist in database => login the user and return token
        //else if email doesnt exist, we create a new email 
        const email = profile._json.email
        const name = profile._json.first_name + " " + profile._json.last_name
        const user = await User.findOneOrCreate(email,name)
        const token = await user.generateToken()
        return res.json({user,token})

  
  
    })(req, res, next);
  };