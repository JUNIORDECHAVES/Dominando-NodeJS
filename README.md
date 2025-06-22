# 📦 Dominando NodeJS

Projeto backend desenvolvido com Node.js como parte do curso **Dominando Node.js** da plataforma [Dev Samurai](https://devsamurai.com.br). 
O projeto foca na construção de uma API completa, incluindo autenticação JWT, uploads de arquivos, filas para envio de e-mails, banco de dados relacional com Sequelize e MySQL, e arquitetura escalável seguindo boas práticas do mercado.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** e **Express** para o servidor
- **MySQL** com **Sequelize** como ORM
- **JWT** para autenticação de usuários
- **Yup** para validação de dados
- **Multer** para upload de arquivos
- **Nodemailer** + **Bee-Queue** + **Redis** para envio de e-mails em background
- **Sentry** para monitoramento e rastreio de erros
- **Sucrase** e **Nodemon** para ambiente de desenvolvimento
- **ESLint** e **Prettier** para padronização e qualidade de código

---

## 📁 Estrutura do Projeto
```bash
src/
├── app/
│ ├── controllers/ # Lógica dos endpoints
│ ├── middlewares/ # Interceptadores de requisições (ex: autenticação)
│ ├── models/ # Modelos Sequelize (User, File, etc.)
│ ├── services/ # Regras de negócio reutilizáveis
│ └── validators/ # Schemas de validação com Yup
├── config/ # Configurações de banco, fila, email, etc.
├── database/
│ ├── migrations/ # Scripts de criação/alteração de tabelas
│ └── seeds/ # Dados iniciais (se houver)
├── lib/
│ ├── Mail.js # Configuração e envio de e-mails
│ └── Queue.js # Processamento de filas com Bee-Queue
├── routes.js # Definição das rotas da API
└── server.js # Ponto de entrada do servidor
```

---

## ⚙️ Instalação e Configuração

### ✅ Pré-requisitos

- Node.js (>= 14)
- Yarn ou npm
- MySQL configurado e rodando
- Redis instalado (para uso com filas)

### 📦 Instalação

```bash
git clone https://github.com/JUNIORDECHAVES/Dominando-NodeJS.git
cd Dominando-NodeJS
yarn install  # ou npm install
cp .env.example .env

🛠️ Banco de Dados
yarn sequelize db:create ou npm sequelize db:create
yarn sequelize db:migrate ou  npm sequelize db:migrate

▶️ Execução da aplicação
yarn dev  ou npm run dev #Servidor de desenvolvimento
yarn queue ou npm run queue #Processador de filas
```

📌 Funcionalidades Implementadas
 Cadastro e autenticação de usuários (JWT)

 - Atualização de perfil

 - Envio de e-mails via fila com Bee-Queue

 - Validações robustas com Yup

 - Middleware de autenticação

 - Tratamento global de erros com Youch e Sentry

 - Estrutura modular baseada em MVC + Services
