import React from "react";
import { Link } from "react-router-dom";

import { OutlineButton } from "../components/button/Button";
import HeroSlide from "../components/hero-slide/HeroSlide";
import MovieList from "../components/movie-list/MovieList";
import TopViewed from "../components/top-viewed/TopViewed";
import RecommendedForYou from "../components/recommended-for-you/RecommendedForYou";

import { category, movieType, tvType } from "../api/tmdbApi";

import * as Config from "./../constants/Config";

const Home = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  
  const rawLevel = userData?.terrorLevel || userData?.user?.terrorLevel || "leve";
  const nivelLevel = rawLevel.toLowerCase() === "medio" ? "médio" : rawLevel;

  return (
    <>
      <HeroSlide />

      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top 10 em filmes</h2>
          </div>
          <TopViewed categoryType={category.movie} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Recomendações de filmes {nivelLevel + "s"}</h2>
            <Link to={`/${Config.HOME_PAGE}/movie`}>
              <OutlineButton className="small">Ver mais</OutlineButton>
            </Link>
          </div>
          <MovieList
            category={category.movie}
            type={movieType.popular}
            genre="27"
          />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Baseado nas suas avaliações</h2>
          </div>
          <RecommendedForYou category="movie" />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top 10 em séries</h2>
          </div>
          <TopViewed categoryType={category.tv} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Recomendações de seriados {nivelLevel + "s"}</h2>
            <Link to={`/${Config.HOME_PAGE}/tv`}>
              <OutlineButton className="small">Ver mais</OutlineButton>
            </Link>
          </div>
          <MovieList
            category={category.tv}
            type={tvType.popular}
            genre="9648,10765"
          />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Baseado nas suas avaliações</h2>
          </div>
          <RecommendedForYou category="tv" />
        </div>
      </div>
    </>
  );
};

export default Home;