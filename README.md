# ACCLP Backend

<div align="center">
  <h3>API para Sistema Odontológico de Perícias</h3>
  <p><em>Plataforma para gerenciamento de casos odontológicos forenses</em></p>
</div>

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Configuração](#instalação-e-configuração)
- [Modelos de Dados](#modelos-de-dados)
- [Utilizando a API](#utilizando-a-api)
- [Solução de Problemas](#solução-de-problemas)
- [Segurança](#segurança)
- [Logs e Monitoramento](#logs-e-monitoramento)
- [Suporte e Contato](#suporte-e-contato)

---

## 🔍 Visão Geral

O ACCLP Backend é uma API RESTful especializada para sistemas odontológicos periciais. A plataforma permite:

- Gerenciamento completo de casos periciais odontológicos
- Armazenamento seguro de evidências digitais (radiografias, odontogramas)
- Controle de usuários com diferentes níveis de acesso
- Documentação completa dos processos periciais

Desenvolvido para o sistema OdontoLegal, este backend oferece todas as funcionalidades necessárias para a gestão eficiente de perícias odontológicas forenses.

---

## 💻 Tecnologias

| Tecnologia | Versão | Função |
|------------|--------|--------|
| Node.js | ≥ 14.x | Ambiente de execução |
| Express | 4.18.x | Framework web |
| MongoDB | 5.x | Banco de dados |
| Mongoose | 7.5.x | ODM para MongoDB |
| JWT | 9.0.x | Autenticação |
| Swagger | 5.0.x | Documentação API |
| bcryptjs | 3.0.x | Criptografia |
| dotenv | 16.3.x | Variáveis de ambiente |

---

## 📁 Estrutura do Projeto

```
acclp_back/
│
├── node_modules/           # Dependências (geradas após instalação)
├── src/                    # Código-fonte principal
│   ├── config/             # Configurações do sistema
│   │   ├── db.js           # Conexão com MongoDB
│   │   └── swaggerConfig.js # Configuração da documentação
│   │
│   ├── controllers/        # Lógica de negócios
│   │   ├── usuarioController.js
│   │   ├── casoController.js
│   │   └── evidenciaController.js
│   │
│   ├── middlewares/        # Interceptadores de requisições
│   │   ├── authMiddleware.js  # Verificação de autenticação
│   │   └── logger.js         # Registro de logs
│   │
│   ├── models/             # Esquemas de dados
│   │   ├── usuario.js
│   │   ├── Caso.js
│   │   └── evidencia.js
│   │
│   ├── routes/             # Definição de rotas API
│   │   ├── auth.js
│   │   ├── usuario.js
│   │   ├── caso.js
│   │   └── evidencia.js
│   │
│   ├── logs/               # Arquivos de log gerados
│   └── app.js              # Ponto de entrada da aplicação
│
├── .env                    # Variáveis de ambiente (criar com base no template)
├── .env.template           # Modelo para variáveis de ambiente
├── .gitignore              # Arquivos ignorados pelo Git
├── package.json            # Dependências e scripts
└── README.md               # Esta documentação
```

---

## ⚙️ Instalação e Configuração

### Pré-requisitos

- Node.js (versão 14 ou superior)
- MongoDB (local ou Atlas)
- Git (opcional)

### Guia de Instalação Rápida

1. **Obtenha o código-fonte**

   ```bash
   git clone <url-do-repositorio>
   cd acclp_back
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure o ambiente**

   ```bash
   cp .env.template .env
   # Edite o arquivo .env com suas configurações
   ```

4. **Inicie o servidor**

   ```bash
   # Desenvolvimento (com hot-reload)
   npm run dev
   
   # Produção
   npm start
   ```

5. **Verifique o funcionamento**

   Acesse a documentação Swagger:
   ```
   "https://acclp.onrender.com"/api-docs
   ```

### Configurações Detalhadas

#### Arquivo .env

```ini
# Conexão com o banco de dados
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/database

# Configuração do servidor
PORT=5000

# Segurança
JWT_SECRET=sua-chave-secreta-complexa
```

> **Nota sobre MongoDB:** Para desenvolvimento local, use `mongodb://localhost:27017/acclp`

---

## 📊 Modelos de Dados

### Usuário (`Usuario`)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| primeiro_nome | String | Nome do usuário |
| segundo_nome | String | Sobrenome do usuário |
| nome_completo | String | Nome completo |
| data_nascimento | Date | Data de nascimento |
| email | String | Email (único) |
| senha | String | Senha (criptografada) |
| telefone | String | Contato telefônico |
| data_criacao | Date | Data de registro |
| tipo_perfil | String | Admin, Perito ou Assistente |
| foto_perfil_usuario | String | Imagem em base64 |
| cro_uf | String | Registro no Conselho |

### Caso (`Caso`)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id_caso | Number | Identificador único auto-incrementado |
| titulo_caso | String | Nome/título do caso |
| responsavel_caso | String | Responsável pela perícia |
| processo_caso | String | Número do processo judicial |
| data_abertura_caso | Date | Data de abertura |
| descricao_caso | String | Detalhes do caso |
| status_caso | String | Em andamento, Arquivado, Finalizado |
| nome_completo_vitima_caso | String | Nome da vítima |
| data_nac_vitima_caso | Date | Data de nascimento da vítima |
| sexo_vitima_caso | String | Sexo da vítima (M/F) |
| observacao_vitima_caso | String | Observações adicionais |

### Evidência (`Evidencia`)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id_caso | ObjectId | Referência ao caso |
| endereco | Object | Localização da evidência |
| data_criacao_evidencia | Date | Data de registro |
| radiografia_evidencia | String | Imagem em base64 |
| radiografia_observacao_evidencia | String | Anotações sobre radiografia |
| odontograma_evidencia | String | Imagem em base64 |
| odontograma_observacao_evidencia | String | Anotações sobre odontograma |
| documentos_evidencia | String | Arquivo em base64 |
| documentos_observacao_evidencia | String | Anotações sobre documentos |

---

## 🔌 Utilizando a API



### Endpoints Principais

#### Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/usuarios | Listar todos os usuários |
| GET | /api/usuarios/:id | Obter usuário específico |
| POST | /api/usuarios | Criar novo usuário |
| PUT | /api/usuarios/:id | Atualizar usuário |
| DELETE | /api/usuarios/:id | Remover usuário |

#### Casos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/casos | Listar todos os casos |
| GET | /api/casos/:id | Obter caso específico |
| POST | /api/casos | Criar novo caso |
| PUT | /api/casos/:id | Atualizar caso |
| DELETE | /api/casos/:id | Remover caso |

#### Evidências

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/evidencias | Listar todas as evidências |
| GET | /api/evidencias/:id | Obter evidência específica |
| POST | /api/evidencias | Criar nova evidência |
| PUT | /api/evidencias/:id | Atualizar evidência |
| DELETE | /api/evidencias/:id | Remover evidência |

> **Consulte a documentação Swagger** para exemplos detalhados de requisições e respostas.

---

## ❓ Solução de Problemas

### Problemas de Conexão com MongoDB

- **Sintoma**: Mensagem de erro "MongoDB connection failed"
- **Soluções**:
  - Verifique se a string de conexão em MONGO_URI está correta
  - Confirme se as credenciais são válidas
  - Para conexão local, verifique se o serviço MongoDB está ativo

### Erro ao Iniciar o Servidor

- **Sintoma**: Aplicação não inicia ou apresenta erros no console
- **Soluções**:
  - Certifique-se que a porta configurada (padrão 5000) está disponível
  - Verifique se todas as variáveis de ambiente estão definidas
  - Execute `npm install` novamente para garantir dependências corretas

### Problemas de Autenticação

- **Sintoma**: Erro 401 ou 403 nas requisições
- **Soluções**:
  - Verifique o formato do token JWT (deve ser `Bearer TOKEN`)
  - Confirme se o token não expirou
  - Certifique-se que está usando o JWT_SECRET correto

---

## 🔒 Segurança

- **Senhas**: Armazenadas com hash bcrypt (nunca em texto puro)
- **Autenticação**: Sistema baseado em tokens JWT com expiração
- **Autorização**: Middleware que verifica permissões por tipo de perfil
- **Dados Sensíveis**: Protegidos via variáveis de ambiente
- **Boas Práticas**:
  - Nunca compartilhe seu arquivo `.env`
  - Altere regularmente o JWT_SECRET
  - Utilize HTTPS em produção

---

## 📝 Logs e Monitoramento

O sistema implementa logs automáticos para todas as requisições:

- **Escopo**: Todas as requisições HTTP (GET, POST, PUT, DELETE)
- **Dados Registrados**:
  - Timestamp da requisição
  - Método e rota acessada
  - IP do cliente
  - Tempo de resposta (ms)
  - Código de status HTTP

Os arquivos de log são armazenados no diretório `src/logs/` no formato:
```
[2023-05-15 14:32:45] GET /api/usuarios - 200 (89ms)
```

---

## 📞 Suporte e Contato

Este projeto foi desenvolvido para o sistema odontológico OdontoLegal, com foco em perícias odontológicas e odontologia forense.

Para dúvidas técnicas ou suporte, contate a equipe de desenvolvimento através de:

- Email: odontolegal8@gmail.com
- Problemas no GitHub: [Criar uma issue](https://github.com/odontolegal/acclp_back/issues)

---

<div align="center">
  <p>Desenvolvido com ❤️ pela equipe OdontoLegal</p>
  <p>© 2025 OdontoLegal - Todos os direitos reservados</p>
</div>