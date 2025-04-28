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
 *               descricao:
 *                 type: string
 *                 example: "Impressão digital encontrada na cena"
 *               id_caso:
 *                 type: string
 *                 example: "6438f9e0bc1f5d3a0c52df98"
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
 *               descricao:
 *                 type: string
 *                 example: "Atualização da descrição"
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
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 descricao:
 *                   type: string
 *                   example: "Amostra de sangue coletada"
 *                 id_caso:
 *                   type: string
 *                   example: "6438f9e0bc1f5d3a0c52df98"
 *     responses:
 *       201:
 *         description: Evidências cadastradas com sucesso
 */

// Rotas básicas CRUD
router.post('/', evidenciaController.criarEvidencia);
router.get('/', evidenciaController.listarEvidencias);
router.get('/:id', evidenciaController.obterEvidencia);
router.put('/:id', evidenciaController.atualizarEvidencia);
router.delete('/:id', evidenciaController.excluirEvidencia);

// Rotas adicionais
router.get('/caso/:id_caso', evidenciaController.obterEvidenciasPorCaso);
router.post('/multiplas', evidenciaController.criarMultiplasEvidencias);

module.exports = router;
