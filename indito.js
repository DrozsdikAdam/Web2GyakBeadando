const express = require("express")
const session = require("express-session")
const path = require("path")
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
    res.locals.path = req.path;  // Make path available to all views
    next();
});

// routes
app.use("/", indexRoutes)
app.use("/auth", authRoutes)
app.use("/crud", crudRoutes)
app.use("/uzenetek", uzenetRoutes)
app.use("/admin", adminRoutes)

//server indítás
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))