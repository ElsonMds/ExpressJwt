const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());

const posts = [
  { username: "elson", title: "post1" },
  { username: "mike", title: "post2" },
];
const users = [];

///obtem todos os posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

//
app.post("/signup", async (req, res) => {
  //CADASTRAR O USUARIO
  //recebe o usuario
  try {
    const hashedpwd = await bcrypt.hash(req.body.password, 10);

    const user = { name: req.body.name, password: hashedpwd };
    users.push(user);
    res.status(201).send();
  } catch (error) {
    res.send(error.message);
  }
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(3000, () => {
  console.log("ouvindo a porta 3000");
});
