const express = require('express');
const { isAdmin } = require('../config/auth');
const path = require('path');

const { Uzenet } = require('../models/Uzenet');
const { Felhasznalo } = require('../models/Felhasznalo');
const { Tablak } = require('../models/Tablak');

const router = express.Router();

// Admin főoldal (HTML)
router.get('/', isAdmin, (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'html', 'admin.html'));
});

// Példa: statisztika - sorok száma a fontos táblákban
router.get('/stats', isAdmin, async (req, res) => {
    try {
        const felhasznaloCount = await Felhasznalo.count();
        const uzenetCount = await Uzenet.count();
        const tablaCount = await Tablak.count();
        res.json({ felhasznaloCount, uzenetCount, tablaCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Hiba a statisztika lekérésekor' });
    }
});

// Példa admin: felhasználók listája
router.get('/felhasznalok', isAdmin, async (req, res) => {
    try {
        const users = await Felhasznalo.findAll({ attributes: ['id', 'username', 'email', 'role'] });
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Hiba a felhasználók lekérésekor' });
    }
});

module.exports = router;
