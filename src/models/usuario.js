// ================ models/usuario.js ================
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  primeiro_nome: {
    type: String,
    required: [true, 'Primeiro nome é obrigatório']
  },
  segundo_nome: {
    type: String,
    required: [true, 'Segundo nome é obrigatório']
  },
  nome_completo: {
    type: String,
    required: [true, 'Nome completo é obrigatório']
  },
  data_nascimento: {
    type: Date,
    required: [true, 'Data de nascimento é obrigatória']
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, forneça um email válido']
  },
  senha: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: 6,
    select: false // Não retornar senha nas consultas
  },
  telefone: {
    type: String,
    default: ''
  },
  data_criacao: {
    type: Date,
    default: Date.now
  },
  tipo_perfil: {
    type: String,
    enum: ['Admin', 'Perito', 'Assistente'],
    required: [true, 'Tipo de perfil é obrigatório']
  },
  foto_perfil_usuario: {
    type: String, // Armazenar a imagem como String Base64
    default: '' // Valor padrão vazio
  },
  cro_uf: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);