const EstacionamentoRepository = require("../repository/EstacionamentoRepository")

class EstacionamentoService {
    async criarEstacionamento(dados) {
        const estacionamentoExistente =  await EstacionamentoRepository.buscarEstacionamentoPorCnpj(dados.cnpj)

        if(estacionamentoExistente) {
            throw new Error("Ops! Parece que já existe um estacionamento cadastrado com  esse CNPJ!")
        }
        return await EstacionamentoRepository.criarEstacionamento(dados)
    }

    async listarEstacionamentos(){
        return await EstacionamentoRepository.listarTodosEstacionamentos()
    }

    async buscarEstacionamentoPorId(id){
        const estacionamentoExistente = await EstacionamentoRepository.buscarEstacionamentoPorId(id)

        if(!estacionamentoExistente){
            throw new Error("Ops! Estacioanmento não encontrado.")
        }

        return estacionamentoExistente
    }

    async buscarEstacionamentoPorCnpj(cnpj){
        const estacionamentoExistente = await EstacionamentoRepository.buscarEstacionamentoPorCnpj(cnpj)

        if (!estacionamentoExistente) {
            throw new Error("Ops! Estacionamento não encontrado para esse CNPJ.")
        }

        return estacionamentoExistente
    }

    async editarEstacionamento(id, dados) {
        const estacionamentoExistente = await EstacionamentoRepository.buscarEstacionamentoPorId(id)

        if(!estacionamentoExistente) {
            throw new Error("Ops! Estacionamento não encontrado.")
        }

        if(dados.cnpj && dados.npj !== estacionamentoExistente.cnpj) {
            const outro = await EstacionamentoRepository.buscarEstacionamentoPorCnpj(dados.cnpj)
        
            if(outro){
                throw new Error("Já existe um estacionamento com esse CNPJ.")
            }
        }
        

        return await EstacionamentoRepository.editarEstacionamento(id, dados)
    }

    async excluirEstacionamento(id){
        const estacionamentoExistente = await EstacionamentoRepository.buscarEstacionamentoPorId(id)

        if(!estacionamentoExistente) {
            throw new Error('Estacionamento não encontrado.')
        }

        return await EstacionamentoRepository.excluirEstacionamento(id)
    }
}

module.exports = new EstacionamentoService()