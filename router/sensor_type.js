const express = require("express");
const router = express.Router();
// Import des controllers
const {
  NewSensorType,
  getAllSensorType,
deleteSensorType} = require("../controllers/sensor_type");
// Connexion à la base de données
const client = require("../db");

// Routes 
router.post("/new", (req, res) => NewSensorType(req, res, client)); // Ajouter un type de capteur
router.get("/get", (req, res) => getAllSensorType(req, res,client)); // Obtenir tous les type de capteur
router.delete("/delete",  (req, res) => deleteSensorType(req, res, client)); // Supprimer un type de capteur


module.exports = router;
