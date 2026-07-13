const { Router } = require("express")

const EstacionamentoController = require("../controller/EstacionamentoController")

const rotas = Router()

rotas.post("/", EstacionamentoController.cadastrarEstacionamento)
rotas.get("/", EstacionamentoController.listarEstacionamentos)
rotas.get("/cnpj/:cnpj", EstacionamentoController.buscarEstacionamentoPorCnpj)
rotas.get("/id/:id", EstacionamentoController.buscarEstacionamentoPorId)
rotas.put("/:id", EstacionamentoController.editarEstacionamento)
rotas.delete("/Excluir/:id", EstacionamentoController.excluirEstacionamento)

module.exports = rotas