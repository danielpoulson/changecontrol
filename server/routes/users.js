const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

router.get('/all', users.getAllUsers);
router.get('/:id', users.getUser);
router.get('/logged', users.getLoggedUser);
router.put('/updatepass/:id', users.updatePassword);
router.put('/updateuser/:username', users.updateUser);
router.post('/', users.createUser);
router.delete('/:id', users.deleteUser);

module.exports = router;