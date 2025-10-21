const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { path: req.path });
});

router.get('/contact', (req, res) => {
    res.render('contact', { path: req.path });
});

module.exports = router;