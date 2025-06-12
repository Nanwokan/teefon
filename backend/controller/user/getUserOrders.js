const mysqlDB = require("../../config/mysql");

async function getUserOrders(req, res) {
    try {
        const userId = req.userId;

        // Récupérer les commandes de l'utilisateur
        const [orders] = await mysqlDB.query(
            `SELECT id, shipping_address_id, phone_number, payment_method, total_amount, reference, status, created_at
             FROM orders
             WHERE user_id = ?
             ORDER BY created_at DESC`,
            [userId]
        );

        res.status(200).json({
            message: "Commandes récupérées avec succès",
            data: orders,
            success: true,
            error: false
        });

    } catch (err) {
        console.error("Erreur dans getUserOrders :", err.message);
        res.status(500).json({
            message: err.message || "Erreur interne serveur",
            success: false,
            error: true
        });
    }
}

module.exports = getUserOrders;
