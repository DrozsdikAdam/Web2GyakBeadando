const express = require('express');
const path = require('path');
const { fileURLToPath } = require('url');

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'html', 'index.html'));
})

router.get('/contact', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'html', 'contact.html'))
})