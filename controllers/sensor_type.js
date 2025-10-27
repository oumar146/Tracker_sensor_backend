exports.NewSensorType = async (req, res, client) => {
  try {
    const { name, unit } = req.body;

    if (!name || !unit) {
      return res.status(400).json({ error: "Veuillez fournir le nom et l'unité du type de capteur." });
    }

    const query = {
      text: "INSERT INTO sensor_type (name, unit) VALUES ($1, $2)",
      values: [name, unit],
    };

    await client.query(query);

    res.status(201).json({ message: "Type de capteur ajouté avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'insertion :", error);
    res.status(500).json({ error: "Erreur lors de l'insertion" });
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

    // Vérifier si le type de capteur est utilisé
    const checkQuery = {
      text: "SELECT COUNT(*) FROM sensor WHERE type_id = $1",
      values: [id],
    };
    const checkResult = await client.query(checkQuery);
    const count = parseInt(checkResult.rows[0].count);

    if (count > 0) {
      return res.status(400).json({
        error: "Impossible de supprimer ce type de capteur : il est encore utilisé par des capteurs.",
      });
    }

    // Supprimer le type
    const deleteQuery = {
      text: "DELETE FROM sensor_type WHERE id = $1",
      values: [id],
    };
    const result = await client.query(deleteQuery);

    res.status(result.rowCount === 0 ? 404 : 200).json({
      message:
        result.rowCount === 0
          ? "Type de capteur non trouvé."
          : "Type de capteur supprimé avec succès.",
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du type de capteur :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
};
