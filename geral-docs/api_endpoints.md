# Documentação de Endpoints da API

Abaixo está a lista completa de rotas disponíveis no sistema, juntamente com a estrutura JSON esperada para as requisições de criação (`POST`) e atualização (`PUT`).

> [!NOTE]
> Todos os endpoints `PUT` esperam a mesma estrutura de corpo (payload) que o respectivo `POST`, porém normalmente apenas com os campos que serão atualizados. Os campos marcados como **obrigatórios** referem-se à criação (`POST`).

---

## 1. Estacionamentos (`/estacionamentos`)

- `GET /estacionamentos/` - Listar todos os estacionamentos
- `GET /estacionamentos/cnpj/:cnpj` - Buscar estacionamento pelo CNPJ
- `GET /estacionamentos/id/:id` - Buscar estacionamento pelo ID
- `DELETE /estacionamentos/Excluir/:id` - Excluir um estacionamento
- `POST /estacionamentos/` - Cadastrar um novo estacionamento
- `PUT /estacionamentos/:id` - Editar um estacionamento

**Corpo JSON Esperado (`POST` / `PUT`):**
```json
{
  "nome": "Estacionamento Central",               // (Obrigatório) string
  "cnpj": "12345678901234",                       // (Obrigatório) string (14 caracteres)
  "inscricao_estadual": 123456,                   // (Opcional) integer
  "indicador_insc_estadual": 1,                   // (Obrigatório) integer
  "logradouro": "Rua das Flores",                 // (Obrigatório) string
  "bairro": "Centro",                             // (Obrigatório) string
  "numero": 123,                                  // (Obrigatório) integer
  "email": "contato@estacionamento.com",          // (Opcional) string
  "telefone": "11999999999",                      // (Opcional) string
  "ativo": true,                                  // (Opcional) boolean, default: true
  "cidade_id": "uuid-da-cidade"                   // (Obrigatório) string (UUID)
}
```

---

## 2. Pisos (`/pisos`)

- `GET /pisos/` - Listar todos os pisos
- `GET /pisos/:id` - Buscar piso pelo ID
- `GET /pisos/codigo/:codigo` - Buscar piso pelo código
- `GET /pisos/andar/:andar` - Buscar piso pelo andar
- `DELETE /pisos/:id` - Excluir um piso
- `POST /pisos/` - Cadastrar um novo piso
- `PUT /pisos/:id` - Editar um piso

**Corpo JSON Esperado (`POST` / `PUT`):**
```json
{
  "codigo": "A1",                                 // (Obrigatório) string
  "andar": 1,                                     // (Obrigatório) integer
  "nome": "Térreo",                               // (Obrigatório) string
  "vagas": 50,                                    // (Obrigatório) integer
  "estacionamento_id": "uuid-do-estacionamento"   // (Obrigatório) string (UUID)
}
```

---

## 3. Pessoas (`/pessoa`)

- `GET /pessoa/` - Listar todas as pessoas
- `GET /pessoa/:id` - Buscar pessoa pelo ID
- `DELETE /pessoa/:id` - Excluir uma pessoa
- `POST /pessoa/` - Cadastrar uma nova pessoa
- `PUT /pessoa/:id` - Editar uma pessoa

**Corpo JSON Esperado (`POST` / `PUT`):**
```json
{
  "nome": "João Silva",                           // (Obrigatório) string
  "email": "joao@email.com",                      // (Obrigatório) string (único)
  "senha": "senha-segura",                        // (Obrigatório) string
  "logradouro": "Rua das Árvores",                // (Obrigatório) string
  "bairro": "Jardim",                             // (Obrigatório) string
  "numero": 456,                                  // (Obrigatório) integer
  "complemento": "Apto 101",                      // (Opcional) string
  "cidade_id": "uuid-da-cidade",                  // (Obrigatório) string (UUID)
  "cpf": "12345678901",                           // (Obrigatório) string (único)
  "is_admin": false,                              // (Obrigatório) boolean
  "id_turno": "uuid-do-turno",                    // (Obrigatório) string (UUID)
  "estacionamento_id": "uuid-do-estacionamento"   // (Opcional) string (UUID)
}
```

---

## 4. Vagas (`/vagas`)

- `GET /vagas/` - Listar todas as vagas
- `GET /vagas/desocupadas` - Listar vagas desocupadas
- `GET /vagas/piso/:piso_id` - Listar vagas por piso
- `GET /vagas/:id` - Buscar vaga pelo ID
- `POST /vagas/` - Cadastrar uma nova vaga

**Corpo JSON Esperado (`POST`):**
```json
{
  "piso_id": "uuid-do-piso",                      // (Obrigatório) string (UUID)
  "codigo": "V01",                                // (Obrigatório) string
  "nome": "Vaga 01",                              // (Obrigatório) string
  "is_ocupada": false                             // (Obrigatório) boolean
}
```

---

## 5. Turnos (`/turnos`)

- `GET /turnos/` - Listar todos os turnos
- `GET /turnos/:id` - Buscar turno pelo ID
- `DELETE /turnos/:id` - Excluir um turno
- `POST /turnos/` - Cadastrar um novo turno
- `PUT /turnos/:id` - Editar um turno

**Corpo JSON Esperado (`POST` / `PUT`):**
```json
{
  "descricao": "Matutino",                        // (Obrigatório) string
  "inicio_em": "08:00:00",                        // (Obrigatório) time (HH:MM:SS)
  "termino_em": "12:00:00"                        // (Obrigatório) time (HH:MM:SS)
}
```

---

## 6. Veículos (`/veiculo`)

- `GET /veiculo/` - Listar todos os veículos
- `GET /veiculo/:id` - Buscar veículo pelo ID
- `GET /veiculo/placa/:placa` - Buscar veículo pela placa
- `DELETE /veiculo/:id` - Excluir um veículo
- `POST /veiculo/` - Cadastrar um novo veículo
- `PUT /veiculo/:id` - Editar um veículo

**Corpo JSON Esperado (`POST` / `PUT`):**
```json
{
  "placa": "ABC1234",                             // (Obrigatório) string (único)
  "modelo": "Civic",                              // (Opcional) string
  "marca": "Honda",                               // (Opcional) string
  "ano": "2020",                                  // (Opcional) string
  "combustivel": "Flex",                          // (Opcional) string
  "cor": "Preto",                                 // (Opcional) string
  "pessoa_id": "uuid-da-pessoa"                   // (Obrigatório) string (UUID)
}
```
