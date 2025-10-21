const express = require('express');
const { isAdmin } = require('../config/auth');
const path = require('path');

const { Message } = require('../models/messages.model');
const { User } = require('../models/user.model');
const { db } = require('../models/index');

const router = express.Router();

// Admin főoldal (HTML)
router.get('/', isAdmin, (req, res) => {
    res.render('admin', { path: '/admin' });
});

// Példa: statisztika - sorok száma a fontos táblákban
router.get('/stats', isAdmin, async (req, res) => {
    try {
        const felhasznaloCount = await User.count();
        const uzenetCount = await Message.count();
        const tablaCount = await db.count();
        res.json({ felhasznaloCount, uzenetCount, tablaCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Hiba a statisztika lekérésekor' });
    }
});

// Példa admin: felhasználók listája
router.get('/felhasznalok', isAdmin, async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ['id', 'username', 'email', 'role'] });
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Hiba a felhasználók lekérésekor' });
    }
});

module.exports = router;
