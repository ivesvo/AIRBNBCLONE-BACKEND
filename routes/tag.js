var express = require('express');
const { createTag, getTagList, updateTag, deleteTag } = require('../controllers/tagController');
const {findExpsbyTags} = require('../controllers/experienceController')
var router = express.Router();
const { loginRequired, hostRequired } = require('../middleware/auth')

/* GET users listing. */
//localhost:5000
// router.get('/', function(req, res, next) {
//   const use
// })

router.route('/')
    .post(loginRequired, hostRequired, createTag)
    .get(getTagList)

router.route('/:tid')
    .get(findExpsbyTags)
    .patch(loginRequired, hostRequired, updateTag)
    .delete(loginRequired, hostRequired, deleteTag)


module.exports = router;
