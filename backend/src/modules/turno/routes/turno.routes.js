const { Router } = require('express')

const TurnoController= require('../controller/TurnoController')

const rotas = Router()

rotas.post('/', TurnoController.cadastrarTurno)
rotas.get('/:id', TurnoController.buscarTurnoPorId)
rotas.get('/', TurnoController.listarTodosTurnos)
rotas.put('/:id', TurnoController.editarTurno)
rotas.delete('/:id', TurnoController.excluirTurno)

module.exports = rotas