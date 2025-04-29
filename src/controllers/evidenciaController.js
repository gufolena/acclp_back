// controllers/evidenciaController.js
const mongoose = require('mongoose');
const Evidencia = require('../models/evidencia');

// Função auxiliar para formatar a resposta da evidência
const formatarEvidencia = (evidencia) => {
  // Verifica se tem imagens e converte para booleanos
  const temRadiografia = evidencia.radiografia_evidencia && evidencia.radiografia_evidencia.length > 0;
  const temOdontograma = evidencia.odontograma_evidencia && evidencia.odontograma_evidencia.length > 0;
  const temDocumentos = evidencia.documentos_evidencia && evidencia.documentos_evidencia.length > 0;
  
  return {
    _id: evidencia._id,
    id_caso: evidencia.id_caso,
    endereco: {
      rua: evidencia.endereco.rua || '',
      bairro: evidencia.endereco.bairro || '',
      cep: evidencia.endereco.cep || '',
      numero: evidencia.endereco.numero || '',
      estado: evidencia.endereco.estado || '',
      cidade: evidencia.endereco.cidade || ''
    },
    radiografia: {
      existe: temRadiografia,
      observacao: evidencia.radiografia_observacao_evidencia || ''
    },
    odontograma: {
      existe: temOdontograma,
      observacao: evidencia.odontograma_observacao_evidencia || ''
    },
    documentos: {
      existe: temDocumentos,
      observacao: evidencia.documentos_observacao_evidencia || ''
    },
    data_criacao: evidencia.data_criacao_evidencia
  };
};

// @desc    Criar nova evidência
// @route   POST /api/evidencias
// @access  Private
exports.criarEvidencia = async (req, res) => {
  try {
    const {
      id_caso,
      endereco,
      radiografia_evidencia,
      radiografia_observacao_evidencia,
      odontograma_evidencia,
      odontograma_observacao_evidencia,
      documentos_evidencia,
      documentos_observacao_evidencia
    } = req.body;

    // Verificar se o caso existe usando referência indireta
    const Caso = mongoose.model('Caso');
    const casoExistente = await Caso.findById(id_caso);
    
    if (!casoExistente) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Caso não encontrado'
      });
    }

    // Criar evidência
    const evidencia = await Evidencia.create({
      id_caso,
      endereco,
      radiografia_evidencia: radiografia_evidencia || '',
      radiografia_observacao_evidencia: radiografia_observacao_evidencia || '',
      odontograma_evidencia: odontograma_evidencia || '',
      odontograma_observacao_evidencia: odontograma_observacao_evidencia || '',
      documentos_evidencia: documentos_evidencia || '',
      documentos_observacao_evidencia: documentos_observacao_evidencia || ''
    });

    res.status(201).json({
      sucesso: true,
      dados: formatarEvidencia(evidencia)
    });

  } catch (error) {
    res.status(400).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Listar todas as evidências
// @route   GET /api/evidencias
// @access  Private
exports.listarEvidencias = async (req, res) => {
  try {
    const evidencias = await Evidencia.find().populate('id_caso', 'numero');
    
    // Agrupar evidências por caso
    const evidenciasPorCaso = {};
    
    evidencias.forEach(evidencia => {
      const idCaso = evidencia.id_caso._id || evidencia.id_caso;
      const casoProprio = typeof evidencia.id_caso === 'object' ? evidencia.id_caso : { _id: evidencia.id_caso };
      
      if (!evidenciasPorCaso[idCaso]) {
        evidenciasPorCaso[idCaso] = {
          id_caso: idCaso,
          numero_caso: casoProprio.numero || 'Desconhecido',
          evidencias: []
        };
      }
      
      evidenciasPorCaso[idCaso].evidencias.push(formatarEvidencia(evidencia));
    });
    
    res.status(200).json({
      sucesso: true,
      contagem: evidencias.length,
      dados: Object.values(evidenciasPorCaso)
    });
    
  } catch (error) {
    res.status(500).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Obter evidências por ID do caso
// @route   GET /api/evidencias/caso/:id_caso
// @access  Private
exports.obterEvidenciasPorCaso = async (req, res) => {
  try {
    const evidencias = await Evidencia.find({ id_caso: req.params.id_caso }).populate('id_caso', 'numero');
    
    if (evidencias.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Nenhuma evidência encontrada para este caso'
      });
    }
    
    const evidenciasFormatadas = evidencias.map(evidencia => formatarEvidencia(evidencia));
    
    const casoProprio = typeof evidencias[0].id_caso === 'object' ? evidencias[0].id_caso : { _id: evidencias[0].id_caso };
    
    res.status(200).json({
      sucesso: true,
      contagem: evidencias.length,
      id_caso: req.params.id_caso,
      numero_caso: casoProprio.numero || 'Desconhecido',
      dados: evidenciasFormatadas
    });
    
  } catch (error) {
    res.status(500).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Obter uma evidência pelo ID
// @route   GET /api/evidencias/:id
// @access  Private
exports.obterEvidencia = async (req, res) => {
  try {
    const evidencia = await Evidencia.findById(req.params.id).populate('id_caso', 'numero');
    
    if (!evidencia) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Evidência não encontrada'
      });
    }
    
    const evidenciaFormatada = formatarEvidencia(evidencia);
    
    res.status(200).json({
      sucesso: true,
      dados: evidenciaFormatada
    });
    
  } catch (error) {
    res.status(500).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Atualizar uma evidência
// @route   PUT /api/evidencias/:id
// @access  Private
exports.atualizarEvidencia = async (req, res) => {
  try {
    const {
      endereco,
      radiografia_evidencia,
      radiografia_observacao_evidencia,
      odontograma_evidencia,
      odontograma_observacao_evidencia,
      documentos_evidencia,
      documentos_observacao_evidencia
    } = req.body;
    
    const evidencia = await Evidencia.findByIdAndUpdate(
      req.params.id,
      {
        endereco,
        radiografia_evidencia,
        radiografia_observacao_evidencia,
        odontograma_evidencia,
        odontograma_observacao_evidencia,
        documentos_evidencia,
        documentos_observacao_evidencia
      },
      { new: true, runValidators: true }
    ).populate('id_caso', 'numero');
    
    if (!evidencia) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Evidência não encontrada'
      });
    }
    
    res.status(200).json({
      sucesso: true,
      dados: formatarEvidencia(evidencia)
    });
    
  } catch (error) {
    res.status(500).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Excluir uma evidência
// @route   DELETE /api/evidencias/:id
// @access  Private
exports.excluirEvidencia = async (req, res) => {
  try {
    const evidencia = await Evidencia.findByIdAndDelete(req.params.id);
    
    if (!evidencia) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Evidência não encontrada'
      });
    }
    
    res.status(200).json({
      sucesso: true,
      mensagem: 'Evidência removida com sucesso'
    });
    
  } catch (error) {
    res.status(500).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Criar múltiplas evidências para um caso
// @route   POST /api/evidencias/multiplas
// @access  Private
exports.criarMultiplasEvidencias = async (req, res) => {
  try {
    const { id_caso, evidencias } = req.body;

    // Verificar se o caso existe usando referência indireta
    const Caso = mongoose.model('Caso');
    const casoExistente = await Caso.findById(id_caso);
    
    if (!casoExistente) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Caso não encontrado'
      });
    }

    // Adicionar id_caso a cada evidência
    const evidenciasComCaso = evidencias.map(evidencia => ({
      ...evidencia,
      id_caso
    }));

    // Criar múltiplas evidências
    const evidenciasCriadas = await Evidencia.insertMany(evidenciasComCaso);
    const evidenciasFormatadas = evidenciasCriadas.map(evidencia => formatarEvidencia(evidencia));

    res.status(201).json({
      sucesso: true,
      mensagem: `${evidenciasCriadas.length} evidências criadas com sucesso`,
      dados: evidenciasFormatadas
    });

  } catch (error) {
    res.status(400).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Excluir todas as evidências
// @route   DELETE /api/evidencias/limpar-tudo
// @access  Private
exports.excluirTodasEvidencias = async (req, res) => {
  try {
    // Confirmar a operação com um token de segurança
    const { token_confirmacao } = req.body;
    
    if (!token_confirmacao || token_confirmacao !== 'CONFIRMAR_EXCLUSAO') {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'É necessário confirmar a exclusão com o token de segurança'
      });
    }
    
    // Excluir todas as evidências
    const resultado = await Evidencia.deleteMany({});
    
    res.status(200).json({
      sucesso: true,
      mensagem: `${resultado.deletedCount} evidências foram removidas com sucesso`
    });
    
  } catch (error) {
    res.status(500).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};