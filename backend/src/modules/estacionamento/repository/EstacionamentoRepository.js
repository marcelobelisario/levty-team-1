const db = require("../../../database/connection")

class EstacionamentoRepository {
    async criarEstacionamento(dados) {
        const [estacionamento] = await db("estacionamento")
            .insert(dados)
            .returning('*')

        return estacionamento
    }

    async listarTodosEstacionamentos() {
        return await db('estacionamento')
            .select('*')
    }

    async buscarEstacionamentoPorCnpj(cnpj){
        return await db('estacionamento')
            .where({ cnpj })
            .first()
    }

    async buscarEstacionamentoPorId(id){
        return await db('estacionamento')
            .where({ id })
            .first()
    }

    async editarEstacionamento(id, dados){
        const [estacionamento] = await db('estacionamento')
            .where({ id })
            .update({
                ...dados,
                atualizado_em: db.fn.now(),
            })
            .returning('*')

        return estacionamento
    }

    async excluirEstacionamento(id){
        return await db('estacionamento')
            .where({ id })
            .del()
    }
}

module.exports = new EstacionamentoRepository()