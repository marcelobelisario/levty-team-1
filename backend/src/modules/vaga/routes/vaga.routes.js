const { Router } = require("express")

const VagaController = require('../controller/VagaController')

const rotas = Router()

rotas.post('/', VagaController.cadastrarVaga)
rotas.get('/', VagaController.listarVagas)

rotas.get('/desocupadas', VagaController.buscarVagasDesocupadas)
rotas.get('/piso/:piso_id', VagaController.buscarVagaPorPisoId)
rotas.get('/:id', VagaController.buscarVagaPorId)

module.exports = rotas