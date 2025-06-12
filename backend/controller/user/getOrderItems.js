const mysqlDB = require("../../config/mysql");

async function getOrderItems(req, res) {
    try {
        const { order_id } = req.params;

        if (!order_id) {
            throw new Error("ID de commande manquant dans la requête.");
        }

        // Récupérer tous les produits liés à cette commande
        const [orderItems] = await mysqlDB.query(
            `SELECT product_id, product_name, product_price, quantity, product_image
             FROM order_items
             WHERE order_id = ?`,
            [order_id]
        );
        

        res.status(200).json({
            message: "Produits de la commande récupérés avec succès",
            data: orderItems,
            success: true,
            error: false
        });

    } catch (err) {
        console.error("Erreur dans getOrderItems :", err.message);
        res.status(500).json({
            message: err.message || "Erreur interne serveur",
            success: false,
            error: true
        });
    }
}

module.exports = getOrderItems;
