const db = require('../../../database/connection')

class VagaRepository {
    async cadastrarVaga(dados) {
        const [vaga] =  await db("vaga")
            .insert(dados)
            .returning('*')
    
        return vaga
    }

    async listarVagas(){
        return db("vaga")
            .select('*')
    }

    async buscarVagaPorId(id){
        return db("vaga")
            .where({ id })
            .first()
    }

    async buscarVagaPorPisoId(pisoId){
        return db("vaga")
            .where({ pisoId: pisoId })
            .select('*')
        }

    async buscarVagasDesocupadas(){
        return db("vaga")
            .where({ is_ocupada: false })
            .select("*")
    }
}

module.exports = new VagaRepository()