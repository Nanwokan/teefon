const productModel = require("../../models/productModel");


const getCategoryProduct = async(req,res) => {
    try{
        const productCategory = await productModel.distinct("category");

        if (productCategory.length === 0) {
            return res.status(404).json({
                message: "Aucune catégorie trouvée.",
                error: true,
                success: false,
            });
        }

        console.log("Categories trouvées :", productCategory);

        //Tableau pour stocker un produit de chaque catégorie
        const productByCategory = []

        for(const category of productCategory){
            const product = await productModel.findOne({category})

            if(product){
                productByCategory.push(product)
            }
        }

        res.status(200).json({
            message : "Catégories récupérées avec succès.",
            data : productByCategory,
            success : true,
            error : false
        })



    }catch(err){
        res.status(400).json({
            message: err.message || "Une erreur s'est produite.",
            error: true,
            success: false,
        });
    }

}

module.exports = getCategoryProduct