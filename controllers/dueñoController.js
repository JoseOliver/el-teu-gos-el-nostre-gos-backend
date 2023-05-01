const { Usuario, Tiene, Rol, Perro, Estancia } = require("../models");
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
            message: "Somenthing went wrong with perro register",
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
            }});
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
dueñoController.newEstancia = async (req, res) => {
    try {
        let dueñoId= parseInt( req.userId )
        console.log(dueñoId)
        let perroNum = parseInt(req.body.perro_id -1);
        let perros= await Perro.findAll({where: {dueño_id : dueñoId}});
        if(perroNum > perros.length -1){
            return res.status(500).json({
                success: false,
                message: "you only have " + perros.length + " perros",
                error: perroNum
            });
        }
        let perro= perros[perroNum];
        let cuidadorId = parseInt(req.body.cuidador_id);
        const cuidador = await Usuario.findByPk(cuidadorId);
        if (!cuidador){
            return res.status(500).json({
                success: false,
                message: "Cuidador with id: "+cuidadorId+" doesn't exist. You must enter a valid Cuidador id",
                error: cuidadorId
            });
        }
        let newEstancia = await Estancia.create(
        {
            inicio: req.body.inicio,
            fin: req.body.fin,
            verificada: false,
            finalizada: false,
            perro_id: perro.id,
            cuidador_id: cuidador.id
        });
        let sentEstancia= {
            inicio: newEstancia.inicio,
            fin: newEstancia.fin,
            perro: perro.nombre,
            verificada: false,
            cuidador: cuidador.nombre
        };
        return res.json(
            {
                success: true,
                message: "Register estancia from "+ perro.nombre +" was succesful",
                data: sentEstancia
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somenthing went wrong with estancia register",
            error: error.message
        });
    }
}

module.exports = dueñoController;