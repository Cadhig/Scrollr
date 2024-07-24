const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Users } = require('../../models');

router.post('/login', async (req, res) => {
    console.log("Server Login", req.body);
    const { username, password } = req.body;

    try {
        const foundUser = await Users.findOne({
            attributes: ['id', 'username', 'password', 'created_at'],
            where: { username: username }
        });
        if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        req.session.user = foundUser;
        req.session.user_id = foundUser.id;
        req.session.authorized = true;
        req.session.save(() => {
            res.status(200).json({ success: 'Logged in' });
        });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router; 
