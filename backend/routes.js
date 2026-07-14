const { Router } = require("express")

const estacionamentoRoutes = require("./src/modules/estacionamento/routes/estacionamento.routes")
const pisoRoutes = require("./src/modules/piso/routes/piso.routes")

const rotas = Router()

rotas.use('/estacionamentos', estacionamentoRoutes)
rotas.use('/pisos', pisoRoutes)

module.exports = rotas