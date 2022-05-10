# Loja Virtual

Aplicação para controle de pontos com loja virtual.
Nela você pode cadastrar produtos e gerênciar as moedas de cada usuário que foram cadastrados.

Índice

- [Tecnologias](#Tecnologias)
- [Instalação](#Instalação)
- [Testes](#Testes)
- [Database](#Database)
- [Endpoints](#Endpoints)

# Tecnologias

- Node.js: https://nodejs.org/en/
- Express: https://expressjs.com/pt-br/
- Postgres: https://www.postgresql.org/
- Nodemon: https://github.com/remy/nodemon
- Cors: https://github.com/expressjs/cors
- Dotenv: https://github.com/motdotla/dotenv
- pm2: https://github.com/Unitech/pm2
- Eslint: https://eslint.org/docs/user-guide/getting-started
- Jest: https://jestjs.io/pt-BR/docs/getting-started
- Supertest: https://github.com/visionmedia/supertest
- Sinon: https://github.com/sinonjs/sinon

# Instalação

## Normal

`git clone https://github.com/wesleymp/loja-virtual.git`

Entra na pasta do projeto `cd loja-virtual`

Utilize o comando `npm install`

Modifique o .env.example para .env na raiz do projeto e adicione as váriaveis de ambiente

_Exemplo de como deve ficar_

```
PORT=3001

BASE_URL=http://localhost:3001

DATABASE_HOST=postgres://root:root@localhost:5432/store

SECRET_KEY=123

```

Rode o comando `npm run dev` para rodar com o nodemon ou `npm start` para rodar com o pm2.

## Docker

`git clone https://github.com/wesleymp/loja-virtual.git`

Entra na pasta do projeto `cd loja-virtual`

Modifique o .env.example para .env na raiz do projeto e adicione as váriaveis de ambiente

_Exemplo de como deve ficar_

```
PORT=3001

BASE_URL=http://localhost:3001

DATABASE_HOST=postgres://docker:docker@loja-virtual-db-1:5432/store

SECRET_KEY=123

```

Utilize o comando `docker-compose up --build`

# Testes

Caso esteja rodando a aplicação no Docker entre primeiro no container `docker exec -it loja-virtual-loja-1 bash` e rode um dos comando a baixo:

- `npm test` para rodar todos os testes
- `npm run test:unit` para rodar os testes unitários
- `npm run test:integration` para rodar os teste de integração
- `npm run test:coverage` para rodar os testes com o coverage

# Database

### Normal

Crie um banco de dados Ex: `store`

Após criar o banco de dados importar o arquivo `store.sql` que fica em `loja-virtual/sql/store.sql`

### Docker

Acesse: `http://localhost:8888` para acessar o adminer escolha o banco de dados Postgres e utilize as credenciais: `Usuário: docker / Senha: docker`

Crie um banco de dados em `Criar Base de dados`

De um nome ao banco de dados Ex: `store` e clica em Salvar

Após criar o banco de dados clique em importar e escolhe o arquivo `store.sql` que fica em `loja-virtual/sql/store.sql` e clica em Executar

# Endpoints

Todas as rotas exceto `/user` e `/login`, precisam estar autenticados para acessar.

Registro [POST]: `/user`

_Request Body:_

```json
{
  "name": "example",
  "password": "example",
  "email": "example@mail.com"
}
```

Login [POST]: `/login`

_Request Body:_

```json
{
  "email": "example@mail.com",
  "password": "example"
}
```

Produto [POST]: `/product`

_Request Body:_
Escolha a opção de `multipart/form-data` para enviar uma requisição

```
name: example
price: 20.00
image: [image-file]
```

Gerenciamento [POST]: `/management`

_Request Body:_

```json
{
  "id": 2,
  "quantity": 20.0
}
```

Usuário [GET]: `/management`

_Response Body:_

```json
{
  "data": [
    {
      "id_user": 1,
      "user_name": "admin",
      "email": "admin@mail.com",
      "coin_quantity": "0.00",
      "id_role": 1
    },
    {
      "id_user": 2,
      "user_name": "example",
      "email": "example@mail.com",
      "coin_quantity": "10.00",
      "id_role": 2
    }
  ]
}
```

Produtos [GET]: `/product`

_Response Body:_

```json
{
  "data": [
    {
      "id_product": 1,
      "product_name": "Bolo",
      "price": "12.40",
      "image_url": "http://localhost:3001/images/products/1652200492817-bolo.png"
    },
    {
      "id_product": 2,
      "product_name": "Patinete",
      "price": "52.40",
      "image_url": "http://localhost:3001/images/products/1652203750697-patinete.jpg"
    },
    {
      "id_product": 3,
      "product_name": "Sabonete",
      "price": "5.40",
      "image_url": "http://localhost:3001/images/products/1652203761988-sabonete.jpg"
    }
  ]
}
```
