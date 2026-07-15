const { Router } = require("express")

const estacionamentoRoutes = require("./src/modules/estacionamento/routes/estacionamento.routes")
const pisoRoutes = require("./src/modules/piso/routes/piso.routes")
const pessoaRoutes = require("./src/modules/pessoa/routes/pessoa.routes")
const vagaRoutes = require("./src/modules/vaga/routes/vaga.routes")
const turnoRoutes = require("./src/modules/turno/routes/turno.routes")
const veiculoRoutes = require("./src/modules/veiculo/routes/veiculo.routes")

const rotas = Router()

rotas.use('/estacionamentos', estacionamentoRoutes)
rotas.use('/pisos', pisoRoutes)
rotas.use('/pessoa', pessoaRoutes)
rotas.use('/vagas', vagaRoutes)
rotas.use('/turnos', turnoRoutes)
rotas.use('/veiculo', veiculoRoutes)

module.exports = rotas