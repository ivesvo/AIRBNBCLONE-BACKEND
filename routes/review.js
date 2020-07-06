var express = require('express');
var router = express.Router();
const {getReviewList,createReview,updateReview, deleteReview } = require('../controllers/reviewController')
const {loginRequired} = require('../middleware/auth');
const { route } = require('./users');


router.route("/")
.get(getReviewList)
.post(loginRequired, createReview)

router.route("/:rid")
.patch(loginRequired, updateReview)
.delete(loginRequired, deleteReview)


// router.route("/:rid")
// .patch(loginRequired, updateReview)
// .delete(loginReview, deleteReview)


// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
