const jwt = require('jsonwebtoken');

async function authToken(req,res,next){
    try{
        const token = req.cookies?.token

        console.log("token",token)
        // Vérifiez si le token existe et qu'il est une chaîne // || typeof token !== 'string'
        if (!token) {
            return res.status(200).json({
                message : "Veuillez vous connecter",
                error : true ,
                success : false
            })
        }
        //console.log("Header Authorization reçu :", req.headers['authorization']);

        // Si le token est dans le header 'authorization', vérifiez s'il contient 'Bearer'
        //const actualToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

        // Vérification et décryptage du token
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err,decoded){
           console.log(err)
           console.log("decoded",decoded)


           if(err){
            console.log("error auth",err)
           }

           // Ajoutez les informations décodées à la requête
           req.userId = decoded?.id;
           req.userRole = decoded?.role;

           
           next(); // Passe au contrôleur suivant

        });


        

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            data : [],
            error : true,
            success : false
        })
    }
    
}

module.exports = authToken   