# Modelagem do sistema de pedidos

Este documento descreve a modelagem inicial do sistema de pedidos do restaurante.

## Objetivo

O sistema permite:
- Cadastrar categorias de produtos.
- Cadastrar produtos do cardápio.
- Criar pedidos por mesa.
- Controlar o status de produção dos pedidos.

## Entidades

### Category

Representa a categoria de um produto do cardápio.

Campos:
- `_id`: identificador da categoria.
- `name`: nome da categoria.
- `icon`: ícone da categoria.

### Product

Representa um item do cardápio.

Campos:
- `_id`: identificador do produto.
- `name`: nome do produto.
- `description`: descrição do produto.
- `imagePath`: caminho ou URL da imagem.
- `price`: preço do produto.
- `ingredients`: lista de ingredientes do produto.
- `category`: referência para a categoria do produto.

Estrutura de `ingredients`:
- `icon`: ícone do ingrediente.
- `name`: nome do ingrediente.

### Order

Representa um pedido realizado no restaurante.

Campos:
- `_id`: identificador do pedido.
- `table`: identificação da mesa.
- `status`: status atual do pedido.
- `createdAt`: data de criação do pedido.
- `products`: lista de produtos do pedido.

Status possíveis:
- `WAITING`
- `IN_PRODUCTION`
- `DONE`

Estrutura de `products`:
- `product`: referência para o produto.
- `quantity`: quantidade do item no pedido.

## Relacionamentos

- Uma categoria pode ter vários produtos.
- Um produto pertence a uma categoria.
- Um pedido pode ter vários produtos.
- Um produto pode aparecer em vários pedidos.

## Regras de negócio iniciais

- Todo produto deve pertencer a uma categoria.
- Um pedido deve ter pelo menos um produto.
- O status do pedido deve seguir o fluxo:
  - `WAITING`
  - `IN_PRODUCTION`
  - `DONE`
- O preço do produto deve ser maior que zero.
- A quantidade de cada item do pedido deve ser maior que zero.

## Observações

- O banco utilizado será MongoDB.
- A modelagem será implementada com Node.js, TypeScript e Mongoose.
- Os campos podem evoluir conforme novas regras de negócio forem sendo adicionadas.
