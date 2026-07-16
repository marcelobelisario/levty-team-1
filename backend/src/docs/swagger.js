const swaggerJsdoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'HubParking API',
            version: '1.0.0',
            description: "Documentação da API do sistema HubParking."
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor Local'
            }
        ],
        tags: [
            {
                name: 'Pessoa',
                description: 'Operações relacionadas às pessoas'
            }
        ],
        components: {
            schemas: {
                Pessoa: {
                    type: 'object',
                    required: [
                        'nome',
                        'cpf'
                    ],
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        nome: {
                            type: 'string',
                            example: 'João da Silva'
                        },
                        cpf: {
                            type: 'string',
                            example: '12345678901'
                        },
                        telefone: {
                            type: 'string',
                            example: '32999999999'
                        },
                        email: {
                            type: 'string',
                            example: 'joao@email.com'
                        }
                    }
                },

                Error: {
                    type: 'object',
                    properties: {
                        erro: {
                            type: 'string',
                            example: 'Pessoa não encontrada.'
                        }
                    }
                }
            }
        }
    },

    apis: [
        './src/modules/*/routes/*.js'
    ]
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec