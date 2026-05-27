const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, terrorLevel } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Este email já está cadastrado."});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      terrorLevel: terrorLevel || "leve"
    });

    const savedUser = await newUser.save(); 
    
    await user.save();

    res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      terrorLevel: savedUser.terrorLevel,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Usuário não encontrado",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Senha incorreta",
      });
    }

    res.json({
      message: "Login realizado com sucesso",
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
