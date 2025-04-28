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
 * /api/evidencias:
 *   post:
 *     summary: Cadastra uma nova evidência
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
 *                 example: "6438f9e0bc1f5d3a0c52df98"
 *               endereco:
 *                 type: object
 *                 properties:
 *                   rua:
 *                     type: string
 *                     example: "Rua A"
 *               radiografia_evidencia:
 *                 type: string
 *                 example: "base64string"
 *     responses:
 *       201:
 *         description: Evidência criada com sucesso
 *
 *   get:
 *     summary: Lista todas as evidências
 *     tags: [Evidências]
 *     responses:
 *       200:
 *         description: Lista de evidências retornada com sucesso
 */

/**
 * @swagger
 * /api/evidencias/caso/{id_caso}:
 *   get:
 *     summary: Lista evidências associadas a um caso específico
 *     tags: [Evidências]
 *     parameters:
 *       - in: path
 *         name: id_caso
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do caso
 *     responses:
 *       200:
 *         description: Evidências do caso retornadas com sucesso
 *       404:
 *         description: Caso não encontrado ou sem evidências
 */

/**
 * @swagger
 * /api/evidencias/multiplas:
 *   post:
 *     summary: Cadastra múltiplas evidências de uma vez
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
 *                 example: "6438f9e0bc1f5d3a0c52df98"
 *               evidencias:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     documentos_evidencia:
 *                       type: string
 *                       example: "base64string"
 *     responses:
 *       201:
 *         description: Evidências cadastradas com sucesso
 */

/**
 * @swagger
 * /api/evidencias/{id}:
 *   get:
 *     summary: Busca uma evidência pelo ID
 *     tags: [Evidências]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência
 *     responses:
 *       200:
 *         description: Evidência encontrada
 *       404:
 *         description: Evidência não encontrada
 *
 *   put:
 *     summary: Atualiza uma evidência pelo ID
 *     tags: [Evidências]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               documentos_observacao_evidencia:
 *                 type: string
 *                 example: "Nova observação"
 *     responses:
 *       200:
 *         description: Evidência atualizada com sucesso
 *       404:
 *         description: Evidência não encontrada
 *
 *   delete:
 *     summary: Remove uma evidência pelo ID
 *     tags: [Evidências]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência
 *     responses:
 *       200:
 *         description: Evidência removida com sucesso
 *       404:
 *         description: Evidência não encontrada
 */

// ⚠️ Rotas específicas primeiro
router.get('/caso/:id_caso', evidenciaController.obterEvidenciasPorCaso);
router.post('/multiplas', evidenciaController.criarMultiplasEvidencias);

// ⚙️ Rotas genéricas depois
router.post('/', evidenciaController.criarEvidencia);
router.get('/', evidenciaController.listarEvidencias);
router.get('/:id', evidenciaController.obterEvidencia);
router.put('/:id', evidenciaController.atualizarEvidencia);
router.delete('/:id', evidenciaController.excluirEvidencia);

module.exports = router;
