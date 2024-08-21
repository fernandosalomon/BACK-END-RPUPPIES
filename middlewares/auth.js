const jwt = require('jsonwebtoken');

module.exports = (rol) => (req, res, next) => {
    try {
        const token = req.header('auth');
        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        const verificarToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token verificado:', verificarToken);

        if (verificarToken.rol !== rol) {
            return res.status(403).json({ message: 'No autorizado' });
        }

        next();

    } catch (error) {
        console.error('Error en la verificación del token:', error);
    }
}
