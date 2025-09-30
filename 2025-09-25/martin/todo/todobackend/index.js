require("dotenv").config();

const express = require("express");
const app = express()
const port = process.env.PORT || 3000;
const todoRoutes = require("./routes/todo.routes")
const adminRoutes = require("./routes/admin.routes")
const authRoutes = require("./routes/auth.routes");
const cors = require("cors")

app.use(cors())
app.use(express.json());

app.use("/todos", todoRoutes)
app.use("/admin", adminRoutes)
app.use("/auth", authRoutes)

app.get('/', (req, res) => {
  res.send('Hello TODO')
})

app.listen(port, () => console.log(`Server is running on port ${port}`));