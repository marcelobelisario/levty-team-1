const { Router } = require("express")

const VeiculoVagaController = require('../controller/VeiculoVagaController')

const rotas = Router()

rotas.post('/', VeiculoVagaController.estacionarVeiculo)
rotas.get('/', VeiculoVagaController.listarTodos)
rotas.put('/saida/:id', VeiculoVagaController.registrarSaida)
rotas.get('/veiculo/:veiculo_id', VeiculoVagaController.listarHistoricoPorVeiculo)
rotas.get('/vaga/:vaga_id', VeiculoVagaController.listarHistoricoPorVaga)
rotas.get('/:id', VeiculoVagaController.buscarPorId)

module.exports = rotas
