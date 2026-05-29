const express = require("express");
const router = express.Router();
const axios = require("axios");
const redisClient = require("../config/redis");

const MINHA_TMDB_KEY = process.env.TMDB_KEY; 

router.get("/:email", async (req, res) => {
  try {
    if (!MINHA_TMDB_KEY) {
      console.error("⚠️ ERRO: A variável TMDB_API_KEY não foi encontrada no arquivo .env do backend!");
    }

    const email = req.params.email;
    const key = `fear:user:${email}`;
    const watched = await redisClient.hGetAll(key);
    const entries = Object.entries(watched);

    let movieRecommendations = [];
    let tvRecommendations = [];

    for (const [media, fear] of entries) {
      if (Number(fear) < 1) continue;

      const [category, id] = media.split(":");
      const url =
        category === "tv"
          ? `https://api.themoviedb.org/3/tv/${id}/similar`
          : `https://api.themoviedb.org/3/movie/${id}/recommendations`;

      try {
        const response = await axios.get(url, {
          params: {
            api_key: MINHA_TMDB_KEY,
            language: "pt-BR",
          },
        });

        if (response.data && response.data.results) {
          const formatted = response.data.results.map((item) => ({
            ...item,
            mediaType: category,
          }));

          if (category === "movie") {
            movieRecommendations.push(...formatted);
          } else {
            tvRecommendations.push(...formatted);
          }
        }
      } catch (apiErr) {
        console.log(`Erro ao buscar recomendações para o id ${id} no TMDB:`, apiErr.message);
        continue;
      }
    }

    const uniqueMovies = movieRecommendations.filter(
      (movie, index, self) =>
        index === self.findIndex((m) => m.id === movie.id)
    );

    const uniqueTv = tvRecommendations.filter(
      (tv, index, self) =>
        index === self.findIndex((m) => m.id === tv.id)
    );

    res.json({
      movies: uniqueMovies.slice(0, 20),
      tv: uniqueTv.slice(0, 20),
    });
  } catch (err) {
    console.log("Erro geral na rota de recomendações:", err);
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;