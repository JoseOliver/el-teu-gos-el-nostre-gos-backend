const { Usuario, Tiene, Rol, Perro } = require("../models");
const dueñoController = {};

dueñoController.newPerro = async (req, res) => {
    try {
        let dueñoId= parseInt(req.userId);
        let newPerro= await Perro.create(
            {
            nombre: req.body.nombre,
            fecha_nacimiento: req.body.fecha_nacimiento,
            anotaciones: req.body.anotaciones,
            revisado: false,
            precio_dia: 15,
            dueño_id: dueñoId
            }
        );
        let sentPerro = {
            nombre: req.body.nombre,
            fecha_nacimiento: req.body.fecha_nacimiento,
            anotaciones: req.body.anotaciones
        }
        return res.json(
            {
                success: true,
                message: "Register "+ newPerro.nombre +" was succesful",
                data: sentPerro
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somenthing went wrong with Register",
            error: error.message
        });
    }
}
dueñoController.getMyPerros = async (req, res) => {
    try {
        let dueñoId= parseInt(req.userId);
        let perros = await Perro.findAll({ 
        where: {
            dueño_id : dueñoId
        },
        attributes:{ 
            exclude: [
                "id", "revisado", "precio_dia", "dueño_id", "createdAt", "updatedAt"
            ]
        }})
        return res.json(
            {
                success: true,
                message: "Successfuly retrieved your perros",
                data: perros
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somenthing went wrong retrieving your perros",
            error: error.message
        });
    }
}
dueñoController.getMyPerro = async (req, res) => {
    try {
        let perroNum= parseInt(req.params.id) -1;
        let dueñoId= parseInt(req.userId);
        let perros = await Perro.findAll({ 
            where: {
                dueño_id : dueñoId
            },
            attributes:{ 
                exclude: [
                    "id", "revisado", "precio_dia", "dueño_id", "createdAt", "updatedAt"
                ]
            }})
        if(perroNum +1 > perros.length){
            return res.status(500).json({
                success: false,
                message: "you only have " + perros.length + " perros",
                error: perroNum
            });
        }
        return res.json(
            {
                success: true,
                message: "Successfuly retrieved your perro "+ perros[perroNum].nombre,
                data: perros[perroNum]
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somenthing went wrong retrieving your perro",
            error: error.message
        });
    }
}
dueñoController.updatePerro = async (req, res) => {
    try {
        let perro= req.Perro;
        let changes= req.body.changes;
        perro.update(changes);
        return res.json(
            {
                success: true,
                message: "Successfuly updated your perro "+ perro.nombre,
                data: perro
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somenthing went wrong updating your perro",
            error: error.message
        });
    }
}

module.exports = dueñoController;