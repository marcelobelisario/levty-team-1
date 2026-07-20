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
            .join('cidade', 'cidade.id', 'estacionamento.cidade_id')
            .select(
                'estacionamento.id',
                'estacionamento.nome',
                'estacionamento.cnpj',
                'estacionamento.logradouro',
                'estacionamento.bairro',
                'estacionamento.numero',
                'estacionamento.email',
                'estacionamento.telefone',
                'estacionamento.ativo',
                'estacionamento.cidade_id',
                'cidade.nome as cidade_nome',
                'cidade.uf as cidade_uf',
                'estacionamento.criado_em',
                'estacionamento.atualizado_em'
            )
            .orderBy('estacionamento.nome')
    }

    async buscarEstacionamentoPorCnpj(cnpj){
        return await db('estacionamento')
            .where({ cnpj })
            .first()
    }

    async buscarEstacionamentoPorId(id){
        return await db('estacionamento')
            .join('cidade', 'cidade.id', 'estacionamento.cidade_id')
            .select(
                'estacionamento.*',
                'cidade.nome as cidade_nome',
                'cidade.uf as cidade_uf'
            )
            .where({ 'estacionamento.id': id })
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