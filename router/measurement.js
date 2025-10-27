const express = require("express");
const router = express.Router();

// Import des controllers
const {
  newMeasurement,
  getAllMeasurements,
  updateMeasurement,
  deleteMeasurement,
} = require("../controllers/measurement");

// Connexion à la base de données
const client = require("../db");

// Routes
router.post("/new", (req, res) => newMeasurement(req, res, client)); // Ajouter une mesure
router.get("/get", (req, res) => getAllMeasurements(req, res, client)); // Récupérer toutes les mesures
router.put("/update", (req, res) => updateMeasurement(req, res, client)); // Modifier une mesure
router.delete("/delete", (req, res) => deleteMeasurement(req, res, client)); // Supprimer une mesure

module.exports = router;
