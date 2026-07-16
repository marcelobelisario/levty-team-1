# Plano de Implementação: Swagger, JWT e Middleware Admin

Conforme alinhado, dividiremos o trabalho em **duas branches (fases)** distintas para manter o desenvolvimento organizado. 

Abaixo está a ordem de criação correta para cada uma das etapas.

---

## Branch 1: Implementação do Swagger (`feature/swagger-docs`)

Nesta branch, focaremos exclusivamente em configurar e disponibilizar a documentação da API.

### Ordem de Criação:
1. **Instalação de Dependências:**
   - Instalar `swagger-ui-express` e `swagger-jsdoc`.
2. **Configuração Base:**
   - Criar arquivo `src/docs/swagger.js` contendo as definições principais (título, versão, rotas base).
3. **Integração no App:**
   - Modificar o `app.js` para servir a interface do Swagger na rota `/api-docs`.
4. **Documentação das Rotas Existentes:**
   - Adicionar anotações JSDoc nos arquivos de rotas (ex: `pessoa.routes.js`, `vaga.routes.js`, etc.) para que os endpoints já existentes apareçam na documentação.

---

## Branch 2: Autenticação JWT e Middleware Admin (`feature/auth-middlewares`)

Esta branch lidará com a segurança da API: criar o fluxo de login para gerar o token e, em seguida, os middlewares para proteger as rotas.

### Ordem de Criação:
1. **Instalação de Dependências:**
   - Instalar `jsonwebtoken` (já possuímos o `bcrypt` instalado no `package.json`).
2. **Criação do Controller de Autenticação:**
   - Criar `src/modules/auth/controller/AuthController.js` com a função de `login`.
   - Essa função deve buscar a `pessoa` por email, verificar a `senha` com `bcrypt.compare`, e se estiver correta, gerar um token JWT contendo o `id` e a flag `is_admin`.
3. **Criação da Rota de Login:**
   - Criar `src/modules/auth/routes/auth.routes.js` (rota POST `/login`).
   - Adicionar essa nova rota no arquivo principal `routes.js`.
4. **Criação do Middleware de Autenticação (`auth.js`):**
   - Criar `src/middlewares/auth.js`.
   - Este middleware irá interceptar as requisições protegidas, ler o token no cabeçalho `Authorization`, verificar sua validade (usando o segredo do JWT) e injetar os dados do usuário em `req.user`.
5. **Criação do Middleware de Admin (`isAdmin.js`):**
   - Criar `src/middlewares/isAdmin.js`.
   - Este middleware será executado *após* o `auth.js` e simplesmente verificará se `req.user.is_admin === true` (ou equivalente no banco de dados). Caso negativo, retorna Erro 403 (Proibido).
6. **Proteção das Rotas:**
   - Adicionar os middlewares `auth` e `isAdmin` nos endpoints que requerem permissões específicas (ex: deletar ou alterar dados sensíveis).

---

## Fusão (Merge)

Após a conclusão e validação individual de cada branch, elas serão unidas na branch principal (ex: `main` ou `develop`). 
Como bônus, após o merge, podemos atualizar a documentação do Swagger para indicar quais rotas exigem o token JWT de autenticação (Bearer Auth).

## Verification Plan

- **Swagger**: Ao acessar `http://localhost:3000/api-docs`, a interface do Swagger deve ser renderizada corretamente listando os endpoints.
- **Login JWT**: Fazer um POST para `/login` com credenciais corretas deve retornar um Token JWT válido.
- **Middlewares**: Tentar acessar uma rota protegida sem token deve retornar erro `401 Unauthorized`. Tentar acessar uma rota de admin com um usuário onde `is_admin` é falso deve retornar erro `403 Forbidden`. Acesso válido deve retornar sucesso.

## User Review Required

> [!NOTE]
> Você aprova esta divisão em duas branches e a ordem das tarefas? Assim que aprovado, você pode criar e mudar para a **Branch 1 (`feature/swagger-docs`)** no seu terminal para começarmos a execução da primeira parte!
