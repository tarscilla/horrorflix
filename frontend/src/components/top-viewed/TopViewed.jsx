import React, { useEffect, useState } from "react";

import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";

import MovieCard from "../movie-card/MovieCard";

import tmdbApi, { category } from "../../api/tmdbApi";

const TopViewed = ({ categoryType }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getTop = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await axios.get(
        `http://localhost:5000/api/top/${
          user?.terrorLevel || "leve"
        }/${categoryType}`,
      );

      const ids = response.data;

      console.log(ids);

      let movies = [];

      for (const id of ids) {
        try {
          const cleanId = id.toString().trim();

          console.log("ID:", cleanId);

          const item = await tmdbApi.detail(categoryType, cleanId);

          console.log("ITEM:", item);

          if (item) {
            movies.push(item);
          }
        } catch (err) {
          console.log("ERRO:", err.response?.data || err);
        }
      }
      console.log(movies);
      setItems(movies);
    };

    getTop();
  }, [categoryType]);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <MovieCard item={item} category={categoryType} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopViewed;
