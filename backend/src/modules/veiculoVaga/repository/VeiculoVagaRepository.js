const db = require('../../../database/connection')

class VeiculoVagaRepository {

    async estacionarVeiculo(dados) {
        const [registro] = await db("veiculo_vaga")
            .insert(dados)
            .returning('*')

        return registro
    }

    async listarTodos() {
        return await db("veiculo_vaga")
            .select('*')
    }

    async buscarPorId(id) {
        return db("veiculo_vaga")
            .where({ id })
            .first()
    }

    async buscarOcupacaoAtivaPorVagaId(vagaId) {
        return db("veiculo_vaga")
            .where({ vaga_id: vagaId, desocupado_em: null })
            .first()
    }

    async buscarOcupacaoAtivaPorVeiculoId(veiculoId) {
        return db("veiculo_vaga")
            .where({ veiculo_id: veiculoId, desocupado_em: null })
            .first()
    }

    async listarHistoricoPorVeiculoId(veiculoId) {
        return db("veiculo_vaga")
            .where({ veiculo_id: veiculoId })
            .select('*')
    }

    async listarHistoricoPorVagaId(vagaId) {
        return db("veiculo_vaga")
            .where({ vaga_id: vagaId })
            .select('*')
    }

    async registrarSaida(id, desocupadoEm) {
        const [registro] = await db("veiculo_vaga")
            .where({ id })
            .update({ desocupado_em: desocupadoEm })
            .returning('*')

        return registro
    }
}

module.exports = new VeiculoVagaRepository()
