const mysqlDB = require("../../config/mysql");

async function getAllOrders(req, res) {
    try {
        const userRole = req.userRole; // Normalement injecté via authToken amélioré

        if (userRole !== 'admin') {
            return res.status(403).json({
                message: "Accès refusé : réservé aux administrateurs",
                success: false,
                error: true
            });
        }

        // Récupérer toutes les commandes
        const [orders] = await mysqlDB.query(
            `SELECT id, user_id, shipping_address_id, phone_number, payment_method, total_amount, reference, status, created_at
             FROM orders
             ORDER BY created_at DESC`
        );

        res.status(200).json({
            message: "Toutes les commandes récupérées avec succès",
            data: orders,
            success: true,
            error: false
        });

    } catch (err) {
        console.error("Erreur dans getAllOrders :", err.message);
        res.status(500).json({
            message: err.message || "Erreur interne serveur",
            success: false,
            error: true
        });
    }
}

module.exports = getAllOrders;
