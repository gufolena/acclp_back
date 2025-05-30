module.exports = function autorizar(...perfisPermitidos) {
  return (req, res, next) => {
    const usuario = req.usuario;

    if (!usuario || !perfisPermitidos.includes(usuario.tipo_perfil)) {
      return res.status(403).json({
        sucesso: false,
        mensagem: 'Acesso negado: perfil não autorizado'
      });
    }

    next();
  };
};
