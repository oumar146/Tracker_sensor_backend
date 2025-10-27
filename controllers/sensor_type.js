exports.NewSensorType = async (req, res, client) => {
  try {
    const { name } = req.body;

    // Insérer un type de capteur
    const query = {
      text: "INSERT INTO sensor_type (name) VALUES ($1)",
      values: [name],
    };

    await client.query(query);

    // Préparer la réponse
    const responseData = {
      message: "Type de capteur ajouté avec avec succès",
    };

    res.status(201).json(responseData);
  } catch (error) {
    console.error(
      "Erreur lors de l'insertion :",
      error
    );
    res
      .status(500)
      .json({ error: "Erreur lors de l'insertion" });
  }
};

exports.getAllSensorType = async (req, res, client) => {
  try {
    // Récupérer tous les appareils
    const query = { text: "SELECT * FROM sensor_type" };
    const response = await client.query(query);
    const sensorType = response.rows;
    res.status(200).json({ sensorType });
  } catch (error) {
    console.error("Erreur lors de la récupération des types de capteur :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des types de capteur" });
  }
};

exports.deleteSensorType = async (req, res, client) => {
  try {
    const { id } = req.body;

    // Supprimer un type de capteur
    const query = {
      text: "DELETE FROM sensor_type WHERE id = $1",
      values: [id],
    };

    // Exécuter la requête de suppression
    const result = await client.query(query);

    // Préparer la réponse
    const responseData = {
      message:
        result.rowCount === 0
          ? "type de capteur non trouvée"
          : "type de capteur supprimée avec succès",
    };

    // Définir le code de statut approprié
    res.status(result.rowCount === 0 ? 404 : 200).json(responseData);
  } catch (error) {
    console.error(
      `Erreur lors de la suppression du type de capteur (${req.body.name}) :`,
      error
    );
    res.status(500).json({
      error: `Erreur lors de la suppression du type de capteur : ${req.body.name}`,
    });
  }
};