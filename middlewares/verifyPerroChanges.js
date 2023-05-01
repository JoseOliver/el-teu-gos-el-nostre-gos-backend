const { Perro } = require('../models')

const verifyPerroChanges = async(req, res, next) => {

    try {
        const dueñoId= req.userId;
        const perroNum= req.body.id -1;
        const perros = await Perro.findAll({
            where:{
                dueño_id : dueñoId
            }
        });
        if(perroNum +1 > perros.length){
            return res.status(500).json({
                success: false,
                message: "you only have " + perros.length + " perros",
                error: perroNum
            });
        }
        let perro = perros[perroNum];
        const changes= req.body.changes;
        if(changes){
            let changesExists = true;
            let wrongAttribute;
            for( let i in changes ){
                if(!perro._isAttribute(i) || 
                i === "id" ||
                i === "revisado" ||
                i === "precio_dia" ||
                i === "dueño_id" ||
                i === "createdAt" ||
                i === "updatedAt"
                ){
                    changesExists=false;
                    wrongAttribute=i;
                    break;
                }
            }
            if(changesExists){
                req.Perro=perro;
                next();
            }else{
                return res.status(500).send("wrong attribute sent "+ wrongAttribute + ", must be replaced by correct attribute");
            }
        }else{
            return res.status(500).send("You must send any changes to update perro");
        }
    }catch(error){
        return res.status(500).send(error.message)
    }
}

module.exports = verifyPerroChanges;