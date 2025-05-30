// routes/evidencia.js
const express = require('express');
const router = express.Router();
const evidenciaController = require('../controllers/evidenciaController');
const authMiddleware = require('../middlewares/authMiddleware');
const autorizar = require('../middlewares/autorizar');

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
 *     summary: Cria uma nova evidência
 *     tags: [Evidências]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [descricao, tipo, id_caso]
 *             properties:
 *               descricao:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 example: "Imagem"
 *               arquivo_base64:
 *                 type: string
 *                 example: "data:image/jpeg;base64,/9j/4AAQSk..."
 *               id_caso:
 *                 type: string
 *     responses:
 *       201:
 *         description: Evidência criada com sucesso
 *       400:
 *         description: Erro de validação
 */

/**
 * @swagger
 * /api/evidencias/multiplas:
 *   post:
 *     summary: Cria múltiplas evidências de uma vez
 *     tags: [Evidências]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required: [descricao, tipo, id_caso]
 *               properties:
 *                 descricao:
 *                   type: string
 *                 tipo:
 *                   type: string
 *                 arquivo_base64:
 *                   type: string
 *                 id_caso:
 *                   type: string
 *     responses:
 *       201:
 *         description: Evidências criadas com sucesso
 *       400:
 *         description: Dados inválidos
 */

/**
 * @swagger
 * /api/evidencias:
 *   get:
 *     summary: Lista todas as evidências
 *     tags: [Evidências]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de evidências
 */

/**
 * @swagger
 * /api/evidencias/{id}:
 *   get:
 *     summary: Obtém uma evidência específica pelo ID
 *     tags: [Evidências]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evidência encontrada
 *       404:
 *         description: Evidência não encontrada

 *   put:
 *     summary: Atualiza uma evidência existente
 *     tags: [Evidências]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
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
 *               descricao:
 *                 type: string
 *               tipo:
 *                 type: string
 *               arquivo_base64:
 *                 type: string
 *     responses:
 *       200:
 *         description: Evidência atualizada com sucesso
 *       404:
 *         description: Evidência não encontrada

 *   delete:
 *     summary: Remove uma evidência específica
 *     tags: [Evidências]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
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
 *     summary: Lista evidências de um caso específico
 *     tags: [Evidências]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_caso
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de evidências do caso
 *       404:
 *         description: Nenhuma evidência encontrada para o caso
 */

/**
 * @swagger
 * /api/evidencias/todas:
 *   delete:
 *     summary: Remove todas as evidências do sistema (⚠️ somente Admin)
 *     tags: [Evidências]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Todas as evidências foram excluídas
 *       403:
 *         description: Acesso negado
 */

// 🔐 Protege todas as rotas com autenticação
router.use(authMiddleware);

// ➕ CRIAÇÃO
// POST /api/evidencias/ - Cria uma única evidência
router.post('/', autorizar('Admin', 'Perito'), evidenciaController.criarEvidencia);
// POST /api/evidencias/multiplas - Cria múltiplas evidências
router.post('/multiplas', autorizar('Admin', 'Perito'), evidenciaController.criarMultiplasEvidencias);


// 📋 LISTAGEM E DETALHE
// GET /api/evidencias/ - Lista todas as evidências (com filtros no front, se necessário)
router.get('/', autorizar('Admin', 'Perito', 'Assistente'), evidenciaController.listarEvidencias);
// GET /api/evidencias/:id - Obtém uma evidência específica pelo ID
router.get('/:id', autorizar('Admin', 'Perito', 'Assistente'), evidenciaController.obterEvidencia);
// GET /api/evidencias/caso/:id_caso - Lista evidências associadas a um caso específico
router.get('/caso/:id_caso', autorizar('Admin', 'Perito', 'Assistente'), evidenciaController.obterEvidenciasPorCaso);


// ✏️ ATUALIZAÇÃO
// PUT /api/evidencias/:id - Atualiza uma evidência existente pelo ID
router.put('/:id', autorizar('Admin', 'Perito'), evidenciaController.atualizarEvidencia);


// 🗑️ EXCLUSÃO
// DELETE /api/evidencias/:id - Remove uma evidência específica pelo ID
router.delete('/:id', autorizar('Admin'), evidenciaController.excluirEvidencia);
// DELETE /api/evidencias/todas - Exclui todas as evidências (rota perigosa, apenas Admin)
router.delete('/todas', autorizar('Admin'), evidenciaController.excluirTodasEvidencias);

module.exports = router;