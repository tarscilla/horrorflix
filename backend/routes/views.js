const express = require("express");
const router = express.Router();
const redisClient = require("../config/redis");

router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const terrorLevel = req.body?.terrorLevel || "leve";
    const mediaType = req.body?.mediaType || "movie";

    const key = `mostViewed:${terrorLevel}:${mediaType}`;

    const novoScore = await redisClient.zIncrBy(key, 1, String(id));

    console.log(`[REDIS] ID ${id} agora tem ${novoScore} views na chave ${key}`);

    res.json({
      message: "View adicionada",
      views: novoScore
    });
  } catch (error) {
    console.log("Erro na rota de views do Redis:", error);
    res.status(500).json({ error: "Erro ao adicionar view" });
  }
});

module.exports = router;