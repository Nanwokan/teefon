const mysqlDB = require("../../config/mysql");
const bcrypt = require("bcrypt");

async function userSignUpController(req, res) {
    try {
        const { email, password, firstName, lastName, role = "general" } = req.body;

        console.log("req.body :", req.body);

        if (!email) throw new Error("Veuillez fournir un e-mail");
        if (!password) throw new Error("Veuillez fournir un mot de passe");
        if (!firstName) throw new Error("Veuillez saisir votre prénom");
        if (!lastName) throw new Error("Veuillez saisir votre nom");

        const [existingUsers] = await mysqlDB.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({
                message: "Cet e-mail est déjà utilisé",
                success: false,
                error: true,
            });
        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(password, salt);

        // Insertion dans MySQL
        await mysqlDB.query(
            'INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)',
            [firstName, lastName, email, hashPassword, role]
        );

        return res.status(201).json({
            message: "Utilisateur créé avec succès !",
            success: true,
            error: false,
        });

    } catch (err) {
        console.error("Erreur dans signupUserMySQL :", err.message);
        return res.status(500).json({
            message: err.message || "Une erreur interne est survenue",
            success: false,
            error: true,
        });
    }
}

module.exports = userSignUpController;
