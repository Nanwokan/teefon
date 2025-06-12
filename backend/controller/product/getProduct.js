const productModel = require("../../models/productModel");

const getProductController = async(req,res) => {
    try{
        const allProduct = await productModel.find().sort({createdAt : -1})

        res.json({
            message : "Tous les Produits",
            success : true,
            error : false,
            data : allProduct
        })
    }catch(err){
        res.status(400).json({
            message: err.message || "Une erreur s'est produite.",
            error: true,
            success: false,
        });
    }
    
}

module.exports = getProductController