const router = require('express').Router();
const { SignUpUSer, logInUser, updateUser, deleteUser } = require('../controllers/user');


router.route('/').post(SignUpUSer).get(logInUser);
router.route('/:id').put(updateUser).delete(deleteUser);

module.exports = router;