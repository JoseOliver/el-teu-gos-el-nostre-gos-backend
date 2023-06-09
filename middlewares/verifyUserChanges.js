const { Usuario } = require('../models')

const verifyUserChanges = async(req, res, next) => {

    try {
        const user = await Usuario.findByPk(req.userId);
        const changes= req.body.changes || req.body.props;
        if(changes){
            let changesExists = true;
            let wrongAttribute;
            for( let i in changes){
                if(!user._isAttribute(i) ||
                    i === "id" ||
                    i === "createdAt" ||
                    i === "updatedAt"
                ){
                    changesExists=false;
                    wrongAttribute=i;
                    break;
                }
            }
            if(changesExists){
                req.User=user;
                next();
            }else{
                return res.status(500).send("wrong attribute sent "+ wrongAttribute + ", must be replaced by correct attribute");
            }
        }else{
            return res.status(500).send("You must send any changes to update user");
        }
    }catch(error){
        return res.status(500).send(error.message)
    }
}

module.exports = verifyUserChanges;