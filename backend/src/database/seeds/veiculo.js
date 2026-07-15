/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  const pessoa = await knex('pessoa')
    .where({ cpf: 12332112332 })
    .first()

  await knex('veiculo')
    .insert([
      {
        placa: 'ABC1D23',
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2022,
        combustivel: 'Flex',
        cor: 'Preto',
        pessoa_id: pessoa.id
      }
    ])

};
