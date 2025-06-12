const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

// Configuration de CORS
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes principales
app.use("/api", router);

// Définir le port
const PORT = process.env.PORT || 2003;

// Connexion à MongoDB et démarrage du serveur
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log('✅ Connecté à la base de données');
            console.log(`🚀 Le serveur a démarré sur le port ${PORT}...`);
        });
    })
    .catch((err) => {
        console.error('❌ Erreur lors de la connexion à la base de données :', err.message);
        process.exit(1); // Quitter le processus si la connexion échoue
    });

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error('Erreur globale :', err.message);
    res.status(500).json({ message: "Erreur interne du serveur" });
});
