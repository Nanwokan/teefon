const productModel = require("../../models/productModel");

const getProductDetails = async(req,res) =>{
    try{
        const {productId} = req.body

        const product = await productModel.findById(productId)

        res.json({
            data : product,
            message : "ok",
            success : true,
            error :false
        })

    }catch(err){
        res.status(400).json({
            message: err?.message || err || "Une erreur s'est produite.",
            error: true,
            success: false,
        });
    }
}

module.exports = getProductDetails