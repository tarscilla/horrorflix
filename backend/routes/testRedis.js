const express = require("express");
const router = express.Router();

const redisClient = require("../config/redis");

router.get("/", async (req, res) => {
  const data = await redisClient.zRange("fear:movie", 0, -1, {
    REV: true,
    WITHSCORES: true,
  });

  res.json(data);
});

module.exports = router;