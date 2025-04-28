// models/evidencia.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EvidenciaSchema = new Schema({
  id_caso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caso',
    required: [true, 'ID do caso é obrigatório']
  },
  // Campos de endereço
  endereco: {
    rua: {
      type: String,
      default: ''
    },
    bairro: {
      type: String,
      default: ''
    },
    cep: {
      type: String,
      default: ''
    },
    numero: {
      type: String,
      default: ''
    },
    estado: {
      type: String,
      default: ''
    },
    cidade: {
      type: String,
      default: ''
    }
  },
  data_criacao_evidencia: {
    type: Date,
    default: Date.now
  },
  // Campo para radiografia
  radiografia_evidencia: {
    type: String, // Base64
    default: ''
  },
  radiografia_observacao_evidencia: {
    type: String,
    default: ''
  },
  // Campo para odontograma
  odontograma_evidencia: {
    type: String, // Base64
    default: ''
  },
  odontograma_observacao_evidencia: {
    type: String,
    default: ''
  },
  // Campo para documentos
  documentos_evidencia: {
    type: String, // Base64
    default: ''
  },
  documentos_observacao_evidencia: {
    type: String,
    default: ''
  }
});

// Verificar se o modelo já existe antes de compilar
// Isso evita o erro "OverwriteModelError: Cannot overwrite model once compiled"
module.exports = mongoose.models.Evidencia || mongoose.model('Evidencia', EvidenciaSchema);