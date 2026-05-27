import React, { useCallback, useEffect, useState } from "react";

import "./movie-grid.scss";

import { useHistory, useParams } from "react-router";

import MovieCard from "./../movie-card/MovieCard";

import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";

import * as Config from "./../../constants/Config";

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));

  let genres = "";

  if (props.category === category.movie) {
    if (user?.terrorLevel === "leve") {
      genres = "27,9648";
    }

    if (user?.terrorLevel === "medio") {
      genres = "27,53";
    }

    if (user?.terrorLevel === "pesado") {
      genres = "27,80,53";
    }
  }

  if (props.category === category.tv) {
    if (user?.terrorLevel === "leve") {
      genres = "9648, 10765, 35";
    }

    if (user?.terrorLevel === "medio") {
      genres = "9648,18";
    }

    if (user?.terrorLevel === "pesado") {
      genres = "9648,18,80";
    }
  }

  useEffect(() => {
    const getList = async () => {
      let response = null;

      if (keyword === undefined) {
        const params = {
          with_genres: genres,
          sort_by: "popularity.desc",
        };

        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.popular, {
              params,
            });
            break;

          default:
            response = await tmdbApi.getTvList(tvType.popular, {
              params,
            });
        }
      } else {
        const params = {
          query: keyword,
        };

        response = await tmdbApi.search(props.category, { params });

        response.results = response.results.filter((item) => {
          if (user?.terrorLevel === "leve") {
            return item.genre_ids?.includes(27) || item.genre_ids?.includes(35);
          }

          if (user?.terrorLevel === "medio") {
            return item.genre_ids?.includes(27) || item.genre_ids?.includes(80);
          }

          if (user?.terrorLevel === "pesado") {
            return item.genre_ids?.includes(27) || item.genre_ids?.includes(53);
          }

          return item.genre_ids?.includes(27);
        });
      }

      setItems(response.results);
      setTotalPage(response.total_pages);
    };

    getList();
  }, [keyword, props.category, genres, user?.terrorLevel]);

  const loadMore = async () => {
    let response = null;

    if (keyword === undefined) {
      const params = {
        page: page + 1,
        with_genres: genres,
        sort_by: "popularity.desc",
      };

      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;

        default:
          response = await tmdbApi.getTvList(tvType.popular, {
            params,
          });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };

      response = await tmdbApi.search(props.category, { params });

      response.results = response.results.filter((item) => {
        if (user?.terrorLevel === "leve") {
          return item.genre_ids?.includes(27) || item.genre_ids?.includes(35);
        }

        if (user?.terrorLevel === "medio") {
          return item.genre_ids?.includes(27) || item.genre_ids?.includes(53);
        }

        if (user?.terrorLevel === "pesado") {
          return item.genre_ids?.includes(27) || item.genre_ids?.includes(80);
        }

        return item.genre_ids?.includes(27);
      });
    }

    setItems([...items, ...response.results]);
    setPage(page + 1);

    window.scrollTo({
      top: window.scrollY - 300,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword} />
      </div>

      <div className="movie-grid">
        {items.map((item, index) => (
          <MovieCard key={index} category={props.category} item={item} />
        ))}
      </div>

      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Carregar mais
          </OutlineButton>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

const MovieSearch = (props) => {
  const history = useHistory();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      history.push(
        `/${Config.HOME_PAGE}/${category[props.category]}/search/${keyword}`,
      );
    }
  }, [keyword, props.category, history]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();

      if (e.keyCode === 13) {
        goToSearch();
      }
    };

    document.addEventListener("keyup", enterEvent);

    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

export default MovieGrid;
