const express = require('express');
const router = express.Router();

const { loginUsuario } = require('../controllers/usuarioController');

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints relacionados à autenticação de usuários
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@exemplo.com
 *               senha:
 *                 type: string
 *                 example: minhaSenha123
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123"
 *                     nome:
 *                       type: string
 *                       example: "João Silva"
 *                     email:
 *                       type: string
 *                       example: "usuario@exemplo.com"
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno no servidor
 */

// ROTA DE AUTENTICAÇÃO
router.post('/login', loginUsuario);

module.exports = router;
