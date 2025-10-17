const express = require("express")
const dotenv = require("dotenv")
const indexRoutes = require("./routes/index")
const authRoutes = require("./routes/auth")
const crudRoutes = require("./routes/crud")
const uzenetRoutes = require("./routes/uzenetek")
const adminRoutes = require("./routes/admin")

dotenv.config();
const app = express();

// routes
app.use("/", indexRoutes)
app.use("/auth", authRoutes)
app.use("/crud", crudRoutes)
app.use("/uzenetek", uzenetRoutes)
app.use("/admin", adminRoutes)

//server indítás
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))