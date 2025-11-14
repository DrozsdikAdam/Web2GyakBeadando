const express = require('express');
const { isAuth, isAdmin } = require('../config/auth')
const path = require('path');
const db = require('../models');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { path: req.path });
});

router.get('/contact', (req, res) => {
    res.render('contact', { path: req.path });
});

router.get('/database', (req, res) => {
    // Ezeket a táblákat fogjuk felajánlani a lenyíló menüben
    const availableTables = ['Film', 'Mozi', 'Eloadas'];
    res.render('database', {
        path: req.path,
        tables: availableTables,
    });
});

// Új API végpont a táblaadatok lekérésére
router.get('/database/data/:tableName', async (req, res) => {
    const tableName = req.params.tableName;
    const model = db[tableName];

    if (!model) {
        return res.status(404).json({ error: 'A megadott tábla nem létezik.' });
    }

    try {
        let data;

        data = await model.findAll({
            order: [['id', 'ASC']] // Rendezés az 'id' oszlop alapján növekvő sorrendben
        });
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hiba történt az adatok lekérése közben.' });
    }
});

router.get('/crud', isAuth, (req, res) => {
    res.render('crud', { path: '/crud' });
});

router.get('/admin', isAdmin, (req, res) => {
    res.render('admin', { path: '/admin' });
});

router.get('/', isAdmin, (req, res) => {
    res.render('admin', { path: '/admin' });
});

module.exports = router;