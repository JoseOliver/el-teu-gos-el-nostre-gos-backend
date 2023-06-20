const { Usuario, Perro, Tiene, Rol, Estancia } = require("../models");
const cuidadorController = {};

cuidadorController.getMyEstancias = async (req, res) => {
    try {
        let estancias = await Estancia.findAll({where:{cuidador_id:req.userId}, attributes:{exclude: ['createdAt','updatedAt']}});
        return res.status(200).json({
            success: true,
            message: "All your estancias retrieved",
            data: estancias
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somenthing went wrong getting your estancias",
            error: error.message
        });
    }
}
cuidadorController.getMyEstancia = async (req, res) => {
    try {
        let estanciaId = req.params.id;
        let estancia = await Estancia.findByPk(estanciaId, {attributes:{exclude: ['createdAt','updatedAt']}});
        if  (!estancia) return res.status(400).json({
            success: false,
            message: "this estancia is not yours, or maybe it doesn't exist",
        });
        let perroId = estancia.perro_id;
        let perro = await Perro.findByPk(perroId, {attributes:{exclude: ['createdAt','updatedAt']}});
        let dueñoId = perro.dueño_id;
        let dueño = await Usuario.findByPk(dueñoId, {attributes:{exclude: ['createdAt','updatedAt']}});
        let result = {
            id: estancia.id,
            inicio: estancia.inicio,
            fin: estancia.fin,
            verificada: estancia.verificada,
            finalizada: estancia.finalizada,
            perro:{
                id: perro.id,
                nombre: perro.nombre,
                fecha_nacimiento: perro.fecha_nacimiento,
                anotaciones: perro.anotaciones,
                revisado: perro.revisado,
                precio_dia: perro.precio_dia,
                dueño:{
                    id: dueño.id,
                    nombre: dueño.nombre,
                    apellido: dueño.apellido,
                    telefono: dueño.telefono,
                    email: dueño.email
                }
            }
        };
        res.perro= perro;
        res.dueño= dueño;
        return res.status(200).json({
            success: true,
            message: "Estancia successfuly retrieved",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somenthing went wrong getting your estancias",
            error: error.message
        });
    }
}
cuidadorController.getMyPerros = async (req, res) => {
    try {
        let estancias = await Estancia.findAll({where:{cuidador_id:req.userId}, attributes:{exclude: ['createdAt','updatedAt']}});
        let perrosId = [];
        for (let estancia of estancias) {
                if(perrosId.indexOf(estancia.perro_id === -1)){
                    perrosId.push(estancia.perro_id);
                }
            }
        let perros = [];
        for (let perroId of perrosId){
            let perro = await Perro.findByPk(perroId, {attributes:{exclude: ['createdAt','updatedAt']}});
            perros.push(perro);
        }
        return res.status(200).json({
            success: true,
            message: "Perros successfuly retrieved",
            data: perros
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somenthing went wrong getting your perros",
            error: error.message
        });
    }
}
cuidadorController.getMyPerro = async (req, res) => {
    try {
        let myId = req.userId;
        let perroId = req.params.id;
        let estanciasPerro = await Estancia.findAll({where:{perro_id:perroId, cuidador_id:myId}, attributes:{exclude: ['createdAt','updatedAt']}});
        console.log(estanciasPerro.length)
        if  (estanciasPerro.length===0) return res.status(400).json({
            success: false,
            message: "You're not cuidador of this perro, or maybe this perro doesn't exist",
        });
        let perro = await Perro.findByPk(perroId, {attributes:{exclude: ['createdAt','updatedAt']}});
        let dueñoId = perro.dueño_id;
        let dueño = await Usuario.findByPk(dueñoId, {attributes:{exclude: ['createdAt','updatedAt']}});
        let result = {
            id: perro.id,
            nombre: perro.nombre,
            fecha_nacimiento: perro.fecha_nacimiento,
            anotaciones: perro.anotaciones,
            revisado: perro.revisado,
            precio_dia: perro.precio_dia,
            dueño:{
                id: dueño.id,
                nombre: dueño.nombre,
                apellido: dueño.apellido,
                telefono: dueño.telefono,
                email: dueño.email
            }
        }
        return res.status(200).json({
            success: true,
            message: "Perro successfuly retrieved",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somenthing went wrong getting your perro",
            error: error.message
        });
    }
}
cuidadorController.verificarEstancia = async (req, res) => {
    try {
        let estanciaId = req.params.id;
        let estancia = await Estancia.findByPk(estanciaId, {attributes:{exclude: ['createdAt']}});
        if (!estancia) return res.status(400).json({
            success: false,
            message: "this estancia is not yours, or maybe it doesn't exist",
        });
        if(estancia.verificada) estancia.update({verificada:false});
        else estancia.update({verificada:true});
        return res.status(200).json({
            success: true,
            message: "Estancia successfuly verified",
            data: estancia
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somenthing went wrong verifying your estancia",
            error: error.message
        });
    }
}
cuidadorController.verificarPerro = async (req, res) => {
    try {
        let perroId = req.params.id;
        let perro = await Perro.findByPk(perroId, {attributes:{exclude: ['createdAt']}});
        if (!perro) return res.status(400).json({
            success: false,
            message: "You're not cuidador of this perro, or maybe this perro doesn't exist",
        });
        if( perro.revisado ) {
            let estanciasDelPerro = Estancia.findAll({where:{perro_id:perro.id, verificada:false}});
            if(estanciasDelPerro.length === 0) perro.update({revisado:false});
            else return res.status(500).json({
                success: false,
                message: "This perro can't change revisado value, it has any active estancia. You must set thats estancia(s) to unverified to change this value",
            });
        }
        else {
            perro.update({revisado:true});
        }

        return res.status(200).json({
            success: true,
            message: "Perro successfuly verified",
            data: perro
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somenthing went wrong verifying your perro",
            error: error.message
        });
    }
}
cuidadorController.cambiarPrecioDiaPerro = async (req, res) => {
    try {
        let perroId = req.params.id;
        let precio_dia = req.body.precio_dia;
        let perro = await Perro.findByPk(perroId, {attributes:{exclude: ['createdAt']}});
        if(!perro) return res.status(400).json({
            success: false,
            message: "You're not cuidador of this perro, or maybe this perro doesn't exist",
        });
        perro.update({precio_dia: precio_dia});
        return res.status(200).json({
            success: true,
            message: "Perro successfuly updated",
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


module.exports = cuidadorController;