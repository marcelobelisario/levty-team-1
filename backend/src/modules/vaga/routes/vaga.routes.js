const { Router } = require("express")

const VagaController = require('../controller/VagaController')

const rotas = Router()

/**
 * @swagger
 * /vagas:
 *   post:
 *     summary: Cadastra uma nova vaga
 *     tags: [Vaga]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *               nome:
 *                 type: string
 *               is_ocupada:
 *                 type: boolean
 *               piso_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Vaga cadastrada.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
rotas.post('/', VagaController.cadastrarVaga)

/**
 * @swagger
 * /vagas:
 *   get:
 *     summary: Lista todas as vagas
 *     tags: [Vaga]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vagas.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
rotas.get('/', VagaController.listarVagas)

/**
 * @swagger
 * /vagas/desocupadas:
 *   get:
 *     summary: Busca vagas desocupadas
 *     tags: [Vaga]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Vagas desocupadas.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
rotas.get('/desocupadas', VagaController.buscarVagasDesocupadas)

/**
 * @swagger
 * /vagas/piso/{piso_id}:
 *   get:
 *     summary: Busca vagas pelo ID do piso
 *     tags: [Vaga]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: piso_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vagas encontradas para o piso.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
rotas.get('/piso/:piso_id', VagaController.buscarVagaPorPisoId)

/**
 * @swagger
 * /vagas/{id}:
 *   get:
 *     summary: Busca vaga pelo ID
 *     tags: [Vaga]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vaga encontrada.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
rotas.get('/:id', VagaController.buscarVagaPorId)

module.exports = rotas