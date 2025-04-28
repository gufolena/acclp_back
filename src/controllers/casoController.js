// controllers/casoController.js
const mongoose = require('mongoose');
const Caso = require('../models/Caso');

// Buscar todos os casos
exports.buscarTodos = async (req, res) => {
  try {
    const casos = await Caso.find();
    res.status(200).json({ success: true, data: casos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Buscar caso por ID
exports.buscarPorId = async (req, res) => {
  try {
    const caso = await Caso.findOne({ id_caso: req.params.id });
    
    if (!caso) {
      return res.status(404).json({ success: false, error: 'Caso não encontrado' });
    }
    
    res.status(200).json({ success: true, data: caso });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Criar novo caso
exports.criar = async (req, res) => {
  try {
    const { 
      titulo_caso, 
      responsavel_caso,
      processo_caso,
      data_abertura_caso,
      descricao_caso,
      status_caso,
      // Novos campos da vítima
      nome_completo_vitima_caso,
      data_nac_vitima_caso,
      sexo_vitima_caso,
      observacao_vitima_caso
    } = req.body;
    
    if (!titulo_caso || !responsavel_caso) {
      return res.status(400).json({ 
        success: false, 
        error: 'Por favor, forneça pelo menos título e responsável pelo caso' 
      });
    }
    
    // Verificar se o sexo da vítima é válido, se fornecido
    if (sexo_vitima_caso && !['M', 'F', ''].includes(sexo_vitima_caso)) {
      return res.status(400).json({
        success: false,
        error: 'Sexo inválido. Use: M para masculino ou F para feminino'
      });
    }
    
    // Encontrar o último id_caso para incrementá-lo
    let ultimoIdCaso = 0;
    const ultimoCaso = await Caso.findOne().sort({ id_caso: -1 });
    if (ultimoCaso) {
      ultimoIdCaso = ultimoCaso.id_caso;
    }
    
    const novoCaso = new Caso({
      id_caso: ultimoIdCaso + 1, // Define o id_caso manualmente
      titulo_caso,
      responsavel_caso,
      processo_caso,
      data_abertura_caso: data_abertura_caso || Date.now(),
      descricao_caso,
      status_caso: status_caso || 'Em andamento',
      // Novos campos da vítima
      nome_completo_vitima_caso,
      data_nac_vitima_caso,
      sexo_vitima_caso,
      observacao_vitima_caso
    });
    
    await novoCaso.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Caso criado com sucesso', 
      data: novoCaso 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Atualizar caso
exports.atualizar = async (req, res) => {
  try {
    const { 
      titulo_caso, 
      responsavel_caso,
      processo_caso,
      data_abertura_caso,
      descricao_caso,
      status_caso,
      // Novos campos da vítima
      nome_completo_vitima_caso,
      data_nac_vitima_caso,
      sexo_vitima_caso,
      observacao_vitima_caso
    } = req.body;

    // Verifica se o status é válido
    if (status_caso && !['Em andamento', 'Arquivado', 'Finalizado'].includes(status_caso)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Status inválido. Use: Em andamento, Arquivado ou Finalizado' 
      });
    }
    
    // Verificar se o sexo da vítima é válido, se fornecido
    if (sexo_vitima_caso && !['M', 'F', ''].includes(sexo_vitima_caso)) {
      return res.status(400).json({
        success: false,
        error: 'Sexo inválido. Use: M para masculino ou F para feminino'
      });
    }
    
    const casoAtualizado = await Caso.findOneAndUpdate(
      { id_caso: req.params.id },
      { 
        titulo_caso, 
        responsavel_caso,
        processo_caso,
        data_abertura_caso,
        descricao_caso,
        status_caso,
        // Novos campos da vítima
        nome_completo_vitima_caso,
        data_nac_vitima_caso,
        sexo_vitima_caso,
        observacao_vitima_caso
      },
      { new: true, runValidators: true }
    );
    
    if (!casoAtualizado) {
      return res.status(404).json({ success: false, error: 'Caso não encontrado' });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Caso atualizado com sucesso', 
      data: casoAtualizado 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Excluir caso
exports.excluir = async (req, res) => {
  try {
    const caso = await Caso.findOneAndDelete({ id_caso: req.params.id });
    
    if (!caso) {
      return res.status(404).json({ success: false, error: 'Caso não encontrado' });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Caso excluído com sucesso' 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Buscar casos por status
exports.buscarPorStatus = async (req, res) => {
  try {
    const { status } = req.params;
    
    // Verifica se o status é válido
    if (!['Em andamento', 'Arquivado', 'Finalizado'].includes(status)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Status inválido. Use: Em andamento, Arquivado ou Finalizado' 
      });
    }
    
    const casos = await Caso.find({ status_caso: status });
    
    res.status(200).json({ 
      success: true, 
      data: casos 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Criar caso com evidências
// @route   POST /api/casos/com-evidencias
// @access  Private
exports.criarCasoComEvidencias = async (req, res) => {
  // Iniciar uma sessão para transação
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { caso, evidencias } = req.body;
    
    // Criar o caso
    const novoCaso = await Caso.create([caso], { session });
    
    // Verificar se o caso foi criado
    if (!novoCaso || novoCaso.length === 0) {
      throw new Error('Falha ao criar o caso');
    }
    
    const casoId = novoCaso[0]._id;
    
    if (evidencias && evidencias.length > 0) {
      // Carregar o modelo de Evidencia
      const Evidencia = mongoose.model('Evidencia');
      
      // Preparar as evidências com o ID do caso
      const evidenciasComCaso = evidencias.map(evidencia => ({
        ...evidencia,
        id_caso: casoId
      }));
      
      // Criar as evidências
      const novasEvidencias = await Evidencia.create(evidenciasComCaso, { session });
      
      // Confirmar a transação
      await session.commitTransaction();
      session.endSession();
      
      res.status(201).json({
        sucesso: true,
        mensagem: 'Caso e evidências criados com sucesso',
        dados: {
          caso: novoCaso[0],
          evidencias: novasEvidencias
        }
      });
    } else {
      // Se não houver evidências, apenas confirmar a transação do caso
      await session.commitTransaction();
      session.endSession();
      
      res.status(201).json({
        sucesso: true,
        mensagem: 'Caso criado com sucesso',
        dados: {
          caso: novoCaso[0]
        }
      });
    }
    
  } catch (error) {
    // Abortar a transação em caso de erro
    await session.abortTransaction();
    session.endSession();
    
    res.status(400).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// Buscar casos por responsável e status
exports.buscarPorResponsavelEStatus = async (req, res) => {
  try {
    const { idResponsavel, statusCaso } = req.params;
    
    // Verificar se o status é válido
    if (!['Em andamento', 'Arquivado', 'Finalizado'].includes(statusCaso)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Status inválido. Use: Em andamento, Arquivado ou Finalizado' 
      });
    }
    
    // Log para depuração
    console.log(`Buscando casos com responsável: ${idResponsavel} e status: ${statusCaso}`);
    
    // Buscar casos onde o responsável é o ID fornecido e o status corresponde
    const casos = await Caso.find({ 
      responsavel_caso: idResponsavel,
      status_caso: statusCaso 
    });
    
    // Log do resultado para depuração
    console.log(`Total de casos encontrados: ${casos.length}`);
    
    res.status(200).json({ 
      success: true, 
      data: casos 
    });
  } catch (error) {
    console.error('Erro ao buscar casos por responsável e status:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};