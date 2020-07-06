const router = require('express').Router({mergeParams:true})
const {getExps, createExp, updateExp, deleteExp, getExperienceId} = require('../controllers/experienceController')
const {loginRequired, hostRequired} = require('../middleware/auth')

router.route("/")
.get(getExps)
// .post(loginRequired, hostRequired, createExp)
.post(createExp)


router.route("/:eid")
.get(getExperienceId)
.patch(loginRequired, hostRequired, updateExp)
.delete(loginRequired, hostRequired, deleteExp)

// router.route("/:id")
// .get()
// // .put(loginRequired, hostRequired, updateExp)
// // .delete(loginRequired, hostRequired, deleteExp)


module.exports = router