const bcrypt = require('bcryptjs');
const mysqlDB = require("../../config/mysql");
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        // Validation des champs
        if (!email) {
            throw new Error("Veuillez fournir un e-mail");
        }
        if (!password) {
            throw new Error("Veuillez fournir un mot de passe");
        }

        // Vérification de l'utilisateur dans MySQL
        const [users] = await mysqlDB.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) { // Aucun utilisateur trouvé
            throw new Error("Utilisateur introuvable");
        }

        const existingUser = users[0];

        // Vérification du mot de passe
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (isPasswordValid) {
            const tokenData = {
                id: existingUser.id, // ID MySQL
                email: existingUser.email,
                role: existingUser.role
            };

            // Génération du token JWT
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 }); // 8h

            const tokenOption = {
      httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // secure en production seulement
  sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
};


            // Connexion réussie avec retour du token
            res.cookie("token", token, tokenOption).status(200).json({
                message: "Connexion réussie",
                data: token,
                success: true,
                error: false
            });

        } else {
            throw new Error("Mot de passe incorrect");
        }

    } catch (err) {
        console.error("Erreur dans loginUserMySQL :", err.message);
        // Réponse en cas d'erreur
        return res.status(500).json({
            message: err.message || "Une erreur interne est survenue",
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;

