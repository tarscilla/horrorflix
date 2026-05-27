const express = require("express");

const router = express.Router();

const redisClient = require("../config/redis");

router.post("/", async (req, res) => {
  const { id, category, fear, userId } = req.body;

  const key = `fear:user:${userId}`;

  await redisClient.hSet(
    key,
    `${category}:${id}`,
    fear.toString()
  );

  if (fear >= 2) {
    await redisClient.zIncrBy(
      `fear:${category}`,
      Number(fear),
      String(id)
    );
  }

  res.json({ success: true });
});

router.get("/:category", async (req, res) => {
  try {
    const { category } = req.params;

    const ids = await redisClient.zRange(
      `fear:${category}`,
      0,
      9,
      {
        REV: true,
      }
    );

    res.json(ids);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;