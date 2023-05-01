const { Usuario, Tiene, Rol, Perro } = require("../models");
const dueñoController = {};

dueñoController.getMyPerros = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}
dueñoController.getMyPerro = async (req, res) => {
    try {
        return res.json(
            {
                success: true,
                message: "Successfuly retrieved your Perro",
                data: req.params.id
            });
    } catch (error) {
        
    }
}

module.exports = dueñoController;