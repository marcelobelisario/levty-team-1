const { Router } = require('express')

const AutenticacaoController = require('../controller/AutenticacaoController')

const rotas = Router()

rotas.post('/login', AutenticacaoController.login)

module.exports = rotas
