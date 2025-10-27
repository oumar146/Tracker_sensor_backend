const express = require("express");
const router = express.Router();

// Import des controllers
const {
  newSensor,
  getAllSensors,
  deleteSensor,
} = require("../controllers/sensor");

// Connexion à la base de données
const client = require("../db");

// Routes 
router.post("/new", (req, res) => newSensor(req, res, client)); // Ajouter un capteur
router.get("/get", (req, res) => getAllSensors(req, res, client)); // Obtenir tous les capteurs
router.delete("/delete", (req, res) => deleteSensor(req, res, client)); // Supprimer un capteur

module.exports = router;
