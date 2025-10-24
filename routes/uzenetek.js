const express = require('express')
const { isAuth, isAdmin } = require('../config/auth')
const { Message } = require('../models/messages.model');

const router = express.Router()

//Üzenet küldés

router.post('/send', isAuth, async (req, res) => {

    try {
        const { uzenet } = req.body;
        if (!uzenet) return res.status(400).json({ error: 'Hiányzó üzenet!' })

        const saved = await Message.create({
            nev: req.session.user.username,
            email: req.session.user.email,
            uzenet,
            userId: req.session.user.id
        })

        res.status(200).json({ message: 'Üzenet elküldve', id: saved.id })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Hiba az üzenet mentésekor' });
    }
})

//Üzenetek listázása

router.get('/', isAdmin, async (req, res) => {
    try {
        const messages = await Message.findAll({ order: [["id", 'DESC']] })
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Hiba az üzenetek lekérésekor' });
    }
})

module.exports = router;