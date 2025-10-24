const express = require('express')
const { isAuth } = require('../config/auth')
//const { Tablak } = require('../models/Tablak')

const router = express.Router();

//Read/lista

router.get('/', async (req, res) => {
    try {
        const lista = await Tablak.findAll();
        res.json(lista);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Hiba a lista lekérésekor' });
    }
})

//Read egy rekord

router.get('/:id', async (req, res) => {
    try {
        const rekord = await Tablak.findByPk(req.params.id)
        if (!rekord) return res.status(404).json({ error: 'Nincs ilyen rekord' })
        res.json(rekord)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Hiba a lekéréskor' });
    }
})

//Create 

router.post('/create', isAuth, async (req, res) => {
    try {
        const newRec = await Tablak.create(req.body)
        res.status(201).json({ message: 'Rekord létrehozva', id: newRec.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Hiba a létrehozás során' });
    }
})

// Update  

router.put('/:id', isAuth, async (req, res) => {
    try {
        const rec = await Tablak.findByPk(req.params.id);
        if (!rec) return res.status(404).json({ error: 'Nem található rekord' });

        await rec.update(req.body);
        res.json({ message: 'Sikeres frissítés' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Hiba a frissítés során' });
    }
});

//Delete 

router.delete('/:id', isAuth, async (req, res) => {
    try {
        const rekord = await Tablak.findByPk(req.params.id)
        if (!rekord) return res.status(404).json({ error: 'Nincs ilyen rekord' })

        await rekord.destroy()
        res.json({ message: 'Sikeres törlés!' })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Hiba a lekéréskor' });
    }
})

module.exports = router;