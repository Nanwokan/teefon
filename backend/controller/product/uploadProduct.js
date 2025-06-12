const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function UploadProductController(req, res) {
    try {
        const sessionUserId = req.userId;

        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Accès refusé : Vous n'avez pas les permissions requises.")
        }
        
        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            message: "Téléchargement du produit réussi !",
            success: true,
            error: false,
            data: saveProduct,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || "Une erreur s'est produite.",
            error: true,
            success: false,
        });
    }
}

module.exports = UploadProductController;
