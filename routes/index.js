const express = require('express');
const { isAuth, isAdmin } = require('../config/auth')
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { path: req.path });
});

router.get('/contact', (req, res) => {
    res.render('contact', { path: req.path });
});

router.get('/database', (req, res) => {
    res.render('database', { path: req.path });
});

router.get('/uzenetek', isAdmin, (req, res) => {
    res.render('messages', { path: '/messages' });
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