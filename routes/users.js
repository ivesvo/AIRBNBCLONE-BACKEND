var express = require('express');
const { createUser, getMyProfile, getUsers } = require('../controllers/userControllers');
var router = express.Router();
const {loginRequired} = require('../middleware/auth')

/* GET users listing. */
//localhost:5000
// router.get('/', function(req, res, next) {
//   const use
// })

router.route('/')
.post(createUser)
.get(getUsers)


//localhost:5000/users/me

router.route('/me')
.get(loginRequired, getMyProfile)




module.exports = router;
