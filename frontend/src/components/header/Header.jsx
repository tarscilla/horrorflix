import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import "./header.scss";

import logo from "./../../assets/logo.png";
import UserMenu from "../user-menu/UserMenu";

import * as Config from "./../../constants/Config";

const headerNav = [
  {
    display: "Início",
    path: `/${Config.HOME_PAGE}`,
  },
  {
    display: "Filmes",
    path: `/${Config.HOME_PAGE}/movie`,
  },
  {
    display: "Séries",
    path: `/${Config.HOME_PAGE}/tv`,
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };

    window.addEventListener("scroll", shrinkHeader);

    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <Link to={`/${Config.HOME_PAGE}`}>
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
        </ul>

        <UserMenu />
      </div>
    </div>
  );
};

export default Header;
