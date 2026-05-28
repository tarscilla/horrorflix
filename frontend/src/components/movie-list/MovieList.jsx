import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./movie-list.scss";

import { SwiperSlide, Swiper } from "swiper/react";

import MovieCard from "../movie-card/MovieCard";

import tmdbApi, { category } from "./../../api/tmdbApi";

const MovieList = (props) => {
  const [items, setItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getList = async () => {
      let response = null;
      let params = {};

      if (props.category === category.movie) {
        if (user?.terrorLevel === "leve") {
          params.with_genres = "27,9648";
        }

        if (user?.terrorLevel === "medio") {
          params.with_genres = "27,53";
        }

        if (user?.terrorLevel === "pesado") {
          params.with_genres = "27,53,80";
        }
      }

      if (props.category === category.tv) {
        if (user?.terrorLevel === "leve") {
          params.with_genres = "9648,35";
        }

        if (user?.terrorLevel === "medio") {
          params.with_genres = "9648,18";
        }

        if (user?.terrorLevel === "pesado") {
          params.with_genres = "18,80,9648";
        }
      }

      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(props.type, {
              params,
            });
            break;

          default:
            response = await tmdbApi.getTvList(props.type, {
              params,
            });
        }
      } else {
        response = await tmdbApi.similar(props.category, props.id);
      }

      setItems(response.results);
    };

    getList();
  }, [props.category, props.id, props.type, user?.terrorLevel]);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <MovieCard item={item} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;
