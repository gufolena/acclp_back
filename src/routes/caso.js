const express = require('express');
const router = express.Router();
const casoController = require('../controllers/casoController');


/**
 * @swagger
 * tags:
 *   name: Casos
 *   description: Endpoints para gerenciamento de casos
 */

/**
 * @swagger
 * /api/casos:
 *   get:
 *     summary: Lista todos os casos
 *     tags: [Casos]
 *     responses:
 *       200:
 *         description: Lista de casos retornada com sucesso
 *   post:
 *     summary: Cria um novo caso
 *     tags: [Casos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Laudo de avaliação odontológica"
 *               descricao:
 *                 type: string
 *                 example: "Paciente com trauma facial após acidente."
 *               status:
 *                 type: string
 *                 example: "aberto"
 *               idResponsavel:
 *                 type: string
 *                 example: "123"
 *     responses:
 *       201:
 *         description: Caso criado com sucesso
 */

/**
 * @swagger
 * /api/casos/status/{status}:
 *   get:
 *     summary: Busca casos por status
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: status
 *         schema:
 *           type: string
 *         required: true
 *         description: "Status do caso (ex: aberto, fechado)"
 *     responses:
 *       200:
 *         description: Casos filtrados por status retornados
 */

/**
 * @swagger
 * /api/casos/responsavel/{idResponsavel}/status/{statusCaso}:
 *   get:
 *     summary: Busca casos por responsável e status
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: idResponsavel
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do responsável
 *       - in: path
 *         name: statusCaso
 *         schema:
 *           type: string
 *         required: true
 *         description: Status do caso
 *     responses:
 *       200:
 *         description: Casos filtrados por responsável e status retornados
 */

/**
 * @swagger
 * /api/casos/{id}:
 *   get:
 *     summary: Busca um caso por ID
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do caso
 *     responses:
 *       200:
 *         description: Caso encontrado
 *       404:
 *         description: Caso não encontrado
 *   put:
 *     summary: Atualiza um caso existente
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Caso atualizado com sucesso
 *       404:
 *         description: Caso não encontrado
 *   delete:
 *     summary: Remove um caso
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do caso
 *     responses:
 *       200:
 *         description: Caso excluído com sucesso
 *       404:
 *         description: Caso não encontrado
 */

// ROTAS DE LISTAGEM
router.get('/', casoController.buscarTodos);
router.get('/status/:status', casoController.buscarPorStatus);
router.get('/responsavel/:idResponsavel/status/:statusCaso', casoController.buscarPorResponsavelEStatus);
router.get('/:id', casoController.buscarPorId);

// ROTAS DE CRIAÇÃO
router.post('/', casoController.criar);

// ROTAS DE ATUALIZAÇÃO
router.put('/:id', casoController.atualizar);

// ROTAS DE EXCLUSÃO
router.delete('/:id', casoController.excluir);

module.exports = router;
