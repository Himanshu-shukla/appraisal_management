const express = require('express');
const router = express.Router();
const AppraisalForm = require('../models/AppraisalForm');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/', verifyToken, async (req, res) => {
    try {
        const form = new AppraisalForm(req.body);
        await form.save();
        res.status(201).send(form);
    } catch (error) {
        res.status(500).send({ message: 'Error creating appraisal form', error });
    }
});

router.get('/user/:id', verifyToken, async (req, res) => {
    try {
        const form = await AppraisalForm.find({ user: req.params.id }).populate('user filledBy answers');
        if (!form) return res.status(404).send({ message: 'Appraisal form not found' });

        res.status(200).send(form);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving appraisal form', error });
    }
});

module.exports = router;