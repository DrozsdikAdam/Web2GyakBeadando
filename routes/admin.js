const express = require('express');
const { isAdmin } = require('../config/auth');
const path = require('path');

const db = require('../models');

const router = express.Router();

// Admin főoldal (HTML) 


// Példa: statisztika - sorok száma a fontos táblákban 
router.get('/stats', isAdmin, async (req, res) => {
    try {
        const felhasznaloCount = await db.User.count();
        const uzenetCount = await db.Message.count();
        const tablaCount = (await db.sequelize.query("SHOW TABLES"))[0].length;
        res.json({ felhasznaloCount, uzenetCount, tablaCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Hiba a statisztika lekérésekor' });
    }
});

// Példa admin: felhasználók listája  
router.get('/felhasznalok', isAdmin, async (req, res) => {
    try {
        const users = await db.User.findAll({ attributes: ['id', 'username', 'email', 'role'] });
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Hiba a felhasználók lekérésekor' });
    }
});

module.exports = router;
