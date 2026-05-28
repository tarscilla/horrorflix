import React, { useEffect, useState } from "react";

import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";

import MovieCard from "../movie-card/MovieCard";

const RecommendedForYou = ({ category }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getRecommendations = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user?.email) return;

        const response = await axios.get(
          `http://localhost:5000/api/recommendations/${user.email}`
        );

        // console.log(response.data);

        if (category === "movie") {
          setItems(response.data.movies || []);
        } else {
          setItems(response.data.tv || []);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getRecommendations();
  }, [category]);

  return (
    <div className="movie-list recommended">
      <Swiper
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={"auto"}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <MovieCard
              item={item}
              category={category}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RecommendedForYou;