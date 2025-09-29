# Testes Automatizados com Playwright

Este projeto contém testes automatizados end-to-end utilizando Playwright para o Portal.

## Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 18 ou superior)
-   [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Instalação

1.  Instale as dependências:

    ```sh
    npm install
    ```

## Configuração

Antes de executar os testes, você precisa configurar as credenciais e os ambientes.

1.  Remova o '.example' do arquivo `fixtures/environments.json.example`:

2.  Edite o arquivo `fixtures/environments.json` com as informações necessárias.

## Executando os Testes

-   **Executar todos os testes em modo headless:**

    ```sh
    npm test
    ```

-   **Executar os testes no modo de interface do usuário (UI Mode):**

    ```sh
    npm run ui
    ```

-   **Executar apenas os testes de autenticação:**

    ```sh
    npm run auth
    ```