async function userLogout(req, res){
    try{

        res.clearCookie("token")

        res.json({
            message : "Déconnecté avec succès!",
            error : false,
            success : true,
            data : []
        })

    }catch(err){
        return res.status(500).json({
            message: err.message || "Une erreur interne est survenue",
            error: true,
            success: false,
        });
    }
}


module.exports = userLogout