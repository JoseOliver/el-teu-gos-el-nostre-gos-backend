const { Usuario, Tiene, Rol } = require("../models");
const usuarioController = {};

usuarioController.getMe = async (req, res) => {
    try {
        const user = await Usuario.findByPk(req.userId,{
            attributes:{
                exclude:['id', 'contraseña', 'createdAt', 'updatedAt']
            }
        });
        return res.json(
            {
                success: true,
                message: "User succesfully retrieved",
                data: user
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Something went wrong retrieving User",
                error: error.message
            }
        );
    }
};
usuarioController.getPrivileges = async (req, res) => {
    try {
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
        return res.json(
            {
                success: true,
                message: "Privileges succesfully retrieved",
                data: rolesUsuario
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Something went wrong retrieving privileges",
                error: error.message
            }
        );
    }
};
usuarioController.getAllAsAdmin= async (req, res) => {
    let usuarios= await Usuario.findAll({ attributes:{ exclude:[ 'id', 'contraseña' ]}});
    return res.json(
        {
            success: true,
            message: "All users succesfully retrieved",
            data: usuarios
        }
    );
}

module.exports = usuarioController;