const express = require("express");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const dadosLocais = JSON.parse(fs.readFileSync("dados.json"));

router.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    res.status(433).send("Você deve definir email e senha");
  }

  const usuario = dadosLocais.find((user) => user.email === email);

  if (!usuario) {
    res.status(401).send("Email ou senha inválidos");
  }

  if (!bcrypt.compareSync(senha, usuario.hash)) {
    res.status(401).send("Email ou senha inválidos");
  }

  res.status(200).send({
    email: usuario.email,
    nome: usuario.nome,
    dados: usuario.dados,
    token: usuario.token,
  });
});

router.post("/criar", (req, res) => {
  const { nome, email, senha } = req.body;
  if (!email || !senha) {
    res.status(422).send("Você deve definir email e senha");
  } else if (
    dadosLocais.find(
      (usuario) => usuario.nome === nome || usuario.email === email
    )
  ) {
    res.status(401).send("Nome ou email de usuário já está em uso");
  } else {
    var dadosUsuario = {
      id: Math.floor(Math.random() * 9999999999),
      nome: nome,
      email: email,
      dados: {},
    };
    const token = jwt.sign({ id: dadosUsuario.id }, "KEY_SECRETA");
    dadosUsuario.token = token;
    const salt = bcrypt.genSaltSync();
    dadosUsuario.hash = bcrypt.hashSync(senha, salt);
    dadosLocais.push(dadosUsuario);
    const dadosConvertidos = JSON.stringify(dadosLocais, null, 2);
    fs.writeFileSync("dados.json", dadosConvertidos);
    res.status(200).send("OK");
  }
});

module.exports = router;
