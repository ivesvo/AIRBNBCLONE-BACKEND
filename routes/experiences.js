const router = require('express').Router({mergeParams:true})
const {getExps, createExp, updateExp, deleteExp, getExperienceId, getOldExps} = require('../controllers/experienceController')
const {loginRequired, hostRequired} = require('../middleware/auth')

router.route("/")
.get(getExps)

// .post(loginRequired, hostRequired, createExp)
.post(createExp)


router.route("/:eid")
.patch(loginRequired, hostRequired, updateExp)
.delete(loginRequired, hostRequired, deleteExp)


router.get("/:id", getOldExps);


// router.route("/:id")
// .get()
// // .put(loginRequired, hostRequired, updateExp)
// // .delete(loginRequired, hostRequired, deleteExp)


module.exports = router