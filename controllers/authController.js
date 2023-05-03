const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Usuario, Tiene, Rol } = require("../models");
const authController = {};

authController.register = async (req, res) => {
    try {
        const {nombre, apellido, telefono, email, contraseña} = req.body.props;
        const encryptedPassword = bcrypt.hashSync(contraseña, 10);
        const existentEmail = await Usuario.findOne({
            where: { email: email },
            attributes: { exclude: ['nombre', 'apellido', 'telefono', 'email', 'contraseña', 'createdAt', 'updatedAt']}
        });
        let newUser;
        console.log(existentEmail)
        if(existentEmail){
            return res.status(500).json({
                success: false,
                message: "That email has already chosen by another user, try to retrieve your lost password"
            });
        }
        newUser = await Usuario.create(
        {
            nombre: nombre,
            apellido:apellido,
            telefono:telefono,
            email: email,
            contraseña:encryptedPassword
        });
        const dueño = await Rol.findOne({
            where: { rol: 'dueño' },
            attributes: { exclude: ['rol','createdAt','updatedAt']}
        });
        await Tiene.create({
            rol_id: dueño.id,
            usuario_id: newUser.id
        })
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
        });
    }
}

authController.login = async (req, res) => {
    try {
        const {email, contraseña} = req.body;
        const user = await Usuario.findOne(
            {
                where: {
                    email:email,
                }
            },
        );
        if(!user) {
            return res.status(403).json({
                success: false,
                message: "The email address or password is incorrect. Please try again.",
            }) 
        }
            //compara los passwords encryptado
        const isMatch = bcrypt.compareSync(contraseña, user.contraseña);

        if(!isMatch) {
            return res.status(403).json({
                success: false,
                message: "The email address or password is incorrect. Please try again.",
            }) 
        }
        //si no coincide return "is incorrect", si coincide entonces creame el token
        const token = jwt.sign(
            { //aqui podemos meter lo que queramos
                id: user.id
            }, 
            process.env.JWT_SECRET, //para verificar q ese token para mi aplicacion es valido, cuanto mas largo mejor
            //PARA HACER UN JWT_SECRET y guardarlo en env
            { expiresIn: '2h' }  //en 2h expire y no valga
        );
        return res.json(token);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somenthing went wrong with Login",
            error: error.message
        });
    }
}

module.exports = authController;