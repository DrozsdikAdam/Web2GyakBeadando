const express = require("express")
const session = require("express-session")
const path = require("path")
const fs = require("fs")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const expressLayouts = require("express-ejs-layouts")
const indexRoutes = require("./routes/index")
const authRoutes = require("./routes/auth")
const crudRoutes = require("./routes/crud")
const uzenetRoutes = require("./routes/uzenetek")
const adminRoutes = require("./routes/admin")

dotenv.config();
const app = express();

app.use(express.static('public'));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'public', 'ejs'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// A db objektum tartalmazza a sequelize példányt és az összes modellt
const db = require("./models");

// Session beállítása
app.use(session({
    secret: process.env.SESSION_SECRET || 'nagyon-titkos-kulcs', // A titkos kulcsot .env fájlból olvassuk
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 nap
    }
}));

// EJS Layout middleware
app.use(expressLayouts);

// Global variables for all views
app.use((req, res, next) => {
    res.locals.path = req.path;
    res.locals.user = req.session.user || null;
    res.locals.role = req.session.role || 'latogato';
    next();
});

// routes
app.use("/", indexRoutes)
app.use("/auth", authRoutes)
app.use("/crud", crudRoutes)
app.use("/uzenetek", uzenetRoutes)
app.use("/admin", adminRoutes)

// 404-es oldal kezelése - minden nem létező útvonalat ide irányítunk
app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Oldal nem található' });
});


/**
 * Beolvas egy ANSI kódolású, pontosvesszővel tagolt TXT fájlt, kihagyja a fejlécet,
 * és objektumok tömbjévé alakítja a sorokat a megadott oszlopnevek alapján.
 * @param {string} filePath A TXT fájl teljes elérési útja.
 * @param {string[]} columns Az oszlopnevek tömbje, a TXT fájl sorrendjében.
 * @returns {object[]} Az adatok objektumok tömbjeként.
 */
const parseTxtFile = (filePath, columns) => {
    const fileContent = fs.readFileSync(filePath, 'latin1');
    const lines = fileContent.trim().split(/\r?\n/);

    // Első sor (fejléc) kihagyása és a többi sor feldolgozása
    return lines.slice(1).map(line => {
        const values = line.split('\t');
        const entry = {};
        columns.forEach((col, index) => {
            entry[col] = values[index] || null; // Ha egy érték hiányzik, null lesz
        });
        return entry;
    });
};

const seedDatabase = async () => {
    try {
        const dataDir = path.join(__dirname, 'db_data');

        // Filmek feltöltése
        if (await db.Film.count() === 0) {
            console.log("Filmek tábla üres, feltöltés adatokkal...");
            const filmek = parseTxtFile(path.join(dataDir, 'film.txt'), ['id', 'cim', 'ev', 'hossz']);
            await db.Film.bulkCreate(filmek);
            console.log("Filmek sikeresen betöltve.");
        }

        // Mozik feltöltése
        if (await db.Mozi.count() === 0) {
            console.log("Mozik tábla üres, feltöltés adatokkal...");
            const mozik = parseTxtFile(path.join(dataDir, 'mozi.txt'), ['id', 'nev', 'varos', 'ferohely']);
            await db.Mozi.bulkCreate(mozik);
            console.log("Mozik sikeresen betöltve.");
        }

        // Előadások feltöltése
        if (await db.Eloadas.count() === 0) {
            console.log("Előadások tábla üres, feltöltés adatokkal...");
            const eloadasok = parseTxtFile(path.join(dataDir, 'eloadas.txt'), ['filmid', 'moziid', 'datum', 'nezoszam', 'bevetel']);
            await db.Eloadas.bulkCreate(eloadasok);
            console.log("Előadások sikeresen betöltve.");
        }

    } catch (error) {
        console.error('Hiba az adatbázis feltöltése (seeding) közben:', error);
    }
};

const startServer = async () => {
    try {
        await db.sequelize.authenticate();
        console.log("DB kapcsolódva");
        await db.sequelize.sync({ alter: true });
        console.log("Modellek szinkronizálva");

        await seedDatabase(); // Adatbázis feltöltése

        //server indítás
        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    } catch (err) {
        console.error("Szerver indítási hiba (DB probléma):", err);
    }
};

startServer();