// routes/evidencia.js
const express = require('express');
const router = express.Router();
const evidenciaController = require('../controllers/evidenciaController');

/**
 * @swagger
 * tags:
 *   name: Evidências
 *   description: Endpoints para gerenciamento de evidências
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Endereco:
 *       type: object
 *       properties:
 *         rua:
 *           type: string
 *         bairro:
 *           type: string
 *         cep:
 *           type: string
 *         numero:
 *           type: string
 *         estado:
 *           type: string
 *         cidade:
 *           type: string
 *     EvidenciaInput:
 *       type: object
 *       required:
 *         - id_caso
 *       properties:
 *         id_caso:
 *           type: string
 *         endereco:
 *           $ref: '#/components/schemas/Endereco'
 *         radiografia_evidencia:
 *           type: string
 *           description: Imagem em base64
 *         radiografia_observacao_evidencia:
 *           type: string
 *         odontograma_evidencia:
 *           type: string
 *           description: Imagem em base64
 *         odontograma_observacao_evidencia:
 *           type: string
 *         documentos_evidencia:
 *           type: string
 *           description: Documentos em base64
 *         documentos_observacao_evidencia:
 *           type: string
 *     EvidenciaFormatada:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         id_caso:
 *           type: string
 *         endereco:
 *           $ref: '#/components/schemas/Endereco'
 *         radiografia:
 *           type: object
 *           properties:
 *             existe:
 *               type: boolean
 *             observacao:
 *               type: string
 *         odontograma:
 *           type: object
 *           properties:
 *             existe:
 *               type: boolean
 *             observacao:
 *               type: string
 *         documentos:
 *           type: object
 *           properties:
 *             existe:
 *               type: boolean
 *             observacao:
 *               type: string
 *         data_criacao:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/evidencias:
 *   post:
 *     summary: Criar uma nova evidência
 *     tags: [Evidências]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EvidenciaInput'
 *     responses:
 *       201:
 *         description: Evidência criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EvidenciaFormatada'
 *
 *   get:
 *     summary: Listar todas as evidências (agrupadas por caso)
 *     tags: [Evidências]
 *     responses:
 *       200:
 *         description: Lista de evidências
 */

/**
 * @swagger
 * /api/evidencias/{id}:
 *   get:
 *     summary: Obter uma evidência pelo ID
 *     tags: [Evidências]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes da evidência
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EvidenciaFormatada'
 *       404:
 *         description: Evidência não encontrada
 *
 *   put:
 *     summary: Atualizar uma evidência
 *     tags: [Evidências]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EvidenciaInput'
 *     responses:
 *       200:
 *         description: Evidência atualizada com sucesso
 *
 *   delete:
 *     summary: Excluir uma evidência
 *     tags: [Evidências]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evidência excluída com sucesso
 */

/**
 * @swagger
 * /api/evidencias/caso/{id_caso}:
 *   get:
 *     summary: Obter todas as evidências de um caso específico
 *     tags: [Evidências]
 *     parameters:
 *       - in: path
 *         name: id_caso
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de evidências para o caso
 *       404:
 *         description: Nenhuma evidência encontrada
 */

/**
 * @swagger
 * /api/evidencias/multiplas:
 *   post:
 *     summary: Criar múltiplas evidências para um caso
 *     tags: [Evidências]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_caso:
 *                 type: string
 *               evidencias:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/EvidenciaInput'
 *     responses:
 *       201:
 *         description: Evidências criadas com sucesso
 */

/**
 * @swagger
 * /api/evidencias/limpar-tudo:
 *   delete:
 *     summary: Excluir todas as evidências com confirmação
 *     tags: [Evidências]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token_confirmacao:
 *                 type: string
 *                 example: CONFIRMAR_EXCLUSAO
 *     responses:
 *       200:
 *         description: Todas as evidências foram removidas com sucesso
 *       400:
 *         description: Token de confirmação inválido
 */


// IMPORTANTE: Rotas específicas ANTES das rotas com parâmetros (:id)
// Rota para excluir todas as evidências (Limpar tabela)
router.delete('/limpar-tudo', evidenciaController.excluirTodasEvidencias);

// Rotas adicionais específicas
router.get('/caso/:id_caso', evidenciaController.obterEvidenciasPorCaso);
router.post('/multiplas', evidenciaController.criarMultiplasEvidencias);

// Rotas básicas CRUD com parâmetros
router.post('/', evidenciaController.criarEvidencia);
router.get('/', evidenciaController.listarEvidencias);
router.get('/:id', evidenciaController.obterEvidencia);
router.put('/:id', evidenciaController.atualizarEvidencia);
router.delete('/:id', evidenciaController.excluirEvidencia);

module.exports = router;