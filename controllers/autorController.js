const { Usuario, Entrada } = require("../models");
const autorController = {};

autorController.getMyEntradas = async (req, res) => {
    try {
        let myId= req.userId;
        let entradas = await Entrada.findAll({where:{ autor_id: myId }});
        return res.status(200).json({
            success: true,
            message: "My entradas successfuly retrieved",
            data: entradas
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somenthing went wrong retrieving your entradas",
            error: error.message
        });
    }
}
autorController.createEntrada = async (req, res) => {
    try {
        let myId = req.userId;
        let body = req.body;
        let newEntrada = Entrada.create({
            autor_id: myId,
            descripcion: body.descripcion,
            texto: body.texto
        });
        let sentEntrada = {
            descripcion: body.descripcion,
            texto: body.texto
        }
        if(newEntrada) return res.status(200).json({
            success: true,
            message: "Entrada successfuly created",
            data: sentEntrada
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somenthing went wrong creating your entrada",
            error: error.message
        });
    }
}
autorController.updateEntrada = async (req, res) => {
    try {
        let myId = req.userId;
        let changes = req.body.changes;
        let entradaId = req.params.id;
        let entrada = await Entrada.findByPk(entradaId);
        if (!entrada) return res.status(400).json({
            success: false,
            message: "This entrada is not yours, or maybe it doesn't exists",
        });
        entrada.update(changes);
        return res.status(200).json({
            success: true,
            message: "Entrada successfuly updated",
            data: entrada
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somenthing went wrong updating your entrada",
            error: error.message
        });
    }
}

module.exports = autorController;