const mongoose = require("mongoose");

async function connectDB() {
    try {
        // Connexion à MongoDB sans options supplémentaires pour Mongoose 6.x+
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connexion réussie à MongoDB !");
    } catch (err) {
        console.error("❌ Erreur lors de la connexion à MongoDB :", err.message);
        process.exit(1); // Quitte le processus en cas d'erreur critique
    }
}

module.exports = connectDB; 
