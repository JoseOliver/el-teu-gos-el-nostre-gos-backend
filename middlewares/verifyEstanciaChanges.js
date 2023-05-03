const { Estancia } = require('../models')

const verifyEstanciaChanges = async(req, res, next) => {

    try {
        const estanciaId= parseInt(req.body.id);
        const estancia = await Estancia.findByPk(estanciaId);
        if(!estancia){
            return res.status(500).json({
                success: false,
                message: "Something failed retrieveing your estancia. Please try again.",
            });
        }
        const changes= req.body.changes;
        if(changes){
            let changesExists = true;
            let wrongAttribute;
            for( let i in changes ){
                if(!estancia._isAttribute(i) || 
                i === "id" ||
                i === "verificada" ||
                i === "finalizada" ||
                i === "perro_id" ||
                i === "cuidador_id" ||
                i === "createdAt" ||
                i === "updatedAt"
                ){
                    changesExists=false;
                    wrongAttribute=i;
                    break;
                }
            }
            if(changesExists){
                req.Estancia=estancia;
                next();
            }else{
                return res.status(500).send("wrong attribute sent "+ wrongAttribute + ", must be replaced by correct attribute");
            }
        }else{
            return res.status(500).send("You must send any changes to update estancia");
        }
    }catch(error){
        return res.status(500).send(error.message)
    }
}

module.exports = verifyEstanciaChanges;