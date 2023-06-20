const { Entrada } = require('../models')

const verifyEntradaChanges = async(req, res, next) => {

    try {
        let changes= req.body.changes;
        let _new = false;
        if (!changes){
            changes = req.body.props;
            _new= true;
        }
        let entrada = await Entrada.build();
        if(!entrada){
            return res.status(500).json({
                success: false,
                message: "Something failed. Please try again.",
            });
        }
        if(changes){
            let changesExists = true;
            let wrongAttribute;
            for( let i in changes ){
                if(!entrada._isAttribute(i) || 
                i === "id" ||
                (i === "perro_id" && !_new) ||
                i === "createdAt" ||
                i === "updatedAt"
                ){
                    changesExists=false;
                    wrongAttribute=i;
                    break;
                }
            }
            if(changesExists){
                req.entradaId=req.body.id;
                next();
            }else{
                return res.status(500).send("wrong attribute sent "+ wrongAttribute + ", must be replaced by correct attribute");
            }
        }else{
            return res.status(500).send("You must send any changes to update entrada");
        }
    }catch(error){
        return res.status(500).send(error.message)
    }
}

module.exports = verifyEntradaChanges;