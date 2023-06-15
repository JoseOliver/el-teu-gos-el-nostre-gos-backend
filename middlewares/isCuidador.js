const cuidadorController = require('../controllers/cuidadorController');
const { Usuario, Tiene, Rol } = require("../models");

const isCuidador = async(req, res, next) => {
    const user = await Usuario.findByPk(req.userId,{
        attributes:{
            exclude:['nombre', 'apellido', 'telefono', 'email', 'contraseña', 'createdAt', 'updatedAt']
        }
    });
    if(!user){
        return res.status(500).json({
            success: false,
            message: "Something failed retrieveing your user. Please try again.",
        }) 
    }
    let rolesUsuario = [];
    const rolesUsuarioId = await Tiene.findAll({
        where: { usuario_id: user.id },
        attributes: {
            exclude: ['id','createdAt', 'updatedAt', 'usuario_id']
        }
    });
    const allRoles = await Rol.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });
    for (let rol of allRoles){
        for (let _rol of rolesUsuarioId){
            if( rol.id === _rol.rol_id ) rolesUsuario.push(rol.rol);
        }
    }
    let cuidador= false;
    for ( let rol of rolesUsuario ){
        if ( rol === 'cuidador' ) cuidador= true;
    }
    if(!cuidador) return res.status(403).send('You are not cuidador, you are not allowed.');
    next();
}

module.exports = isCuidador;