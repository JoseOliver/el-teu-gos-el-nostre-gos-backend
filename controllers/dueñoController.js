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
                "revisado", "precio_dia", "dueño_id", "createdAt", "updatedAt"
            ]
        }});
        let dueño = await Usuario.findByPk(dueñoId);
        let sentPerro = [];
        for( let perro in perros ){
            sentPerro[perro]= {
                id: perros[perro].id,
                num: parseInt(perro) +1,
                nombre: perros[perro].nombre,
                fecha_nacimiento: perros[perro].fecha_nacimiento,
                anotaciones: perros[perro].anotaciones,
                dueño:{
                    id: dueño.id,
                    nombre: dueño.nombre
                }
            };
        }
        return res.json(
            {
                success: true,
                message: "Successfuly retrieved your perros",
                data: sentPerro
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
        if (perroNum === -1){
            return res.status(500).json({
                success: false,
                message: "Perro 0 doesn't exist, try counting from 1",
                error: perroNum
            });
        }
        let dueñoId= parseInt(req.userId);
        let dueño = await Usuario.findByPk(dueñoId);
        let perros = await Perro.findAll({ 
            where: {
                dueño_id : dueñoId
            },
            attributes:{ 
                exclude: [
                    "revisado", "precio_dia", "dueño_id", "createdAt", "updatedAt"
                ]
            }});
        if(perroNum +1 > perros.length){
            return res.status(500).json({
                success: false,
                message: "you only have " + perros.length + " perros",
                error: perroNum
            });
        }
        let sentPerro= {
            id: perros[perroNum].id,
            num: parseInt(perroNum) +1,
            nombre: perros[perroNum].nombre,
            fecha_nacimiento: perros[perroNum].fecha_nacimiento,
            anotaciones: perros[perroNum].anotaciones,
            dueño:{
                id: dueño.id,
                nombre: dueño.nombre
            }
        };
        return res.json(
            {
                success: true,
                message: "Successfuly retrieved your perro "+ perros[perroNum].nombre,
                data: sentPerro
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
        let dueño = await Usuario.findByPk(perro.dueño_id);
        let sentPerro = {
            id: perro.id,
            num: req.body.id,
            nombre: perro.nombre,
            fecha_nacimiento: perro.fecha_nacimiento,
            anotaciones: perro.anotaciones,
            dueño:{
                id: perro.dueño_id,
                nombre: dueño.nombre
            }
        }
        return res.json(
            {
                success: true,
                message: "Successfuly updated your perro "+ perro.nombre,
                data: sentPerro
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
            }
        );
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somenthing went wrong with estancia register",
            error: error.message
        });
    }
}
dueñoController.getMyEstancias = async (req, res) => {
    try {
        let dueñoId= parseInt(req.userId);
        let perros= await Perro.findAll({where:{dueño_id : dueñoId}});
        let estancias = {}
        for ( let perro in perros ) {
            estancias[perro]= await Estancia.findAll({ 
                where:{perro_id : perros[perro].id},
                attributes: {exclude : ["createdAt", "updatedAt"]}
            });
        }
        let sentEstancias = {};
        for (let perro in estancias){
            for (let estancia in estancias[perro]){
                let cuidador;
                cuidador = await Usuario.findByPk(estancias[perro][estancia].cuidador_id);
                if (sentEstancias[perro] === undefined){
                    sentEstancias[perro]=[];
                };
                sentEstancias[perro][estancia]= {
                    id: estancias[perro][estancia].id,
                    inicio: estancias[perro][estancia].inicio,
                    fin: estancias[perro][estancia].fin,
                    verificada: estancias[perro][estancia].verificada,
                    finalizada: estancias[perro][estancia].finalizada,
                    perro: {
                        id: perros[perro].id,
                        num: perro +1,
                        nombre: perros[perro].nombre
                    },
                    cuidador: {
                        id: cuidador.id,
                        nombre: cuidador.nombre
                    }
                };
            }
        }
        return res.json(
            {
                success: true,
                message: "Estancias successfuly retrieved",
                data: sentEstancias
            }
        );
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somenthing went wrong retrieving your estancias",
            error: error.message
        });
    }
}
dueñoController.updateMyEstancia = async (req, res) => {
    try {
        let dueñoId = parseInt(req.userId);
        let perroNum = parseInt(req.body.perro_id) -1;
        if (perroNum === -1){
            return res.status(500).json({
                success: false,
                message: "Perro 0 doesn't exist, try counting from 1",
                error: perroNum
            });
        }
        let perros= await Perro.findAll({where:{ dueño_id: dueñoId }});
        let perro= perros[perroNum];
        let estancia= req.Estancia;
        let cuidador= await Usuario.findByPk(estancia.cuidador_id);
        if(estancia.perro_id !== perro.id){
            return res.status(500).json({
                success: false,
                message: "El perro seleccionado no forma parte de la estancia seleccionada"
            });
        }
        if(estancia.cuidador_id !== req.body.cuidador_id){
            return res.status(500).json({
                success: false,
                message: "El cuidador seleccionado no forma parte de la estancia seleccionada"
            });
        }
        let changes= req.body.changes;
        estancia.update(changes);
        let sentEstancia= {
            id: estancia.id,
            inicio: estancia.inicio,
            fin: estancia.fin,
            verificada: estancia.verificada,
            finalizada: estancia.finalizada,
            perro: {
                id: perro.id,
                num: req.body.perro_id,
                nombre: perro.nombre
            },
            cuidador: {
                id: req.body.cuidador_id,
                nombre: cuidador.nombre
            }
        };
        return res.json({
            success: true,
            message: "Successfuly updated your estancia",
            data: sentEstancia
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somenthing went wrong updating your estancia",
            error: error.message
        });
    }
}

module.exports = dueñoController;