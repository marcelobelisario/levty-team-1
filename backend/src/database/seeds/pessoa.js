/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  const bcrypt = require('bcrypt')

  const pessoa = await knex('pessoa')
    .where({ cpf: 12332112332 })
    .first()

  const senha = await bcrypt.hash('123456', 10)

  await knex('pessoa').insert([
    {
      nome: "USUARIO SEED",
      email: "SEED@email.com",
      senha,
      logradouro: "SD",
      bairro: "SD",
      numero: 285,
      complemento: "SD 404",
      cidade_id: "0000bd7a-a9d3-46cc-8e5c-b44f1d5fcca9",
      cpf: "12332112332",
      is_admin: false,
      id_turno: "abd6ae94-53e1-4e81-b5b5-7f265aa039b2",
      estacionamento_id: "ae3208ab-6195-49f0-8eb4-fe1ba1a79b90"
    }

  ]);
};
