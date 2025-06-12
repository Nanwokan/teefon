const mysqlDB = require("../../config/mysql");

async function allUsers(req, res) {
    try {
        console.log("userid all Users", req.userId);

        const [allUsers] = await mysqlDB.query(
            'SELECT id, first_name, last_name, email, role, created_at FROM users'
        );

        res.json({
            message: "Tous les utilisateurs récupérés",
            data: allUsers,
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = allUsers;
