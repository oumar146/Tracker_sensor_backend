// Ajouter un capteur
exports.newSensor = async (req, res, client) => {
  const { name, type_id, esp_id } = req.body;

  if (!name || !type_id || !esp_id) {
    return res.status(400).json({ error: "Veuillez fournir name, type_id et esp_id." });
  }

  try {
    const query = `
      INSERT INTO sensor (name, type_id, esp_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [name, type_id, esp_id];
    const result = await client.query(query, values);

    res.status(201).json({
      message: "Capteur ajouté avec succès.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Erreur lors de l’ajout du capteur :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
};

// Récupérer tous les capteurs avec leurs types et devices
exports.getAllSensors = async (req, res, client) => {
  try {
    const query = `
      SELECT 
        s.id,
        s.name,
        st.name AS sensor_type,
        e.name AS esp_device
      FROM sensor s
      LEFT JOIN sensor_type st ON s.type_id = st.id
      LEFT JOIN esp_device e ON s.esp_id = e.id
      ORDER BY s.id ASC;
    `;
    const result = await client.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des capteurs :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
};

// Supprimer un capteur
exports.deleteSensor = async (req, res, client) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Veuillez fournir l'ID du capteur à supprimer." });
  }

  try {
    const result = await client.query("DELETE FROM sensor WHERE id = $1 RETURNING *;", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Capteur non trouvé." });
    }

    res.status(200).json({
      message: "Capteur supprimé avec succès.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du capteur :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
};

