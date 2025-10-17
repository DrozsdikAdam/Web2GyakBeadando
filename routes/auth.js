const express = require('express')
const bcrypt = require('bcrypt');
//felhasználó modell importálása
const { User } = require('../models');

const router = express.Router()

//Regisztráció
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password) return res.status(400).json({ error: 'Hiányzó mezők!' })

        const existing = await User.findOne({ where: { email: email } }); // <-- JAVÍTVA
        if (existing) return res.status(409).json({ error: 'Email már foglalt!' });

        const hash = await bcrypt.hash(password, 10); //password encoding
        const newUser = await Felhasznalo.create({
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
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email } });
        if (!user) return res.status(401).json({ error: 'Hibás email' });

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
