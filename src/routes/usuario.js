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
 *                 example: "Maria"
 *               segundo_nome:
 *                 type: string
 *                 example: "Silva"
 *               nome_completo:
 *                 type: string
 *                 example: "Maria Silva"
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "maria@exemplo.com"
 *               senha:
 *                 type: string
 *                 example: "senha123"
 *               telefone:
 *                 type: string
 *                 example: "(11) 99999-9999"
 *               tipo_perfil:
 *                 type: string
 *                 enum: [Admin, Perito, Assistente]
 *                 example: "Perito"
 *               cro_uf:
 *                 type: string
 *                 example: "SP-12345"
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Email já cadastrado ou dados inválidos
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
 *         description: "Tipo de perfil do usuário (ex: Admin, Perito, Assistente)"
 *     responses:
 *       200:
 *         description: Usuários filtrados por tipo retornados com sucesso
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
 *         description: ID do usuário
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
 *         description: ID do usuário
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
 *         description: ID do usuário
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
 *         description: ID do usuário
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
