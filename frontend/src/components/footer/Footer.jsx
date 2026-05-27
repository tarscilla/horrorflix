import React from "react";

import "./footer.scss";

import { Link } from "react-router-dom";

import bg from "./../../assets/footer-bg.png";
import logo from "./../../assets/logo.png";

import * as Config from "./../../constants/Config";

const Footer = () => {
  return (
    <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
      <div className="footer__content container">
        <div className="footer__content__logo">
          <div className="logo">
            <Link to={`/${Config.HOME_PAGE}`}>
              <img src={logo} alt="logo" />
            </Link>
          </div>
        </div>

        <div className="footer__content__menus">
          <div className="footer__content__menu">
            <Link to={`/${Config.HOME_PAGE}`}>Início</Link>
            <Link to={`/${Config.HOME_PAGE}`}>Entre em contato</Link>
            <Link to={`/${Config.HOME_PAGE}`}>Termos</Link>
            <Link to={`/${Config.HOME_PAGE}`}>Sobre nós</Link>
          </div>
          <div className="footer__content__menu">
            <Link to={`/${Config.HOME_PAGE}`}>Live</Link>
            <Link to={`/${Config.HOME_PAGE}`}>FAQ</Link>
            <Link to={`/${Config.HOME_PAGE}`}>Premium</Link>
            <Link to={`/${Config.HOME_PAGE}`}>Políticas de privacidade</Link>
          </div>
          <div className="footer__content__menu">
            <Link to={`/${Config.HOME_PAGE}`}>Você deve assistir</Link>
            <Link to={`/${Config.HOME_PAGE}`}>Lançamentos recentes</Link>
            <Link to={`/${Config.HOME_PAGE}`}>Top IMDB</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
