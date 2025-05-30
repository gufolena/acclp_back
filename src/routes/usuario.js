const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');
const autorizar = require('../middlewares/autorizar');

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints para gerenciamento de usuários
 */

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - primeiro_nome
 *               - segundo_nome
 *               - nome_completo
 *               - data_nascimento
 *               - email
 *               - senha
 *               - tipo_perfil
 *             properties:
 *               primeiro_nome:
 *                 type: string
 *               segundo_nome:
 *                 type: string
 *               nome_completo:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *               email:
 *                 type: string
 *                 format: email
 *               senha:
 *                 type: string
 *               telefone:
 *                 type: string
 *               tipo_perfil:
 *                 type: string
 *                 enum: [Admin, Perito, Assistente]
 *               cro_uf:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Dados inválidos ou e-mail já cadastrado
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 */

/**
 * @swagger
 * /api/usuarios/por-tipo/{tipo_perfil}:
 *   get:
 *     summary: Lista usuários por tipo de perfil
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tipo_perfil
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Admin, Perito, Assistente]
 *     responses:
 *       200:
 *         description: Lista de usuários filtrados
 */

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtém um usuário pelo ID
 *     tags: [Usuários]
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
 *         description: Detalhes do usuário
 *       404:
 *         description: Usuário não encontrado

 *   put:
 *     summary: Atualiza completamente os dados de um usuário
 *     tags: [Usuários]
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
 *               primeiro_nome:
 *                 type: string
 *               segundo_nome:
 *                 type: string
 *               nome_completo:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               telefone:
 *                 type: string
 *               tipo_perfil:
 *                 type: string
 *                 enum: [Admin, Perito, Assistente]
 *               cro_uf:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado

 *   delete:
 *     summary: Remove um usuário
 *     tags: [Usuários]
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
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 */

/**
 * @swagger
 * /api/usuarios/{id}/foto:
 *   patch:
 *     summary: Atualiza a foto de perfil do usuário
 *     tags: [Usuários]
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
 *             required:
 *               - foto_base64
 *             properties:
 *               foto_base64:
 *                 type: string
 *                 example: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
 *     responses:
 *       200:
 *         description: Foto atualizada com sucesso
 *       404:
 *         description: Usuário não encontrado
 */

// 📌 ROTA PÚBLICA: Cadastro de novo usuário (sem login)
// POST /api/usuarios/ - Cria um novo usuário
router.post('/', usuarioController.cadastrarUsuario);

// 🔒 PROTEGE TODAS AS ROTAS A PARTIR DAQUI
router.use(authMiddleware);

// 🔎 LISTAGENS — Admin, Perito, Assistente
// GET /api/usuarios/ - Lista todos os usuários
router.get('/', autorizar('Admin', 'Perito', 'Assistente'), usuarioController.listarUsuarios);
// GET /api/usuarios/por-tipo/:tipo_perfil - Lista usuários por tipo de perfil
router.get('/por-tipo/:tipo_perfil', autorizar('Admin', 'Perito', 'Assistente'), usuarioController.listarUsuariosPorTipoPerfil);

// 📄 DETALHE — Admin, Perito, Assistente
// GET /api/usuarios/:id - Obtém um usuário específico pelo ID
router.get('/:id', autorizar('Admin', 'Perito', 'Assistente'), usuarioController.obterUsuario);

// ✏️ ATUALIZAÇÃO DE DADOS — Admin ou o próprio usuário (regras tratadas no controller)
// PUT /api/usuarios/:id - Atualiza os dados completos de um usuário
router.put('/:id', autorizar('Admin', 'Perito'), usuarioController.atualizarUsuario);
// PATCH /api/usuarios/:id/foto - Atualiza parcialmente um usuário (apenas a foto)
router.patch('/:id/foto', autorizar('Admin', 'Perito'), usuarioController.atualizarFotoPerfil);

// 🗑️ EXCLUSÃO — Apenas Admin
// DELETE /api/usuarios/:id - Remove um usuário pelo ID
router.delete('/:id', autorizar('Admin'), usuarioController.excluirUsuario);

module.exports = router;
