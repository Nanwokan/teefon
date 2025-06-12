const mysqlDB = require("../../config/mysql");

const getPaymentMethods = async (req, res) => {
    try {
        const [rows] = await mysqlDB.query(`SHOW COLUMNS FROM orders LIKE 'payment_method'`);

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Colonne non trouvée",
                success: false,
                error: true
            });
        }

        const typeString = rows[0].Type; 

        // Nettoyage : extraire les valeurs
        const values = typeString
            .replace("enum(", "")
            .replace(")", "")
            .split(",")
            .map(val => val.replace(/'/g, ""));

        return res.json({
            message: "Méthodes de paiement récupérées",
            success: true,
            error: false,
            data: values
        });

    } catch (err) {
        console.error("Erreur récupération payment methods:", err);
        res.status(500).json({
            message: "Erreur interne",
            success: false,
            error: true
        });
    }
};

module.exports = getPaymentMethods;
