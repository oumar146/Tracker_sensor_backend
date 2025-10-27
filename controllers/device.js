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

    // Supprimer une catégorie
    const query = {
      text: "DELETE FROM esp_device WHERE id = $1",
      values: [id],
    };

    // Exécuter la requête de suppression
    const result = await client.query(query);

    // Préparer la réponse
    const responseData = {
      message:
        result.rowCount === 0
          ? "Appareil non trouvée"
          : "Appareil supprimée avec succès",
    };

    // Définir le code de statut approprié
    res.status(result.rowCount === 0 ? 404 : 200).json(responseData);
  } catch (error) {
    console.error(
      `Erreur lors de la suppression de l'appareil (${req.body.name}) :`,
      error
    );
    res.status(500).json({
      error: `Erreur lors de la suppression de l'appareil : ${req.body.name}`,
    });
  }
};