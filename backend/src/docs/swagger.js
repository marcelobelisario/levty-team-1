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
        ]
    },

    apis: [
        './src/routes/*.js'
    ]
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec