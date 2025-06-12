const mysqlDB = require("../../config/mysql");

async function updateUser(req, res) {
    try {
        const sessionUser = req.userId; // L'utilisateur qui fait la demande
        const { userId, firstName, lastName, email, role } = req.body;

        // Construction dynamique du payload
        const fields = [];
        const values = [];

        if (email) {
            fields.push("email = ?");
            values.push(email);
        }
        if (firstName) {
            fields.push("first_name = ?");
            values.push(firstName);
        }
        if (lastName) {
            fields.push("last_name = ?");
            values.push(lastName);
        }
        if (role) {
            fields.push("role = ?");
            values.push(role);
        }

        if (fields.length === 0) {
            return res.status(400).json({
                message: "Aucune donnée fournie pour la mise à jour.",
                success: false,
                error: true,
            });
        }

        // Vérification du rôle de celui qui fait la demande
        const [sessionUsers] = await mysqlDB.query('SELECT role FROM users WHERE id = ?', [sessionUser]);
        if (sessionUsers.length === 0) {
            throw new Error("Session utilisateur non valide.");
        }

        const userRole = sessionUsers[0].role;

        console.log("user.role", userRole);

        if (userRole !== "admin" && userId !== sessionUser) {
            return res.status(403).json({
                message: "Accès refusé : vous ne pouvez mettre à jour que votre propre profil.",
                success: false,
                error: true
            });
        }

        // Construction finale de la requête SQL
        const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
        values.push(userId); // Ajout du userId à la fin

        const [result] = await mysqlDB.query(sql, values);

        res.json({
            data: { affectedRows: result.affectedRows },
            message: "Utilisateur mis à jour avec succès !",
            success: true,
            error: false
        });

    } catch (err) {
        console.error("Erreur dans updateUser :", err.message);
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = updateUser;
