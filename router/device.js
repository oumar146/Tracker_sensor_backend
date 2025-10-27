const express = require("express");
const router = express.Router();
// Import des controllers
const {
  NewDevice,
  getAllDevices,
  deleteDevice,
} = require("../controllers/device");
// Connexion à la base de données
const client = require("../db");

// Routes 
router.post("/new", (req, res) => NewDevice(req, res, client)); // Ajouter un appareil
router.get("/get", (req, res) => getAllDevices(req, res,client)); // Obtenir tous les appareils
router.delete("/delete",  (req, res) => deleteDevice(req, res, client)); // Supprimer un appareil


module.exports = router;
