const express = require("express")
const session = require("express-session")
const path = require("path")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
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
// routes
app.use("/", indexRoutes)
app.use("/auth", authRoutes)
app.use("/crud", crudRoutes)
app.use("/uzenetek", uzenetRoutes)
app.use("/admin", adminRoutes)

//server indítás
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))