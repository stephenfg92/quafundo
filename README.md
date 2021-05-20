# API Quafundó

Esta aplicação é parte do projeto Quafundó, plataforma de distribuição de quizzes desenvolvida como forma de avaliação para minha possível contratação pela Cafundó.

Esta aplicação é a API do serviço de distribuição de quizzes.

## Utilização

1. Basta instalar o NodeJS versão 14.17.0 LTS, disponível no seguinte website: https://nodejs.org/

2. Com o NodeJS instalado, clone este repositório usando o comando git clone https://github.com/stephenfg92/quafundo.git. Ou, faça o download do repositório utilizando o botão "Code" disponibilizado pelo GitHub.

3. Instale o banco de dados MongoDB, disponível em https://www.mongodb.com/ , em seu sistema.

4. Utilizando o terminal de seu sistema, navegue até a pasta onde está o repositório e execute o comando `npm run dev`.

5. Utilizando os endpoints descritos em `src/routes.js` preencha o banco de dados e aproveite seus quizzes! Para melhor experiência, utilize também a interface de usuário disponibilizada em https://github.com/stephenfg92/quafundo_client .

## Configuração padrão

Por padrão, a API irá tentar uma conexão com o banco de dados utilizando a URL e porta descritas no arquivo .env, localizado na pasta raíz deste projeto. Não se esqueça de alterar estas variáveis para refletir o estado de seu ambiente de desenvolvimento.