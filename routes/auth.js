const express = require('express')
const bcrypt = require('bcrypt');
const db = require('../models');
const { Op } = db.Sequelize;

const router = express.Router();

// Render signin page
router.get('/signin', (req, res) => {
    res.render('signin', { path: '/auth/signin' });
});

// Render signup page
router.get('/signup', (req, res) => {
    res.render('signup', { path: '/auth/signup' });
});

//Regisztráció
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password) return res.status(400).json({ error: 'Hiányzó mezők!' });

        const existing = await db.User.findOne({ where: { [Op.or]: [{ email: email }, { username: username }] } });
        if (existing) return res.status(409).json({ error: 'A felhasználónév vagy az email cím már foglalt!' });

        const hash = await bcrypt.hash(password, 10); //password encoding
        const newUser = await db.User.create({
            username,
            email,
            password: hash,
            role: role || 'regisztralt'
        })

        req.session.user = { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role }

        res.status(201).json({ message: 'Sikeres regisztráció', user: req.session.user });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Regisztrációs hiba' })
    }
})

//Login

router.post('/login', async (req, res) => {
    try {
        const { identifier, password } = req.body; // 'email' helyett 'identifier'

        if (!identifier || !password) {
            return res.status(400).json({ error: 'Hiányzó felhasználónév/email vagy jelszó!' });
        }

        const user = await db.User.findOne({
            where: { [Op.or]: [{ email: identifier }, { username: identifier }] }
        });
        if (!user) return res.status(401).json({ error: 'Hibás felhasználónév vagy email cím!' });

        const ok = await bcrypt.compare(password, user.password)
        if (!ok) return res.status(401).json({ error: 'Hibás jelszó' })

        req.session.user = { id: user.id, username: user.username, email: user.email, role: user.role }
        res.status(200).json({ message: 'Sikeres bejelentkezés', user: req.session.user })

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Bejelentkezési hiba' })
    }
})

//Kijelentkezés

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Sikertelen kijelentkezés' })
        }
        res.json({ message: 'Sikeres kijelentkezés' });
    })
})

module.exports = router;
