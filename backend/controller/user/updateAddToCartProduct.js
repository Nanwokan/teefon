const addToCartModel = require("../../models/cartProduct")

const updateAddToCartProduct = async(req,res)=>{
    try{
        const currentUserId = req.userId
        const addToCartProductId = req?.body?._id

        const qty =req.body.quantity

        const updateProduct = await addToCartModel.updateOne({_id : addToCartProductId},{
            ...(qty && {quantity : qty})
        })

        res.json({
            message : "produit mis a jour!",
            data : updateProduct,
            error : false,
            success : true
             
        })

    }catch(err){
        res.status(400).json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = updateAddToCartProduct