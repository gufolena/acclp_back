const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

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
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Maria Silva"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "maria@exemplo.com"
 *               senha:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 */

/**
 * @swagger
 * /api/usuarios/tipo/{tipo_perfil}:
 *   get:
 *     summary: Lista usuários por tipo de perfil
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: tipo_perfil
 *         schema:
 *           type: string
 *         required: true
 *         description: "Tipo de perfil do usuário (ex: admin, perito)"
 *     responses:
 *       200:
 *         description: Usuários filtrados por tipo retornados
 */

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtém dados de um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: "ID do usuário"
 *     responses:
 *       200:
 *         description: Dados do usuário retornados
 *       404:
 *         description: Usuário não encontrado
 *
 *   put:
 *     summary: Atualiza dados de um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: "ID do usuário"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *
 *   delete:
 *     summary: Remove um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID do usuário"
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 */

/**
 * @swagger
 * /api/usuarios/{id}/foto:
 *   put:
 *     summary: Atualiza a foto de perfil do usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: "ID do usuário"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               foto:
 *                 type: string
 *                 format: uri
 *                 example: "https://exemplo.com/foto.jpg"
 *     responses:
 *       200:
 *         description: Foto atualizada com sucesso
 *       404:
 *         description: Usuário não encontrado
 */

// ROTAS DE CRIAÇÃO
router.post('/', usuarioController.cadastrarUsuario);

// ROTAS DE LISTAGEM
router.get('/', usuarioController.listarUsuarios);
router.get('/tipo/:tipo_perfil', usuarioController.listarUsuariosPorTipoPerfil);
router.get('/:id', usuarioController.obterUsuario);

// ROTAS DE ATUALIZAÇÃO
router.put('/:id/foto', usuarioController.atualizarFotoPerfil);
router.put('/:id', usuarioController.atualizarUsuario);

// ROTAS DE EXCLUSÃO
router.delete('/:id', usuarioController.excluirUsuario);

module.exports = router;
