const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config(); // Certifique-se de carregar o .env aqui também

const SECRET_KEY = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      sucesso: false,
      mensagem: 'Token não fornecido ou mal formatado' 
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.usuario = decoded; // exemplo: { id: '...', tipo_perfil: '...' }
    next();
  } catch (error) {
    return res.status(403).json({ 
      sucesso: false,
      mensagem: 'Token inválido ou expirado',
      erro: error.message
    });
  }
};

module.exports = authMiddleware;
