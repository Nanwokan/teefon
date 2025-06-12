const addToCartModel = require("../../models/cartProduct")

const addToCartController = async(req, res) => {
    try {
        const { productId } = req?.body
        const currentUser = req.userId

        // Vérifie si le produit est déjà présent dans le panier de cet utilisateur
        const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser });

        console.log("isProductAvailable", isProductAvailable)

        if (isProductAvailable) {
            return res.json({
                message: "Existe déjà dans Ajouter au panier",
                success: false,
                error: true
            })
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser,
        }

        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()

        return res.json({
            data : saveProduct,
            message: "Produit ajouté au panier",
            success: true,
            error: false
        })

    } catch (err) {
        res.status(400).json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = addToCartController