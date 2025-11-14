const express = require('express')
const { isAuth, isAdmin } = require('../config/auth'); // isAdmin is kellhet a jövőben
const db = require('../models');

const router = express.Router();

// --- Film CRUD API ---

// READ - Összes film lekérése
router.get('/films', isAuth, async (req, res) => {
    try {
        const films = await db.Film.findAll({ order: [['id', 'ASC']] });
        res.json(films);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Hiba a filmek lekérésekor.' });
    }
});

// CREATE - Új film létrehozása
router.post('/films', isAuth, async (req, res) => {
    try {
        const { cim, ev, hossz } = req.body;
        if (!cim) {
            return res.status(400).json({ error: 'A film címe kötelező!' });
        }
        const newFilm = await db.Film.create({ cim, ev, hossz });
        res.status(201).json(newFilm);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Hiba a film létrehozásakor.' });
    }
});

// UPDATE - Film frissítése
router.put('/films/:id', isAuth, async (req, res) => {
    try {
        const film = await db.Film.findByPk(req.params.id);
        if (!film) {
            return res.status(404).json({ error: 'A film nem található.' });
        }

        const { cim, ev, hossz } = req.body;
        if (!cim) {
            return res.status(400).json({ error: 'A film címe kötelező!' });
        }

        film.cim = cim;
        film.ev = ev;
        film.hossz = hossz;

        await film.save();
        res.json(film);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Hiba a film frissítésekor.' });
    }
});

// DELETE - Film törlése
router.delete('/films/:id', isAuth, async (req, res) => {
    try {
        const film = await db.Film.findByPk(req.params.id);
        if (!film) {
            return res.status(404).json({ error: 'A film nem található.' });
        }

        await film.destroy();
        res.status(204).send(); // 204 No Content - sikeres törlés, nincs visszatérési tartalom
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Hiba a film törlésekor.' });
    }
});

module.exports = router;