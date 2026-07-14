const { Router } = require('express')

const PisoController = require("../controller/PisoController")

const rotas = Router()

rotas.post("/", PisoController.cadastrarPiso)
rotas.get('/:id', PisoController.buscarPisoPorId)
rotas.get('/codigo/:codigo', PisoController.buscarPisoPorCodigo)
rotas.get('/', PisoController.listarTodosPisos)
rotas.get('/andar/:andar', PisoController.buscarPisoPorAndar)
rotas.put('/:id', PisoController.editarPiso)
rotas.delete('/:id', PisoController.excluirPiso)

module.exports = rotas