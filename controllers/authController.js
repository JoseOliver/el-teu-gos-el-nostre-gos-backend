const bcrypt = require('bcrypt')

const { Usuario } = require("../models");
const authController = {};

authController.register = async (req, res) => {
    try {
        const {nombre, apellido, telefono, email, contraseña} = req.body;
        const encryptedPassword = bcrypt.hashSync(contraseña, 10);
        const newUser = await Usuario.create(
        {
            nombre: nombre,
            apellido:apellido,
            telefono:telefono,
            email: email,
            contraseña:encryptedPassword
        }
        )
        return res.json(
        {
            success: true,
            message: "Register was succesful",
            data: newUser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somenthing went wrong with Register",
            error: error.message
        })
    }
}

authController.login = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = authController;