const { Router } = require('express')

const VeiculoController = require('../controller/VeiculoController')

const rotas = Router()

rotas.post('/', VeiculoController.cadastrarVeiculo)
rotas.get('/', VeiculoController.listarTodosVeiculos)
rotas.get('/:id', VeiculoController.buscarVeiculoPorId)
rotas.get('/placa/:placa', VeiculoController.buscarVeiculoPorPlaca)
rotas.put('/:id', VeiculoController.editarVeiculo)
rotas.delete('/:id', VeiculoController.deletarVeiculo)

module.exports = rotas