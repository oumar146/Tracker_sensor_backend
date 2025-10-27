exports.NewDevice = async (req, res, client) => {
  try {
    const { name } = req.body;

    // Insérer l'appareil
    const query = {
      text: "INSERT INTO esp_device (name) VALUES ($1)",
      values: [name],
    };

    await client.query(query);

    // Préparer la réponse
    const responseData = {
      message: "Appareil ajouté avec avec succès",
    };

    res.status(201).json(responseData);
  } catch (error) {
    console.error(
      "Erreur lors de l'insertion de l'appareil :",
      error
    );
    res
      .status(500)
      .json({ error: "Erreur lors de l'insertion de l'appareil" });
  }
};

exports.getAllDevices = async (req, res, client) => {
  try {
    // Récupérer tous les appareils
    const query = { text: "SELECT * FROM esp_device" };
    const response = await client.query(query);
    const devices = response.rows;
    res.status(200).json({ devices });
  } catch (error) {
    console.error("Erreur lors de la récupération des appareils :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des appareils" });
  }
};

exports.deleteDevice = async (req, res, client) => {
  try {
    const { id } = req.body;

    // Vérifier si l'appareil a encore des capteurs liés
    const checkQuery = {
      text: "SELECT COUNT(*) FROM sensor WHERE esp_id = $1",
      values: [id],
    };
    const checkResult = await client.query(checkQuery);
    const count = parseInt(checkResult.rows[0].count);

    if (count > 0) {
      return res.status(400).json({
        error: "Impossible de supprimer cet appareil : il est encore lié à des capteurs.",
      });
    }

    const deleteQuery = {
      text: "DELETE FROM esp_device WHERE id = $1",
      values: [id],
    };
    const result = await client.query(deleteQuery);

    res.status(result.rowCount === 0 ? 404 : 200).json({
      message:
        result.rowCount === 0
          ? "Appareil non trouvé."
          : "Appareil supprimé avec succès.",
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'appareil :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
};
