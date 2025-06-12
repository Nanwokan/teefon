const mysqlDB = require("../../config/mysql");

async function createShippingAddress(req, res) {
    try {
        const userId = req.userId; // On récupère l'utilisateur connecté depuis le token
        const { address_line1, address_line2, city_id, commune } = req.body;

        // Validation des champs obligatoires
        if (!address_line1) {
            throw new Error("Veuillez fournir l'adresse principale (address_line1).");
        }

        if (!city_id) {
            throw new Error("Veuillez sélectionner une ville (city_id).");
        }

        // Insertion dans la table shipping_addresses
        const [result] = await mysqlDB.query(
            `INSERT INTO shipping_addresses 
            (user_id, address_line1, address_line2, city_id, commune) 
            VALUES (?, ?, ?, ?, ?)`,
            [userId, address_line1, address_line2 || "", city_id, commune || ""]
        );

        return res.status(201).json({
            message: "Adresse enregistrée avec succès !",
            data: {
                id: result.insertId,
                user_id: userId,
                address_line1,
                address_line2: address_line2 || "",
                city_id,
                commune: commune || ""
            },
            success: true,
            error: false
        });

    } catch (err) {
        console.error("Erreur dans createShippingAddress :", err.message);
        return res.status(500).json({
            message: err.message || "Une erreur interne est survenue",
            success: false,
            error: true
        });
    }
}

module.exports = createShippingAddress;
