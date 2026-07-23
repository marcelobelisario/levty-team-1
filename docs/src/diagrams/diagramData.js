export const diagrams = [
  {
    id: "overview",
    title: "Overview",
    icon: "Home",
    type: "intro",
    content: "<h1>HubParking Architecture</h1><p>Select a diagram to view the interactive React Flow models.</p>"
  },
  {
    id: "sys-arch",
    title: "System Architecture",
    icon: "Server",
    type: "react-flow",
    layout: "TB",
    nodes: [
      { id: "admin", data: { label: "Gerente / Admin" }, type: "input" },
      { id: "driver", data: { label: "Motorista" }, type: "input" },
      
      { id: "front-group", data: { label: "Frontend Application" }, type: "group", style: { width: 220, height: 100 } },
      { id: "react", data: { label: "React 19 SPA" }, parentId: "front-group", extent: "parent", position: { x: 20, y: 40 } },
      
      { id: "back-group", data: { label: "Backend API" }, type: "group", style: { width: 220, height: 180 } },
      { id: "express", data: { label: "Node.js + Express" }, parentId: "back-group", extent: "parent", position: { x: 20, y: 40 } },
      { id: "knex", data: { label: "Knex.js Query Builder" }, parentId: "back-group", extent: "parent", position: { x: 20, y: 110 } },
      
      { id: "db-group", data: { label: "Data Storage" }, type: "group", style: { width: 220, height: 100 } },
      { id: "postgres", data: { label: "PostgreSQL DB" }, type: "output", parentId: "db-group", extent: "parent", position: { x: 20, y: 40 } },
    ],
    edges: [
      { id: "e1", source: "admin", target: "react", label: "Manages Parking", animated: true },
      { id: "e2", source: "driver", target: "react", label: "Finds & Reserves", animated: true },
      { id: "e3", source: "react", target: "express", label: "REST / JSON", animated: true },
      { id: "e4", source: "express", target: "knex", label: "DB Operations" },
      { id: "e5", source: "knex", target: "postgres", label: "SQL" }
    ]
  },
  {
    id: "components",
    title: "Component Diagram",
    icon: "Layout",
    type: "react-flow",
    layout: "LR",
    nodes: [
      { id: "client", data: { label: "Web Browser" }, type: "input" },
      
      { id: "front-group", data: { label: "React Frontend" }, type: "group", style: { width: 220, height: 260 } },
      { id: "ui", data: { label: "UI Components" }, parentId: "front-group", extent: "parent", position: { x: 20, y: 40 } },
      { id: "router", data: { label: "React Router" }, parentId: "front-group", extent: "parent", position: { x: 20, y: 110 } },
      { id: "apiclient", data: { label: "Fetch / Axios" }, parentId: "front-group", extent: "parent", position: { x: 20, y: 180 } },

      { id: "back-group", data: { label: "Express Backend" }, type: "group", style: { width: 220, height: 330 } },
      { id: "mid", data: { label: "Middlewares" }, parentId: "back-group", extent: "parent", position: { x: 20, y: 40 } },
      { id: "ctrl", data: { label: "Controllers" }, parentId: "back-group", extent: "parent", position: { x: 20, y: 110 } },
      { id: "svc", data: { label: "Services" }, parentId: "back-group", extent: "parent", position: { x: 20, y: 180 } },
      { id: "repo", data: { label: "Repositories" }, parentId: "back-group", extent: "parent", position: { x: 20, y: 250 } }
    ],
    edges: [
      { id: "e1", source: "client", target: "ui", animated: true },
      { id: "e2", source: "ui", target: "router" },
      { id: "e3", source: "router", target: "apiclient" },
      { id: "e4", source: "apiclient", target: "mid", label: "HTTP", animated: true },
      { id: "e5", source: "mid", target: "ctrl" },
      { id: "e6", source: "ctrl", target: "svc" },
      { id: "e7", source: "svc", target: "repo" }
    ]
  },
  {
    id: "backend-modules",
    title: "Backend Modules",
    icon: "Box",
    type: "react-flow",
    layout: "TB",
    nodes: [
      { id: "app", data: { label: "App.js" }, type: "input" },
      { id: "routes", data: { label: "routes.js" } },
      { id: "auth", data: { label: "Auth Module" } },
      { id: "user", data: { label: "User Module" } },
      { id: "parking", data: { label: "Parking Module" } },
      { id: "vehicle", data: { label: "Vehicle Module" } },
      { id: "res", data: { label: "Reservation Module" } },
      { id: "spot", data: { label: "Spot Module" } }
    ],
    edges: [
      { id: "e1", source: "app", target: "routes", animated: true },
      { id: "e2", source: "routes", target: "auth" },
      { id: "e3", source: "routes", target: "user" },
      { id: "e4", source: "routes", target: "parking" },
      { id: "e5", source: "routes", target: "vehicle" },
      { id: "e6", source: "routes", target: "res" },
      { id: "e7", source: "routes", target: "spot" }
    ]
  },
  {
    id: "folder-structure",
    title: "Folder Structure",
    icon: "Folder",
    type: "react-flow",
    layout: "TB",
    nodes: [
      { id: "src", data: { label: "src/" }, type: "input" },
      { id: "modules", data: { label: "modules/" } },
      { id: "mid", data: { label: "middlewares/" } },
      { id: "db", data: { label: "database/" } },
      { id: "ctrl", data: { label: "controller/" } },
      { id: "svc", data: { label: "service/" } },
      { id: "repo", data: { label: "repository/" } }
    ],
    edges: [
      { id: "e1", source: "src", target: "modules" },
      { id: "e2", source: "src", target: "mid" },
      { id: "e3", source: "src", target: "db" },
      { id: "e4", source: "modules", target: "ctrl" },
      { id: "e5", source: "modules", target: "svc" },
      { id: "e6", source: "modules", target: "repo" },
      { id: "e7", source: "ctrl", target: "svc" },
      { id: "e8", source: "svc", target: "repo" },
      { id: "e9", source: "repo", target: "db" }
    ]
  },
  {
    id: "login-flow",
    title: "Login Flow",
    icon: "Key",
    type: "mermaid",
    code: `sequenceDiagram
      actor User
      participant App as React Frontend
      participant API as /autenticacao (API)
      participant Svc as AuthService
      participant DB as Banco de Dados
      
      User->>App: Preenche Email e Senha
      App->>API: POST /autenticacao
      API->>Svc: Validar credenciais
      Svc->>DB: Buscar usuário por email
      DB-->>Svc: Retorna usuário e hash
      Svc->>Svc: Compara bcrypt(senha)
      Svc-->>API: Gera JWT Token
      API-->>App: Retorna Token + Perfil
      App-->>User: Redireciona para Dashboard`
  },
  {
    id: "vehicle-entry",
    title: "Vehicle Entry",
    icon: "LogInOut",
    type: "mermaid",
    code: `sequenceDiagram
      actor Driver
      participant App as React Frontend
      participant API as /veiculo-vaga/entrada
      participant Svc as VeiculoVagaService
      participant VagaRepo as VagaRepository
      participant DB as Banco de Dados

      Driver->>App: Registra entrada na Vaga
      App->>API: POST /entrada
      API->>Svc: Processar Entrada
      Svc->>VagaRepo: Verifica se vaga está livre
      VagaRepo->>DB: SELECT vaga
      DB-->>Svc: Vaga disponível
      Svc->>DB: INSERT veiculo_vaga (is_ativo=true)
      Svc->>DB: UPDATE vaga (is_ocupada=true)
      Svc-->>API: Sucesso
      API-->>App: Confirmação de Entrada`
  },
  {
    id: "vehicle-exit",
    title: "Vehicle Exit",
    icon: "LogOut",
    type: "mermaid",
    code: `sequenceDiagram
      actor Driver
      participant App as React Frontend
      participant API as /veiculo-vaga/saida
      participant Svc as VeiculoVagaService
      participant VagaRepo as VagaRepository
      participant DB as Banco de Dados

      Driver->>App: Registra saída da Vaga
      App->>API: PUT /saida/:id
      API->>Svc: Processar Saída
      Svc->>DB: UPDATE veiculo_vaga (is_ativo=false, hora_saida)
      Svc->>VagaRepo: Libera a vaga
      VagaRepo->>DB: UPDATE vaga (is_ocupada=false)
      DB-->>Svc: Atualização concluída
      Svc-->>API: Valor / Recibo processado
      API-->>App: Confirmação de Saída`
  },
  {
    id: "reservation",
    title: "Reservation Flow",
    icon: "Calendar",
    type: "mermaid",
    code: `sequenceDiagram
      actor Driver
      participant UI as React Frontend
      participant ResAPI as /reservas
      participant ResSvc as ReservaService
      participant DB as PostgreSQL

      Driver->>UI: Seleciona vaga e horário
      UI->>ResAPI: POST /reservas
      ResAPI->>ResSvc: Criar reserva
      ResSvc->>DB: Valida conflito
      DB-->>ResSvc: Horário livre
      ResSvc->>DB: INSERT reserva (status=pendente)
      ResSvc-->>ResAPI: Reserva criada
      ResAPI-->>UI: Confirmação
      Driver->>UI: Chega ao estacionamento
      UI->>ResAPI: PUT /reservas/:id/confirmar
      ResAPI->>DB: UPDATE reserva (status=ativa)`
  },
  {
    id: "erd",
    title: "Database ERD",
    icon: "Database",
    type: "mermaid",
    code: `erDiagram
      PESSOA ||--o{ VEICULO : possui
      PESSOA ||--o{ RESERVA : faz
      CIDADE ||--o{ PESSOA : localiza
      CIDADE ||--o{ ESTACIONAMENTO : abriga
      ESTACIONAMENTO ||--o{ PISO : contem
      PISO ||--o{ VAGA : possui
      VEICULO ||--o{ VEICULO_VAGA : ocupa
      VAGA ||--o{ VEICULO_VAGA : recebe
      VAGA ||--o{ RESERVA : reservada_para

      PESSOA { uuid id string email }
      VEICULO { uuid id string placa }
      VAGA { uuid id boolean is_ocupada }`
  },
  {
    id: "rest-api",
    title: "REST API",
    icon: "Network",
    type: "react-flow",
    layout: "LR",
    nodes: [
      { id: "client", data: { label: "Frontend App" }, type: "input" },
      { id: "gw", data: { label: "Express Router" } },
      { id: "auth", data: { label: "/autenticacao" } },
      { id: "usr", data: { label: "/pessoa" } },
      { id: "pkg", data: { label: "/estacionamentos" } },
      { id: "spt", data: { label: "/vagas" } },
      { id: "res", data: { label: "/reservas" } },
      { id: "db", data: { label: "PostgreSQL DB" }, type: "output" }
    ],
    edges: [
      { id: "e1", source: "client", target: "gw", label: "HTTP", animated: true },
      { id: "e2", source: "gw", target: "auth" },
      { id: "e3", source: "gw", target: "usr" },
      { id: "e4", source: "gw", target: "pkg" },
      { id: "e5", source: "gw", target: "spt" },
      { id: "e6", source: "gw", target: "res" },
      { id: "e7", source: "auth", target: "db" },
      { id: "e8", source: "usr", target: "db" },
      { id: "e9", source: "pkg", target: "db" },
      { id: "e10", source: "spt", target: "db" },
      { id: "e11", source: "res", target: "db" }
    ]
  }
];
