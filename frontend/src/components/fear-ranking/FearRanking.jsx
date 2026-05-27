import React, { useEffect, useState } from "react";

import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";

import MovieCard from "../movie-card/MovieCard";

import tmdbApi from "../../api/tmdbApi";

const FearRanking = ({ category }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getRanking = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/fear/${category}`,
        );

        const ids = response.data;

        const promises = ids.map(async (id) => {
          return await tmdbApi.detail(category, id);
        });

        const movies = await Promise.all(promises);

        setItems(movies);
      } catch (err) {
        console.log(err);
      }
    };

    getRanking();
  }, [category]);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <MovieCard item={item} category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FearRanking;
