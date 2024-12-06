const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const { name, email, password = "123", role = "staff" } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ message: 'Error creating user', error });
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } }); 
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving users', error });
  }
});

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('supervisor peers juniors');
    if (!user) return res.status(404).send({ message: 'User not found' });

    if (req.role === 'admin' || req.userId === user._id.toString()) {
      res.send(user);
    } else {
      res.status(403).send({ message: 'Access denied' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving user', error });
  }
});

router.put('/:id/map', verifyToken, isAdmin, async (req, res) => {
  try {
    const { supervisor, peers, juniors } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ message: 'User not found' });

    user.supervisor = supervisor;
    user.peers = peers;
    user.juniors = juniors;
    await user.save();

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: 'Error mapping user', error });
  }
});

module.exports = router;