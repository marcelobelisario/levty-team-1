const { Router } = require('express')

const PessoaController = require('../controller/PessoaController')

const rotas = Router()

rotas.post('/', PessoaController.cadastrarPessoa)
rotas.get('/', PessoaController.listarTodasPessoas)
rotas.get('/:id', PessoaController.buscarPessoaPorId)
rotas.put('/:id', PessoaController.editarPessoa)
rotas.delete('/:id', PessoaController.deletarPessoa)

module.exports = rotas