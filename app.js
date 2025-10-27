const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Activer la lecture des données JSON
app.use(bodyParser.json());

// Autoriser la communication avec d'autres serveurs
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Routes pour utilisateurs, catégories et produits

app.get("/",(req, res) => {
  res.send('Bienvenue sur mon API Node.js!');
});
module.exports = app;
