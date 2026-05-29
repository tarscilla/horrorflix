const express = require("express");

const router = express.Router();

const redisClient = require("../config/redis");

router.get("/:terrorLevel", async (req, res) => {
  const { terrorLevel } = req.params;

  const ids = await redisClient.zRange(`mostViewed:${terrorLevel}`, 0, 9, {
    REV: true,
  });

  res.json(ids);
});

router.get("/:terrorLevel/:mediaType", async (req, res) => {
  const { terrorLevel, mediaType } = req.params;

  const ids = await redisClient.zRange(
    `mostViewed:${terrorLevel}:${mediaType}`,
    0,
    9,
    {
      REV: true,
    }
  );

  res.json(ids);
});

module.exports = router;