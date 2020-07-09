var express = require('express');
const { loginWithEmail, logout, loginFacebook, facebookAuthHandler } = require('../controllers/authController');
const { loginRequired } = require('../middleware/auth');

var router = express.Router();


//localhost:5000/auth/login
router.route("/login/Facebook")
.get(loginFacebook)

router.route("/login")
.post(loginWithEmail)

router.route('/logout')
.post(loginRequired, logout)


// router.route("/facebook/login")
// .get(loginFacebook)

// router.route('/facebook/authorized')
// .get(facebookAuthHandler)



module.exports = router;    