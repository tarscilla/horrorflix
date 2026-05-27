import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

import tmdbApi from "./../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import "./detail.scss";
import CastList from "./CastList";
import VideoList from "./Player";
import MovieList from "./../../components/movie-list/MovieList";

const Detail = () => {
  const { category, id } = useParams();

  const [item, setItem] = useState(null);
  const [selectedFear, setSelectedFear] = useState(null);

  const rateFear = async (fear) => {
  setSelectedFear(fear);

  try {
    const user = JSON.parse(localStorage.getItem("user"));

    await axios.post("http://localhost:5000/api/fear", {
      id: item.id,
      category,
      fear,
      userId: user.email,
    });

    console.log("Avaliação de medo salva");
  } catch (err) {
    console.log("Erro ao salvar avaliação de medo:", err);
  }
};

  useEffect(() => {
  const getDetail = async () => {
    try {
      const response = await tmdbApi.detail(category, id, {
        params: {},
      });

      setItem(response);
      window.scrollTo(0, 0);

      const user = JSON.parse(localStorage.getItem("user"));
      const userTerrorLevel = user?.terrorLevel || "leve";

      console.log("Disparando requisição para o Redis...");

      await axios.post(`http://localhost:5000/api/views/${response.id}`, {
        terrorLevel: userTerrorLevel,
        mediaType: category 
      });

      console.log("Front-end mandou a view para o backend!");

    } catch (error) {
      console.log("Erro ao carregar detalhes ou computar view:", error);
    }
  };

  getDetail();
}, [category, id]);

  console.log(selectedFear);
  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path,
              )})`,
            }}
          ></div>

          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.backdrop_path || item.poster_path,
                  )})`,
                }}
              ></div>
            </div>

            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, index) => (
                    <span key={index} className="genres__item">
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="fear-section">
                <h3>Quão assustador foi?</h3>

                <div className="fear-rating">
                  <div className="fear-rating">
                    <button
                      className={selectedFear === 1 ? "active" : ""}
                      onClick={() => rateFear(1)}
                    >
                      😴
                    </button>

                    <button
                      className={selectedFear === 2 ? "active" : ""}
                      onClick={() => rateFear(2)}
                    >
                      😨
                    </button>

                    <button
                      className={selectedFear === 3 ? "active" : ""}
                      onClick={() => rateFear(3)}
                    >
                      💀
                    </button>
                  </div>
                </div>
              </div>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </div>
            </div>
          </div>

          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
