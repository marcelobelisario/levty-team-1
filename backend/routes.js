const { Router } = require("express")

const estacionamentoRoutes = require("./src/modules/estacionamento/routes/estacionamento.routes")

const rotas = Router()

rotas.use('/estacionamentos', estacionamentoRoutes)

module.exports = rotas