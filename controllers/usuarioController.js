const { Usuario, Tiene, Rol } = require("../models");
const bcrypt = require('bcrypt');
const usuarioController = {};

//CRUD
//get
usuarioController.getMe = async (req, res) => {
    try {
        const user = await Usuario.findByPk(req.userId,{
            attributes:{
                exclude:['contraseña', 'createdAt', 'updatedAt']
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
        let usuarios= await Usuario.findAll({ attributes:{ exclude:[ 'contraseña' ]}});
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
                exclude:['contraseña']
            }
        });
        const userRoles= await Tiene.findAll({
            where:{
                usuario_id: parseInt(req.params.id)
            }
        });
        const roles= await Rol.findAll();
        let _roles= [];
        for (let rol of roles) _roles[rol.id]= rol.rol;
        if(!user) {
            return res.status(500).json(
                {
                    success: false,
                    message: "Something went wrong retrieving User with id: " + req.params.id,
                    error: "user doesn't exists"
                }
            );
        }
        let _user= {
            id: user.id,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            telefono: user.telefono,
            roles: [],
            creado: user.createdAt,
            actualizado: user.updatedAt
        };
        for (let rol of userRoles){ 
            for (let _rol of _roles) {
                if(rol.rol_id === _roles.indexOf(_rol)) _user.roles.push(_rol);
            }
        }
        return res.json(
            {
                success: true,
                message: "User succesfully retrieved",
                data: _user
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
        let changes= req.body.changes;
        if(changes.contraseña)changes.contraseña= bcrypt.hashSync(changes.contraseña, 10);
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
    try {
        const idTarget= parseInt( req.body.id );
        const privilegesTarget= req.body.add;
        let finalPrivileges = [...privilegesTarget];
        const userPrivileges= await Tiene.findAll({
            where: {
                usuario_id: idTarget
            }
        });
        const roles= await Rol.findAll();
        // obtengo todos los roles por orden (su posicion en el array es la misma que su id)
        let _roles= [];
        for (let rol of roles) _roles[rol.id]= rol.rol
        // compruebo si los privilegios introducidos ya estan añadidos para no repetir campos
        for ( let privilege of privilegesTarget ){
            for ( let _privilege of userPrivileges ){
                if ( privilege === _roles[ _privilege.rol_id ]) {
                    let index = finalPrivileges.indexOf(privilege);
                    finalPrivileges.splice(index, 1);
                }
            }
        }
        // // creo los privilegios indicados
        for ( let privilege of finalPrivileges ){
            Tiene.create({
                rol_id: _roles.indexOf(privilege),
                usuario_id: idTarget
            })
        }
        return res.json(
            {
                success: true,
                message: "User with id: " + idTarget + " now have new privileges",
                data: finalPrivileges
            });
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Something went wrong updating privileges",
                error: error.message
            }
        );
    }
}
usuarioController.removePrivilege = async (req, res) => {
    try {
        const idTarget= parseInt( req.body.id );
        const privilegesTarget= req.body.remove;
        let finalPrivileges = [...privilegesTarget];
        const userPrivileges= await Tiene.findAll({
            where: {
                usuario_id: idTarget
            }
        });
        const roles= await Rol.findAll();
        // obtengo todos los roles por orden (su posicion en el array es la misma que su id)
        let _roles= [];
        for (let rol of roles) _roles[rol.id]= rol.rol
        // compruebo si los privilegios introducidos existen para poder eliminarlos
        let remove= false;
        for ( let privilege of privilegesTarget ){
            remove= true;
            for ( let _privilege of userPrivileges ){
                if ( privilege === _roles[ _privilege.rol_id ]) {
                    remove= false;
                }
            }
            if ( remove ) {
                let index = finalPrivileges.indexOf(privilege);
                finalPrivileges.splice(index, 1);
            }
        }
        // elimino los privilegios indicados
        let _userPrivileges = [...userPrivileges];
        for ( let privilege of finalPrivileges ){
            for ( let _privilege of userPrivileges ){
                if ( privilege === _roles[ _privilege.rol_id ]) {
                    let index = _userPrivileges.indexOf(_privilege);
                    _userPrivileges[index].destroy();
                }
            }
        }
        return res.json(
            {
                success: true,
                message: "User with id: " + idTarget + " now don't have new privileges",
                data: finalPrivileges
            });
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Something went wrong updating privileges",
                error: error.message
            }
        );
    }
}

module.exports = usuarioController;