const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { getUsers, updateUserRole, deleteUser, inviteAdmin } = require('../controllers/userController');

const router = express.Router();

router.get('/', protect, authorize('admin'), getUsers);
router.put('/:id/role', protect, authorize('admin'), updateUserRole);
router.delete('/:id', protect, authorize('admin'), deleteUser);
router.post('/invite', protect, authorize('admin'), inviteAdmin);

module.exports = router;
