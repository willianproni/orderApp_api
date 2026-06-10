# Waiter App — API

API REST para gerenciamento de pedidos de um restaurante. Atende dois fluxos principais: o **app do atendimento/cliente**, que consulta o cardápio e envia pedidos por mesa, e o **app da cozinha**, que acompanha e atualiza o status de produção dos pedidos.

## Diagrama

<img width="972" height="541" alt="image" src="https://github.com/user-attachments/assets/824ac370-d06e-4ffa-bc4c-7190e2b0e67a" />

## Stack

- Node.js + TypeScript
- Express
- MongoDB + Mongoose
- Multer (upload de imagens)

## Como rodar

**Pré-requisitos:** Node.js, MongoDB rodando em `mongodb://localhost:27017`

```bash
yarn install
yarn dev
```

A API sobe em `http://localhost:3001`.

Imagens enviadas ficam disponíveis em `http://localhost:3001/uploads/{nomeDoArquivo}`.

## Entidades

### Category

| Campo  | Tipo   | Obrigatório |
|--------|--------|-------------|
| `name` | string | sim         |
| `icon` | string | sim         |

### Product

| Campo         | Tipo     | Obrigatório |
|---------------|----------|-------------|
| `name`        | string   | sim         |
| `description` | string   | sim         |
| `imagePath`   | string   | sim         |
| `price`       | number   | sim         |
| `ingredients` | array    | sim         |
| `category`    | ObjectId | sim         |

Estrutura de `ingredients`:

```json
{ "name": "Queijo", "icon": "cheese" }
```

### Order

| Campo       | Tipo     | Obrigatório | Observação                          |
|-------------|----------|-------------|-------------------------------------|
| `table`     | string   | sim         | Identificação da mesa               |
| `status`    | string   | —           | Default `WAITING`                   |
| `createdAt` | date     | —           | Gerado automaticamente              |
| `products`  | array    | sim         | Lista de itens do pedido            |

Status possíveis: `WAITING` → `IN_PRODUCTION` → `DONE`

Estrutura de `products`:

```json
{ "product": "507f1f77bcf86cd799439011", "quantity": 2 }
```

---

## Contratos da API

Base URL: `http://localhost:3001`

### Categorias

#### `GET /categories`

Lista todas as categorias do cardápio.

**Respostas**

| Status | Body                          |
|--------|-------------------------------|
| `200`  | `Category[]`                  |
| `204`  | Sem conteúdo (lista vazia)    |
| `500`  | Erro interno                  |

---

#### `POST /categories`

Cria uma nova categoria.

**Body** (`application/json`)

```json
{
  "name": "Pizza",
  "icon": "pizza"
}
```

**Respostas**

| Status | Body                                      |
|--------|-------------------------------------------|
| `201`  | Categoria criada                          |
| `400`  | `{ "error": "Name is required" }`         |
| `400`  | `{ "error": "Icon is required" }`         |
| `500`  | Erro interno                              |

---

#### `DELETE /categories/:categoryId`

Remove uma categoria pelo ID.

**Respostas**

| Status | Body                                  |
|--------|---------------------------------------|
| `204`  | Categoria removida                    |
| `404`  | `{ "error": "Category not found" }`   |
| `500`  | Erro interno                          |

---

### Produtos

#### `GET /products`

Lista todos os produtos do cardápio.

**Respostas**

| Status | Body                          |
|--------|-------------------------------|
| `200`  | `Product[]`                   |
| `204`  | Sem conteúdo (lista vazia)    |
| `500`  | Erro interno                  |

---

#### `GET /categories/:categoryId/products`

Lista os produtos de uma categoria específica.

**Respostas**

| Status | Body                                  |
|--------|---------------------------------------|
| `200`  | `Product[]`                           |
| `204`  | Sem conteúdo (categoria sem produtos) |
| `400`  | `{ "error": "Invalid category ID" }`  |
| `404`  | `{ "error": "Category not found" }`   |
| `500`  | Erro interno                          |

---

#### `POST /products`

Cria um novo produto. Requer `multipart/form-data` por causa do upload de imagem.

**Body** (`multipart/form-data`)

| Campo         | Tipo   | Obrigatório | Observação                              |
|---------------|--------|-------------|-----------------------------------------|
| `imagePath`   | file   | sim         | Arquivo de imagem                       |
| `name`        | string | sim         |                                         |
| `description` | string | sim         |                                         |
| `price`       | string | sim         | Convertido para number no servidor      |
| `category`    | string | sim         | ObjectId da categoria                   |
| `ingredients` | string | —           | JSON stringificado do array de objetos  |

**Exemplo de `ingredients`**

```json
[{"name": "Queijo", "icon": "cheese"}, {"name": "Tomate", "icon": "tomato"}]
```

**Respostas**

| Status | Body                                  |
|--------|---------------------------------------|
| `201`  | Produto criado                        |
| `400`  | `{ "error": "Image is required" }`    |
| `404`  | `{ "error": "Category not found" }`    |
| `500`  | Erro interno                          |

A imagem fica acessível em `/uploads/{filename}`.

---

### Pedidos

#### `GET /orders`

Lista todos os pedidos, ordenados do mais recente ao mais antigo. Os produtos vêm populados com os dados completos.

**Respostas**

| Status | Body                          |
|--------|-------------------------------|
| `200`  | `Order[]`                     |
| `204`  | Sem conteúdo (lista vazia)    |
| `500`  | Erro interno                  |

---

#### `POST /orders`

Cria um pedido para uma mesa. O status inicial é `WAITING`.

**Body** (`application/json`)

```json
{
  "table": "05",
  "products": [
    { "product": "507f1f77bcf86cd799439011", "quantity": 2 },
    { "product": "507f191e810c19729de860ea", "quantity": 1 }
  ]
}
```

**Respostas**

| Status | Body                                      |
|--------|-------------------------------------------|
| `201`  | `{ "order": { ... } }`                    |
| `400`  | `{ "error": "Table is required" }`        |
| `400`  | `{ "error": "Products are required" }`    |
| `500`  | Erro interno                              |

---

#### `PATCH /orders/:orderId`

Atualiza o status de um pedido. Usado pela cozinha para acompanhar a produção.

**Body** (`application/json`)

```json
{
  "status": "IN_PRODUCTION"
}
```

Valores aceitos: `WAITING`, `IN_PRODUCTION`, `DONE`

**Respostas**

| Status | Body                                                                              |
|--------|-----------------------------------------------------------------------------------|
| `204`  | Status atualizado                                                                 |
| `400`  | `{ "error": "Invalid order ID" }`                                                   |
| `400`  | `{ "error": "Status is required" }`                                               |
| `400`  | `{ "error": "Status should b one of these: WAITING, IN_PRODUCTION, DONE" }`     |
| `404`  | `{ "error": "Order not found" }`                                                  |
| `500`  | Erro interno                                                                      |

---

#### `DELETE /orders/:orderId`

Cancela (remove) um pedido.

**Respostas**

| Status | Body                                |
|--------|-------------------------------------|
| `204`  | Pedido removido                     |
| `400`  | `{ "error": "Invalid order ID" }`   |
| `500`  | Erro interno                        |

---

## Fluxo principal

1. O app do cliente lista as categorias (`GET /categories`).
2. Ao selecionar uma categoria, lista os produtos (`GET /categories/:categoryId/products`).
3. O cliente monta a sacola e envia o pedido com a mesa (`POST /orders`).
4. A cozinha lista os pedidos (`GET /orders`) e atualiza o status conforme a produção avança (`PATCH /orders/:orderId`).
5. Pedidos podem ser cancelados (`DELETE /orders/:orderId`).
