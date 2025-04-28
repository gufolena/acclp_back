const jwt = require('jsonwebtoken');

// Chave secreta (ideal armazenar em variável de ambiente)
const SECRET_KEY = process.env.JWT_SECRET || 'sua_chave_secreta_aqui';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ mensagem: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ mensagem: 'Token inválido ou mal formatado' });
    }

    try {
        const payload = jwt.verify(token, SECRET_KEY);
        req.usuario = payload; // agora você pode acessar o ID ou perfil do usuário aqui
        next();
    } catch (err) {
        return res.status(403).json({ mensagem: 'Token inválido ou expirado' });
    }
};

module.exports = authMiddleware;
