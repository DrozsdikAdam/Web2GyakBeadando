const express = require('express')
const { isAuth, isAdmin } = require('../config/auth')
const db = require('../models');

const router = express.Router()

//Üzenet küldés 

router.post('/send', isAuth, async (req, res) => {

    try {
        const { uzenet } = req.body;
        if (!uzenet) return res.status(400).json({ error: 'Hiányzó üzenet!' })

        const saved = await db.Message.create({
            uzenet: uzenet,
            userId: req.session.user.id // A bejelentkezett felhasználó ID-ja
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
        // Üzenetek lekérése a hozzájuk tartozó felhasználói adatokkal (username, email)
        const messages = await db.Message.findAll({
            include: [{
                model: db.User,
                attributes: ['username', 'email'] // Csak ezeket a mezőket kérjük le a User táblából
            }],
            order: [['createdAt', 'DESC']] // Rendezés a legújabb üzenet szerint
        });
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Hiba az üzenetek lekérésekor' });
    }
})

// Bejelentkezett felhasználó saját üzeneteinek listázása
router.get('/my', isAuth, async (req, res) => {
    try {
        const messages = await db.Message.findAll({
            where: { userId: req.session.user.id },
            include: [{
                model: db.User,
                attributes: ['username', 'email'] // Csak ezeket a mezőket kérjük le a User táblából
            }],
            order: [['createdAt', 'DESC']] // Rendezés a legújabb üzenet szerint
        });
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Hiba a saját üzenetek lekérésekor' });
    }
});

module.exports = router;