import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import logo from "../assets/logo.png";

import * as Config from "../constants/Config";

import "./register.scss";

const Register = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terrorLevel, setTerrorLevel] = useState("leve");

  const handleRegister = async (e) => {
    e.preventDefault();

    const fallbackUser = { name, email, terrorLevel };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          terrorLevel,
        },
      );

      localStorage.setItem("user", JSON.stringify(response.data));

      history.push(`/${Config.HOME_PAGE}`);

      window.location.reload();
    } catch (err) {
      console.log("Erro no cadastro:", err.response?.data || err);

      if (err.response?.status === 500 || !err.response) {
        localStorage.setItem("user", JSON.stringify(fallbackUser));
        history.push(`/${Config.HOME_PAGE}`);
        window.location.reload();
      }
    }
  };

  return (
    <div className="register">
      <div className="register__overlay"></div>

      <div className="register__card">
        <img src={logo} alt="Horrorflix" className="login__logo" />

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />

          <select onChange={(e) => setTerrorLevel(e.target.value)}>
            <option value="leve">Terror leve</option>
            <option value="medio">Terror médio</option>
            <option value="pesado">Terror pesado</option>
          </select>

          <button type="submit">Cadastrar</button>
        </form>

        <p>
          Já possui conta? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
