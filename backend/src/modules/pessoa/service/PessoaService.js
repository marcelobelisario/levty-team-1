const PessoaRepository = require('../repository/PessoaRepository')
const bcrypt = require('bcrypt')

class PessoaService {

    async cadastrarPessoa(dados) {
        const pessoaCpfExistente = await PessoaRepository.buscarPessoaPorCpf(dados.cpf)
        if (pessoaCpfExistente) {
            throw new Error("Ops! Parece que já existe uma pessoa cadastrada com esse CPF!")
        }

        const pessoaEmailExistente = await PessoaRepository.buscarPessoaPorEmail(dados.email)
        if (pessoaEmailExistente) {
            throw new Error("Ops! Parece que já existe uma pessoa cadastrada com esse E-mail!")
        }

        if (dados.senha) {
            dados.senha = await bcrypt.hash(dados.senha, 10)
        }

        return await PessoaRepository.cadastrarPessoa(dados)
    }

    async listarTodasPessoas() {
        return await PessoaRepository.listarTodasPessoas()
    }

    async buscarPessoaPorId(id) {
        const pessoa = await PessoaRepository.buscarPessoaPorId(id)

        if (!pessoa) {
            throw new Error("Pessoa não encontrada!")
        }

        return pessoa
    }

    async editarPessoa(id, dadosPessoa) {

        const pessoa = await PessoaRepository.buscarPessoaPorId(id)

        if (!pessoa) {
            throw new Error("Pessoa não encontrada!")
        }

        if (dadosPessoa.cpf && dadosPessoa.cpf !== pessoa.cpf) {
            const pessoaCpfExistente = await PessoaRepository.buscarPessoaPorCpf(dadosPessoa.cpf)
            if (pessoaCpfExistente && pessoaCpfExistente.id !== id) {
                throw new Error("Ops! Parece que já existe uma pessoa cadastrada com esse CPF!")
            }
        }

        if (dadosPessoa.email && dadosPessoa.email !== pessoa.email) {
            const pessoaEmailExistente = await PessoaRepository.buscarPessoaPorEmail(dadosPessoa.email)
            if (pessoaEmailExistente && pessoaEmailExistente.id !== id) {
                throw new Error("Ops! Parece que já existe uma pessoa cadastrada com esse E-mail!")
            }
        }

        if (dadosPessoa.senha) {
            dadosPessoa.senha = await bcrypt.hash(dadosPessoa.senha, 10)
        }

        dadosPessoa.atualizado_em = new Date()

        await PessoaRepository.editarPessoa(id, dadosPessoa)

        return await PessoaRepository.buscarPessoaPorId(id)
    }

    async deletarPessoa(id) {

        const pessoa = await PessoaRepository.buscarPessoaPorId(id)

        if (!pessoa) {
            throw new Error("Pessoa não encontrada!")
        }

        await PessoaRepository.deletarPessoa(id)
    }

}

module.exports = new PessoaService()