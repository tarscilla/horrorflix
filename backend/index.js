const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const viewsRoutes = require("./routes/views");
const topRoutes = require("./routes/top");
const fearRoutes = require("./routes/fear");
const recommendationsRoutes = require("./routes/recommendations");

require("dotenv").config();

const redisClient = require("./config/redis");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/views", viewsRoutes);
app.use("/api/top", topRoutes);
app.use("/api/fear", fearRoutes);
app.use("/api/recommendations", recommendationsRoutes);

app.get("/", (req, res) => {
  res.send("API HorrorFlix funcionando");
});

const PORT = 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});