export function IsAuth(req, res, next) {
    if (req.session && req.session.user) return next();
    return res.status(401).json({ error: 'Bejelentkezés szükséges' })
}

export function isAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.role === 'admin') return next();
    return res.status(403).json({ error: 'Nincs admin jogosultságod' })

}