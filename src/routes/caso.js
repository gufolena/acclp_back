const express = require('express');
const router = express.Router();
const casoController = require('../controllers/casoController');
const authMiddleware = require('../middlewares/authMiddleware');
const autorizar = require('../middlewares/autorizar');

/**
 * @swagger
 * tags:
 *   name: Casos
 *   description: Endpoints para gerenciamento de casos periciais
 */

/**
 * @swagger
 * /api/casos:
 *   post:
 *     summary: Cria um novo caso
 *     tags: [Casos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descricao
 *               - status
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: string
 *                 example: "Em andamento"
 *               id_responsavel:
 *                 type: string
 *     responses:
 *       201:
 *         description: Caso criado com sucesso
 *       400:
 *         description: Dados inválidos

 *   get:
 *     summary: Lista todos os casos
 *     tags: [Casos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de casos retornada com sucesso
 */

/**
 * @swagger
 * /api/casos/com-evidencias:
 *   post:
 *     summary: Cria um caso com evidências associadas
 *     tags: [Casos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               caso:
 *                 type: object
 *               evidencias:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       201:
 *         description: Caso e evidências criados com sucesso
 *       400:
 *         description: Erro nos dados fornecidos
 */

/**
 * @swagger
 * /api/casos/{id}:
 *   get:
 *     summary: Busca um caso por ID
 *     tags: [Casos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Caso encontrado
 *       404:
 *         description: Caso não encontrado
 * 
 *   put:
 *     summary: Atualiza um caso existente
 *     tags: [Casos]
 *     security:
 *       - bearerAuth: []
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
 *         description: Caso atualizado
 *       404:
 *         description: Caso não encontrado
 * 
 *   delete:
 *     summary: Remove um caso
 *     tags: [Casos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Caso removido
 *       404:
 *         description: Caso não encontrado
 */

/**
 * @swagger
 * /api/casos/status/{status}:
 *   get:
 *     summary: Lista casos por status
 *     tags: [Casos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *         example: "Finalizado"
 *     responses:
 *       200:
 *         description: Lista de casos com o status informado
 */

/**
 * @swagger
 * /api/casos/responsavel/{idResponsavel}/status/{statusCaso}:
 *   get:
 *     summary: Lista casos por responsável e status
 *     tags: [Casos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idResponsavel
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: statusCaso
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Casos filtrados retornados
 */

// ✅ Protege todas as rotas de caso
router.use(authMiddleware);

// ROTAS DE CRIAÇÃO — Apenas Admin e Perito
// POST /api/casos/ - Cria um novo caso (recurso Caso)
router.post('/', autorizar('Admin', 'Perito'), casoController.criar);
// POST /api/casos/com-evidencias - Cria um caso e suas evidências associadas (ação específica)
router.post('/com-evidencias', autorizar('Admin', 'Perito'), casoController.criarCasoComEvidencias);




// ROTAS DE LISTAGEM E DETALHE — Todos os perfis podem visualizar
// GET /api/casos/ - Lista todos os casos (recurso Caso)
router.get('/', autorizar('Admin', 'Perito', 'Assistente'), casoController.buscarTodos);
// GET /api/casos/:id - Busca um caso específico pelo ID
router.get('/:id', autorizar('Admin', 'Perito', 'Assistente'), casoController.buscarPorId);
// GET /api/casos/status/:status - Busca casos por status (filtro comum)
router.get('/status/:status', autorizar('Admin', 'Perito', 'Assistente'), casoController.buscarPorStatus);
// GET /api/casos/responsavel/:idResponsavel/status/:statusCaso - Busca casos por responsável e status (filtro específico)
router.get('/responsavel/:idResponsavel/status/:statusCaso', autorizar('Admin', 'Perito', 'Assistente'), casoController.buscarPorResponsavelEStatus);



// ROTA DE ATUALIZAÇÃO — Apenas Admin e Perito
// PUT /api/casos/:id - Atualiza um caso existente pelo ID (recurso Caso)
router.put('/:id', autorizar('Admin', 'Perito'), casoController.atualizar);



// ROTA DE EXCLUSÃO — Apenas Admin
// DELETE /api/casos/:id - Remove um caso existente pelo ID (recurso Caso)
router.delete('/:id', autorizar('Admin'), casoController.excluir);

module.exports = router;
