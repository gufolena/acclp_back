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
 *               titulo_caso:
 *                 type: string
 *                 example: "Laudo de avaliação odontológica"
 *               descricao_caso:
 *                 type: string
 *                 example: "Paciente com trauma facial após acidente."
 *               status_caso:
 *                 type: string
 *                 example: "Em andamento"
 *               responsavel_caso:
 *                 type: string
 *                 example: "joao123"
 *     responses:
 *       201:
 *         description: Caso criado com sucesso
 */

/**
 * @swagger
 * /api/casos/com-evidencias:
 *   post:
 *     summary: Cria um novo caso com evidências
 *     tags: [Casos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               caso:
 *                 type: object
 *                 properties:
 *                   titulo_caso:
 *                     type: string
 *                     example: "Caso com evidências"
 *                   responsavel_caso:
 *                     type: string
 *                     example: "joao123"
 *                   status_caso:
 *                     type: string
 *                     example: "Em andamento"
 *               evidencias:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     tipo:
 *                       type: string
 *                       example: "imagem"
 *                     descricao:
 *                       type: string
 *                       example: "Foto da cena do crime"
 *     responses:
 *       201:
 *         description: Caso e evidências criados com sucesso
 *       400:
 *         description: Erro na criação do caso ou evidências
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
 *         description: "Status do caso (ex: Em andamento, Finalizado, Arquivado)"
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
 *               titulo_caso:
 *                 type: string
 *               descricao_caso:
 *                 type: string
 *               status_caso:
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


// ROTAS DE CRIAÇÃO
router.post('/com-evidencias', casoController.criarCasoComEvidencias);
router.post('/', casoController.criar);

// ROTAS DE LISTAGEM (ordem importa!)
router.get('/status/:status', casoController.buscarPorStatus);
router.get('/responsavel/:idResponsavel/status/:statusCaso', casoController.buscarPorResponsavelEStatus);

// ⚠️ Adicione uma rota GET específica se quiser (ex: visualizar formulário ou metadados de criação com evidências)
// router.get('/com-evidencias', casoController.algumaFuncao); // opcional

router.get('/', casoController.buscarTodos);

// ⚠️ ROTA POR ID (DEIXAR POR ÚLTIMO SEMPRE)
router.get('/:id', casoController.buscarPorId);

// ROTAS DE ATUALIZAÇÃO
router.put('/:id', casoController.atualizar);

// ROTAS DE EXCLUSÃO
router.delete('/:id', casoController.excluir);

module.exports = router;
