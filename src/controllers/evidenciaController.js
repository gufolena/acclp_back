// controllers/evidenciaController.js
const mongoose = require('mongoose');
const Evidencia = require('../models/evidencia');

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
      dados: evidencia
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
    const evidencias = await Evidencia.find();
    
    res.status(200).json({
      sucesso: true,
      contagem: evidencias.length,
      dados: evidencias
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
    const evidencias = await Evidencia.find({ id_caso: req.params.id_caso });
    
    if (evidencias.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Nenhuma evidência encontrada para este caso'
      });
    }
    
    res.status(200).json({
      sucesso: true,
      contagem: evidencias.length,
      dados: evidencias
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
    const evidencia = await Evidencia.findById(req.params.id);
    
    if (!evidencia) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Evidência não encontrada'
      });
    }
    
    res.status(200).json({
      sucesso: true,
      dados: evidencia
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
    );
    
    if (!evidencia) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Evidência não encontrada'
      });
    }
    
    res.status(200).json({
      sucesso: true,
      dados: evidencia
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

    res.status(201).json({
      sucesso: true,
      mensagem: `${evidenciasCriadas.length} evidências criadas com sucesso`,
      dados: evidenciasCriadas
    });

  } catch (error) {
    res.status(400).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};