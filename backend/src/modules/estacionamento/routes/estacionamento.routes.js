const { Router } = require("express")

const EstacionamentoController = require("../controller/EstacionamentoController")

const rotas = Router()

/**
 * @swagger
 * /estacionamentos:
 *   post:
 *     summary: Cadastra um novo estacionamento
 *     tags: [Estacionamento]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cnpj:
 *                 type: string
 *               inscricao_estadual:
 *                 type: integer
 *               indicador_insc_estadual:
 *                 type: integer
 *               logradouro:
 *                 type: string
 *               bairro:
 *                 type: string
 *               numero:
 *                 type: integer
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *               ativo:
 *                 type: boolean
 *               cidade_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Estacionamento cadastrado.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
rotas.post("/", EstacionamentoController.cadastrarEstacionamento)

/**
 * @swagger
 * /estacionamentos:
 *   get:
 *     summary: Lista todos os estacionamentos
 *     tags: [Estacionamento]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estacionamentos.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
rotas.get("/", EstacionamentoController.listarEstacionamentos)

/**
 * @swagger
 * /estacionamentos/cnpj/{cnpj}:
 *   get:
 *     summary: Busca estacionamento pelo CNPJ
 *     tags: [Estacionamento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cnpj
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estacionamento encontrado.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
rotas.get("/cnpj/:cnpj", EstacionamentoController.buscarEstacionamentoPorCnpj)

/**
 * @swagger
 * /estacionamentos/id/{id}:
 *   get:
 *     summary: Busca estacionamento pelo ID
 *     tags: [Estacionamento]
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
 *         description: Estacionamento encontrado.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
rotas.get("/id/:id", EstacionamentoController.buscarEstacionamentoPorId)

/**
 * @swagger
 * /estacionamentos/{id}:
 *   put:
 *     summary: Edita um estacionamento
 *     tags: [Estacionamento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cnpj:
 *                 type: string
 *               inscricao_estadual:
 *                 type: integer
 *               indicador_insc_estadual:
 *                 type: integer
 *               logradouro:
 *                 type: string
 *               bairro:
 *                 type: string
 *               numero:
 *                 type: integer
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *               ativo:
 *                 type: boolean
 *               cidade_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Estacionamento editado.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
rotas.put("/:id", EstacionamentoController.editarEstacionamento)

/**
 * @swagger
 * /estacionamentos/Excluir/{id}:
 *   delete:
 *     summary: Exclui um estacionamento
 *     tags: [Estacionamento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Estacionamento excluído.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
rotas.delete("/Excluir/:id", EstacionamentoController.excluirEstacionamento)

module.exports = rotas