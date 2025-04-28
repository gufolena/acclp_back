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
 *                 sucesso:
 *                   type: boolean
 *                   example: true
 *                 mensagem:
 *                   type: string
 *                   example: Login realizado com sucesso
 *                 dados:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "662d99df4a3791a3440b98a7"
 *                     primeiro_nome:
 *                       type: string
 *                       example: João
 *                     segundo_nome:
 *                       type: string
 *                       example: Silva
 *                     nome:
 *                       type: string
 *                       example: João Silva
 *                     email:
 *                       type: string
 *                       example: joao@exemplo.com
 *                     telefone:
 *                       type: string
 *                       example: "11999999999"
 *                     tipo_perfil:
 *                       type: string
 *                       example: Perito
 *                     cro_uf:
 *                       type: string
 *                       example: SP-12345
 *                     foto_perfil:
 *                       type: string
 *                       example: "https://exemplo.com/foto.jpg"
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno no servidor
 */

// ROTA DE AUTENTICAÇÃO
router.post('/login', loginUsuario);

module.exports = router;
