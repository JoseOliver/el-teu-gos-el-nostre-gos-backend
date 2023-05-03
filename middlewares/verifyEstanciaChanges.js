const { Estancia } = require('../models')

const verifyEstanciaChanges = async(req, res, next) => {

    try {
        let changes= req.body.changes;
        let _new = false;
        if (!changes){
            changes = req.body.props;
            _new= true;
        }
        let estancia = await Estancia.build();
        if(!estancia){
            return res.status(500).json({
                success: false,
                message: "Something failed retrieveing your estancia. Please try again.",
            });
        }
        if(changes){
            let changesExists = true;
            let wrongAttribute;
            for( let i in changes ){
                if(!estancia._isAttribute(i) || 
                i === "id" ||
                i === "verificada" ||
                i === "finalizada" ||
                (i === "perro_id" && !_new) ||
                (i === "cuidador_id" && !_new) ||
                i === "createdAt" ||
                i === "updatedAt"
                ){
                    changesExists=false;
                    wrongAttribute=i;
                    break;
                }
            }
            if(changesExists){
                req.EstanciaId=req.body.id;
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