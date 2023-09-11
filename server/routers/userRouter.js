const router = require('express').Router();
const { SignUpUSer, logInUser, findUserInfo, updateUser, deleteUser, checkPassword } = require('../controllers/user');

router.route('/').post(SignUpUSer);
router.route('/userName=:userName&&pass=:pass').get(logInUser);
router.route('/:id').get(findUserInfo).put(updateUser).delete(deleteUser);
router.route('/:id/pass=:password').get(checkPassword);
module.exports = router;