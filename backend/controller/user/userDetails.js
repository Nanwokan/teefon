const mysqlDB = require("../../config/mysql");

async function userDetailsController(req, res) {
    try {
        console.log("userId", req.userId);

        // Requête SQL pour récupérer l'utilisateur depuis MySQL
        const [users] = await mysqlDB.query(
            'SELECT id, first_name, last_name, email, profile_pic, role, created_at FROM users WHERE id = ?',
            [req.userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                message: "Utilisateur non trouvé",
                error: true,
                success: false
            });
        }

        const user = users[0];

        res.status(200).json({
            message: "Détails utilisateur récupérés avec succès",
            data: user,
            error: false,
            success: true
        });

    } catch (err) {
        console.error("Erreur dans userDetailsController :", err.message);
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = userDetailsController;
