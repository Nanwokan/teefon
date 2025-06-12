const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

console.log("🌐 FRONTEND_URL autorisé :", process.env.FRONTEND_URL);

const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL, // production
  "http://localhost:3000"   // dev
];

app.use(cors({
  origin: allowedOrigins,
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
