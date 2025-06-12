const mysqlDB = require("../../config/mysql");

async function updateOrderStatus(req, res) {
    try {
        const userRole = req.userRole; // Normalement injecté via authToken
        const { order_id, new_status } = req.body;

        if (userRole !== 'admin') {
            return res.status(403).json({
                message: "Accès refusé : réservé aux administrateurs",
                success: false,
                error: true
            });
        }

        if (!order_id) {
            throw new Error("ID de commande manquant.");
        }
        if (!new_status) {
            throw new Error("Nouveau statut manquant.");
        }

        // Vérification que le statut est valide
        const validStatuses = ['En attente', 'Payé'];
        if (!validStatuses.includes(new_status)) {
            throw new Error("Statut invalide. Seuls 'En attente' et 'Payé' sont autorisés.");
        }

        // Mise à jour du statut de la commande
        const [result] = await mysqlDB.query(
            `UPDATE orders SET status = ? WHERE id = ?`,
            [new_status, order_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Commande non trouvée",
                success: false,
                error: true
            });
        }

        res.status(200).json({
            message: "Statut de la commande mis à jour avec succès",
            success: true,
            error: false
        });

    } catch (err) {
        console.error("Erreur dans updateOrderStatus :", err.message);
        res.status(500).json({
            message: err.message || "Erreur interne serveur",
            success: false,
            error: true
        });
    }
}

module.exports = updateOrderStatus;
