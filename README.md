# Desafio Desenvolvedor M3

## Sobre o projeto

Essa é uma execução do desafio para ser um desenvolvedor na M3, que consiste na execução de um projeto front-end com algumas funcionalidades.

---

Contato: [benvindoiago@gmail.com](mailto:benvindoiago@gmail.com?subject=Vaga%20DEV%20-%20Digital%20M3)

---

### Layout

[Figma](https://www.figma.com/file/hPfcV6VClVfkHCtje9997Q/Desafio-m3?node-id=0%3A1)

### Tecnologias:

- HTML5, CSS3, SASS;
- Javascript/Typescript;
- Nodejs;
- Git;

---

## Como usar

### Instalação

Este projeto necessita de dependencias para funcionar. Após baixar ou clonar esse repositório na sua máquina rode o comando `npm install`

### Rodando o projeto

Após a instalação das dependencias ser finalizada, utlize o comando `npm run start:gp` que irá iniciar o servidor de banco de dados na url http://localhost:5000/products e o projeto em si na url http://localhost:3000/.

---

### Funcionalidades implementadas:

- Requisição a API para obter os produtos;
- Requisação de API para montagem de filtros dinâmicos;
- Filtragem de produtos por cor, tamanho e preço;
- Adicionar produto ao carrinho:
  - Como não havia um design para uma página ou modal de lista de items me limitei apenas a incrementar o contador do carrinho;
- Carregar mais produtos:
  - Aqui achei necessário adicionar um controle que verificasse a quantidade de items que ainda poderiam ser carregados e retirar o botão de 'carregar mais' quando não houvessem mais items para ser carregados;

---

#### Observações:

- Na hora de utilizar o projeto na minha máquina o comando `npm start` não funcionou, precisei rodar os servidores em `npm run start:gp`
