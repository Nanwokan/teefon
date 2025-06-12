const mysqlDB = require("../../config/mysql");
const addToCartModel = require("../../models/cartProduct");
const { v4: uuidv4 } = require('uuid'); // Générer une référence unique

async function createOrder(req, res) {
    try {
        const userId = req.userId;
        const { shipping_address, phone_number, payment_method, reference } = req.body;

        // Validation
        if (!shipping_address || !shipping_address.address_line1 || !shipping_address.commune) {
            throw new Error("Adresse de livraison incomplète.");
        }
        if (!phone_number) {
            throw new Error("Numéro de téléphone manquant.");
        }
        if (!payment_method) {
            throw new Error("Méthode de paiement manquante.");
        }

        // Récupérer le panier MongoDB
        const cartProducts = await addToCartModel.find({ userId }).populate("productId");

        if (cartProducts.length === 0) {
            throw new Error("Votre panier est vide.");
        }

        // 1. Insérer l'adresse de livraison dans `shipping_addresses`
        const [addressResult] = await mysqlDB.query(
            `INSERT INTO shipping_addresses (user_id, address_line1, address_line2, city_id, commune) 
            VALUES (?, ?, ?, ?, ?)`,
            [
                userId,
                shipping_address.address_line1,
                shipping_address.address_line2 || '',
                shipping_address.city_id || 1, // Par défaut 1
                shipping_address.commune
            ]
        );

        const shipping_address_id = addressResult.insertId;

        // 2. Calcul du montant total
        const totalAmount = cartProducts.reduce((acc, item) => {
            const product = item.productId;
            const price = product.sellingPrice || product.price;
            return acc + (price * item.quantity);
        }, 0);

        // 3. Créer la commande dans `orders`
        const [orderResult] = await mysqlDB.query(
            `INSERT INTO orders (user_id, shipping_address_id, phone_number, payment_method, total_amount, reference, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [userId, shipping_address_id, phone_number, payment_method, totalAmount, reference, "En attente"]
        );

        const orderId = orderResult.insertId;

        // 4. Insérer chaque produit du panier dans `order_items`
        const insertItemsPromises = cartProducts.map(item => {
            const product = item.productId;
            const productId = product._id.toString();
            const productName = product.productName;
            const productPrice = product.sellingPrice || product.price;
            const quantity = item.quantity;
            const productImage = product.productImage?.[0] || ""; // première image ou vide


            return mysqlDB.query(
                `INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, product_image) 
                VALUES (?, ?, ?, ?, ?, ?)`,
                [orderId, productId, productName, productPrice, quantity, productImage]

            );

        });

        await Promise.all(insertItemsPromises);

        // 5. Vider le panier MongoDB
        await addToCartModel.deleteMany({ userId });

        // 6. Réponse finale
        res.status(201).json({
            message: "Commande passée avec succès !",
            data: {
                order_id: orderId,
                reference,
                totalAmount
            },
            success: true,
            error: false
        });

    } catch (err) {
        console.error("Erreur dans createOrder :", err.message);
        res.status(500).json({
            message: err.message || "Une erreur interne est survenue",
            success: false,
            error: true
        });
    }
}

module.exports = createOrder;
