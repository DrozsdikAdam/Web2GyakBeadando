const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'html', 'index.html'));
})

router.get('/contact', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'html', 'contact.html'))
})

module.exports = router;