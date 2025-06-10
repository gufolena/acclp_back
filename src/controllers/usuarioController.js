// ================ controllers/usuarioController.js ================
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');



// @desc    Lista usuário por tipo_perfil
// @route   POST /api/usuarios/tipo/:tipo_perfil (['Em andamento', 'Arquivado', 'Finalizado'])
// @access  Public
exports.listarUsuariosPorTipoPerfil = async (req, res) => {
  try {
    const { tipo_perfil } = req.params;
    const usuarios = await Usuario.find({ tipo_perfil });

    if (usuarios.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum usuário encontrado com esse tipo de perfil." });
    }

    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar usuários por tipo de perfil.", erro: error.message });
  }
};



// @desc    Cadastrar novo usuário
// @route   POST /api/usuarios
// @access  Public
exports.cadastrarUsuario = async (req, res) => {
  try {
    const { 
      primeiro_nome, 
      segundo_nome, 
      nome_completo,
      data_nascimento, 
      email, 
      senha, 
      telefone, 
      tipo_perfil,
      cro_uf
    } = req.body;
    
    // Verificar se usuário já existe
    const usuarioExistente = await Usuario.findOne({ email });
    
    if (usuarioExistente) {
      return res.status(400).json({ 
        sucesso: false, 
        mensagem: 'Email já cadastrado' 
      });
    }
    
    // Criptografar senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);
    
    // Criar usuário
    const usuario = await Usuario.create({
      primeiro_nome,
      segundo_nome,
      nome_completo,
      data_nascimento,
      email,
      senha: senhaHash,
      telefone: telefone || '',
      tipo_perfil,
      cro_uf: cro_uf || ''
    });
    
    // Remover senha do resultado
    usuario.senha = undefined;
    
    res.status(201).json({
      sucesso: true,
      dados: usuario
    });
    
  } catch (error) {
    res.status(400).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Listar todos os usuários
// @route   GET /api/usuarios
// @access  Private
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    
    res.status(200).json({
      sucesso: true,
      contagem: usuarios.length,
      dados: usuarios
    });
    
  } catch (error) {
    res.status(500).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Obter um usuário pelo ID
// @route   GET /api/usuarios/:id
// @access  Private
exports.obterUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    
    if (!usuario) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Usuário não encontrado'
      });
    }
    
    res.status(200).json({
      sucesso: true,
      dados: usuario
    });
    
  } catch (error) {
    res.status(500).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Atualizar um usuário
// @route   PUT /api/usuarios/:id
// @access  Private
exports.atualizarUsuario = async (req, res) => {
  try {
    const { 
      primeiro_nome, 
      segundo_nome, 
      nome_completo, 
      data_nascimento, 
      email, 
      senha, 
      telefone, 
      tipo_perfil,
      cro_uf
    } = req.body;
    
    let dadosAtualizados = {
      primeiro_nome,
      segundo_nome,
      nome_completo,
      data_nascimento,
      email,
      telefone,
      tipo_perfil,
      cro_uf
    };
    
    // Se houver uma nova senha, criptografá-la
    if (senha) {
      const salt = await bcrypt.genSalt(10);
      dadosAtualizados.senha = await bcrypt.hash(senha, salt);
    }
    
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      dadosAtualizados,
      { new: true, runValidators: true }
    );
    
    if (!usuario) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Usuário não encontrado'
      });
    }
    
    // Remover senha do resultado
    usuario.senha = undefined;
    
    res.status(200).json({
      sucesso: true,
      dados: usuario
    });
    
  } catch (error) {
    res.status(500).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Excluir um usuário
// @route   DELETE /api/usuarios/:id
// @access  Private
exports.excluirUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    
    if (!usuario) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Usuário não encontrado'
      });
    }
    
    res.status(200).json({
      sucesso: true,
      mensagem: 'Usuário removido com sucesso'
    });
    
  } catch (error) {
    res.status(500).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Autenticar usuário e gerar token 
// @route   POST /api/auth/login
// @access  Public
exports.loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    // Verificar se o email existe
    const usuario = await Usuario.findOne({ email }).select('+senha');
    
    if (!usuario) {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'Credenciais inválidas'
      });
    }
    
    // Verificar se a senha está correta
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    
    if (!senhaCorreta) {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'Credenciais inválidas'
      });
    }
    
    // Remover senha do resultado
    usuario.senha = undefined;
    
    res.status(200).json({
      sucesso: true,
      mensagem: 'Login realizado com sucesso',
      dados: {
        id: usuario._id,
        primeiro_nome: usuario.primeiro_nome,
        segundo_nome: usuario.segundo_nome,
        nome: usuario.nome_completo,
        email: usuario.email,
        telefone: usuario.telefone,
        tipo_perfil: usuario.tipo_perfil,
        cro_uf: usuario.cro_uf,
        foto_perfil: usuario.foto_perfil_usuario || ''
      }
    });
    
  } catch (error) {
    res.status(500).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Atualizar foto de perfil do usuário
// @route   PUT /api/usuarios/:id/foto
// @access  Private
exports.atualizarFotoPerfil = async (req, res) => {
  try {
    const { foto_base64 } = req.body;
    
    if (!foto_base64) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Nenhuma imagem enviada'
      });
    }
    
    // Validar formato da string base64 (verificação básica)
    if (!foto_base64.startsWith('data:image')) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Formato de imagem inválido'
      });
    }
    
    // Atualizar apenas o campo da foto de perfil
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { foto_perfil_usuario: foto_base64 },
      { new: true }
    );
    
    if (!usuario) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Usuário não encontrado'
      });
    }
    
    res.status(200).json({
      sucesso: true,
      mensagem: 'Foto de perfil atualizada com sucesso',
      dados: {
        id: usuario._id,
        primeiro_nome: usuario.primeiro_nome,
        segundo_nome: usuario.segundo_nome,
        nome: usuario.nome_completo,
        email: usuario.email,
        telefone: usuario.telefone,
        tipo_perfil: usuario.tipo_perfil,
        cro_uf: usuario.cro_uf,
        foto_perfil: usuario.foto_perfil_usuario
      }
    });
    
  } catch (error) {
    console.error('Erro ao atualizar foto:', error);
    res.status(500).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};