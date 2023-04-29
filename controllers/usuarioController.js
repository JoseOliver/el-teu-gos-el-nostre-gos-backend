const { Usuario, Tiene, Rol } = require("../models");
const usuarioController = {};

//CRUD
//get
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
usuarioController.getAllAsAdmin = async (req, res) => {
    try {
        let usuarios= await Usuario.findAll({ attributes:{ exclude:[ 'id', 'contraseña' ]}});
        return res.json(
            {
                success: true,
                message: "All users succesfully retrieved",
                data: usuarios
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Something went wrong retrieving users",
                error: error.message
            }
        );
    }
}
usuarioController.getUser = async (req, res) => {
    try {
        const user= await Usuario.findByPk( parseInt(req.params.id), {
            attributes:{
                exclude:['id', 'contraseña', 'createdAt', 'updatedAt']
            }
        });
        if(!user) {
            return res.status(500).json(
                {
                    success: false,
                    message: "Something went wrong retrieving User with id: " + req.params.id,
                    error: "user doesn't exists"
                }
            );
        }
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
}
//update
usuarioController.updateMe = async (req, res) => {
    try {
        const changes= req.body.changes;
        req.User.update(changes);
        req.User.save();
        let sentUser = {
            'nombre': req.User.nombre,
            'apellido': req.User.apellido,
            'telefono': req.User.telefono,
            'email': req.User.email
        }
        return res.json(
            {
                success: true,
                message: "User succesfully updated",
                data: sentUser
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Something went wrong updating your user",
                error: error.message
            }
        );
    }
}
usuarioController.putPrivilege = async (req, res) => {

}

module.exports = usuarioController;