const express = require('express');
const {registerUser, loginUser, users, updateUser, deleteUser } = require('../controllers/user');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/', updateUser)
router.delete("/", deleteUser);
router.get("/all", users);
router.get("/", users);

module.exports = router;