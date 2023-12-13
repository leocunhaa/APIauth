# API de Autenticação

Este repositório contém um projeto de uma simples API de autenticação que foi criada usando Nodejs e Express

## Instalação

Começe clonando o repositório usando 

```bash
git clone -b Aula-7 https://github.com/Jancera/API-de-Autenticacao/tree/Aula-7
```

Use o npm para instalar as dependências 

```bash
npm install
```

## Uso

Execute **npm run dev** para que a API seja iniciada

Temos 3 endpoints, que é 

**localhost:3000/** - Aqui temos uma rota **GET** que é usada para realizar login usando um JWT que já foi cadastrado.

**localhost:3000/login** - Aqui temos uma rota **POST** para realizarmos o login usando email e senha.

**localhost:3000/criar** - Aqui temos uma rota **POST** para cadastrarmos um usuário usando email, nome e senha.

Lembre-se que todos os dados são armazenado no arquivo **dados.json**, caso você queira apagar os dados que estão armazenados, apague o arquivo **dados.json** e deixe lá somente uma lista vazia ([ ]).

## License
[MIT](https://choosealicense.com/licenses/mit/)
