const jwt = require('jsonwebtoken')


const isUsuario = (req, res, next) => {

    try {
    const authorization = req.headers.authorization;

    if(!authorization) {
        return res.send('You are not logged in. Please, log in and try again.');
    }
    //bearer ira a strategy, token a jwt
    const [ strategy, token ]  = authorization.split(" ");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    //al objeto request le digo q usuario eres y q rol eres
    req.userId = decoded.id;
    next();
    }catch(error){
        return res.status(500).send(error.message)
    }
}

module.exports = isUsuario;