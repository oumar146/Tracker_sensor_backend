// Ajouter une mesure
exports.newMeasurement = async (req, res, client) => {
  const { sensor_id, value } = req.body;

  if (!sensor_id || value === undefined) {
    return res.status(400).json({ error: "Veuillez fournir sensor_id et value." });
  }

  try {
    const query = `
      INSERT INTO measurement (sensor_id, value)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [sensor_id, value];
    const result = await client.query(query, values);

    res.status(201).json({
      message: "Mesure ajoutée avec succès.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Erreur lors de l’ajout de la mesure :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
};

// Récupérer toutes les mesures avec infos capteur + type
exports.getAllMeasurements = async (req, res, client) => {
  try {
    const query = `
      SELECT 
        m.id,
        m.value,
        m.created_at,
        s.name AS sensor_name,
        st.name AS sensor_type,
        st.unit AS sensor_type_unit,
        e.name AS esp_device
      FROM measurement m
      LEFT JOIN sensor s ON m.sensor_id = s.id
      LEFT JOIN sensor_type st ON s.type_id = st.id
      LEFT JOIN esp_device e ON s.esp_id = e.id
      ORDER BY m.created_at DESC;
    `;
    const result = await client.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des mesures :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
};

// Mettre à jour une mesure
exports.updateMeasurement = async (req, res, client) => {
  const { id, value } = req.body;

  if (!id || value === undefined) {
    return res.status(400).json({ error: "Veuillez fournir id et value." });
  }

  try {
    const query = `
      UPDATE measurement
      SET value = $2
      WHERE id = $1
      RETURNING *;
    `;
    const values = [id, value];
    const result = await client.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Mesure non trouvée." });
    }

    res.status(200).json({
      message: "Mesure mise à jour avec succès.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la mesure :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
};

// Supprimer une mesure
exports.deleteMeasurement = async (req, res, client) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Veuillez fournir l'ID de la mesure à supprimer." });
  }

  try {
    const result = await client.query("DELETE FROM measurement WHERE id = $1 RETURNING *;", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Mesure non trouvée." });
    }

    res.status(200).json({
      message: "Mesure supprimée avec succès.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de la mesure :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
};
