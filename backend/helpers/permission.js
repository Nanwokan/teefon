const mysqlDB = require("../config/mysql");

const uploadProductPermission = async (userId) => {
    const [users] = await mysqlDB.query(
        'SELECT role FROM users WHERE id = ?',
        [userId]
    );

    if (users.length === 0) {
        throw new Error("Utilisateur introuvable");
    }

    const user = users[0];

    if (user.role !== 'admin') {
        return false; // Accès refusé
    }

    return true; // Accès autorisé
};

module.exports = uploadProductPermission;
