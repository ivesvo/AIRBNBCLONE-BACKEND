var express = require('express');
const { generateExp} = require('../controllers/testController');
var router = express.Router();


router.route('/')
.get(generateExp)


module.exports = router;
