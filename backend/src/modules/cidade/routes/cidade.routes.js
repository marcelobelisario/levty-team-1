const { Router } = require('express')

const CidadeController = require('../controller/CidadeController')

const rotas = Router()

rotas.get('/', CidadeController.buscarCidades)

module.exports = rotas
