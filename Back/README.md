# Sobre o projeto

É uma API Rest feita em TypeORM que gerencia os contatos de um usuário, sendo feito o CRUD tanto do usuário como dos contatos.



# Como instalar e rodar a aplicação


Clone o repositório na sua máquina

Rode o comando npm install para todas as dependencias serem instaladas

Crie o arquivo .env e se atente em preencher de acordo com o.env.exemple

Rode as migrações com o comando npm run typeorm migration:run -- -d ./src/data-source

Rode o comando npm run dev para rodar a aplicação



# Rotas
## **Client**


### **POST - /clients**
Rota de criação de usuário.
| Dados de Envio:    |
| ------------------ |
| Body: Formato Json |

```json
{
  "name": "Jubiraci das Conceições Pernambucanas",
  "email": "jubira@hotmail.com",
  "password": "5295@bhFF",
  "telephone": "2112345678",
}
```

| Resposta do servidor:                               |
| --------------------------------------------------- |
| Body: Formato Json                                  |
| Status code: <b style="color:green">201 CREATED</b> |

```json
// Repare nos valores de ID enviados e retornados⁠
{
  "id": 1,
  "name": "Jubiraci das Conceições Pernambucanas",
  "email": "jubira@hotmail.com",
  "password": "5295@bhFF",
  "telephone": "2112345678",
  "registerAt": "12/01/2024",
}
```

### **GET - /clients**
Deve ser possível listar os filmes armazenados no banco de dados.

| Resposta do servidor:                          |
| ---------------------------------------------- |
| Body: Formato Json                             |
| Status code: <b style="color:green">200 OK</b> |

```json
{
  "count": 1,
  "data": [
    {
        "id": 1,
        "name": "Jubiraci das Conceições Pernambucanas",
        "email": "jubira@hotmail.com",
        "password": "5295@bhFF",
        "telephone": "2112345678",
        "registerAt": "12/01/2024",
    },

  ]
}
```

### **PATCH - /clients/:id**
Deve ser possível atualizar um usuário pelo id recebido nos parâmetros da rota.
**Url da requisição**: `http://localhost:3000/movies/4`

| Dados de Envio:    |
| ------------------ |
| Body: Formato Json |

```json
{
    "name": "Jubiraci das Pernambucanas Conceições",
    "email": "jubira2@hotmail.com",
    "password": "5295@bhFG",
    "telephone": "2187654321",
}
```

| Resposta do servidor:                          |
| ---------------------------------------------- |
| Body: Formato Json                             |
| Status code: <b style="color:green">200 OK</b> |

```json
{
  // repare no valor enviado e no recebido do id
    "id": 1,
    "name": "Jubiraci das Pernambucanas Conceições",
    "email": "jubira2@hotmail.com",
    "password": "5295@bhFG",
    "telephone": "2187654321",
    "registerAt": "12/01/2024"
}
```

### **DELETE - /clients/:id**
Deve ser possível deletar um usuário pelo id recebido nos parâmetros da rota.

| Resposta do servidor:                                  |
| ------------------------------------------------------ |
| Body: **Nenhum body deve ser retornado**               |
| Status code: <b style="color:green">204 NO CONTENT</b> |

```json

```


## **Contacts**

### **POST - /contacts**
Rota de criação de contatos.
| Dados de Envio:    |
| ------------------ |
| Body: Formato Json |

```json
{
  "name": "Contato com nome genérico",
  "email": "contato@hotmail.com",
  "telephone": "2112345678",
}
```

| Resposta do servidor:                               |
| --------------------------------------------------- |
| Body: Formato Json                                  |
| Status code: <b style="color:green">201 CREATED</b> |

```json
// Repare nos valores de ID enviados e retornados⁠
{
  "id": 1,
  "name": "Contato com nome genérico",
  "email": "contato@hotmail.com",
  "telephone": "2112345678",
  "registerAt": "12/01/2024",
}
```

### **GET - /contacts**
Deve ser possível listar os contatos do usuário logado armazenados no banco de dados.

| Resposta do servidor:                          |
| ---------------------------------------------- |
| Body: Formato Json                             |
| Status code: <b style="color:green">200 OK</b> |

```json
{
  "count": 1,
  "data": [
    {
        "id": 1,
        "name": "Contato com nome genérico",
        "email": "jubira@hotmail.com",
        "telephone": "2112345678",
        "registerAt": "12/01/2024",
    },

  ]
}
```

### **PATCH - /contacts/:id**
Deve ser possível atualizar um contato pelo id recebido nos parâmetros da rota.
**Url da requisição**: `http://localhost:3000/contacts/1`

| Dados de Envio:    |
| ------------------ |
| Body: Formato Json |

```json
{
    "name": "Contato com nome mais genérico ainda",
    "email": "contato2@hotmail.com",
    "password": "5295@bhFG",
    "telephone": "2187654321",
}
```

| Resposta do servidor:                          |
| ---------------------------------------------- |
| Body: Formato Json                             |
| Status code: <b style="color:green">200 OK</b> |

```json
{
  // repare no valor enviado e no recebido do id
    "id": 1,
    "name": "Contato com nome mais genérico ainda",
    "email": "contato2@hotmail.com",
    "telephone": "2187654321",
    "registerAt": "12/01/2024"
}
```

### **DELETE - /contacts/:id**
Deve ser possível deletar um contato do usuário pelo id recebido nos parâmetros da rota.

| Resposta do servidor:                                  |
| ------------------------------------------------------ |
| Body: **Nenhum body deve ser retornado**               |
| Status code: <b style="color:green">204 NO CONTENT</b> |

```json

```



## **Session**
### **POST - /login**
Rota de login.
| Dados de Envio:    |
| ------------------ |
| Body: Formato Json |

```json
{
  "email": "jubiraci2@hotmail.com",
  "password": "5295@bhFG",
}
```

| Resposta do servidor:                               |
| --------------------------------------------------- |
| Body: Formato Json                                  |
| Status code: <b style="color:green">201 CREATED</b> |

```json
// Repare nos valores de ID enviados e retornados⁠
{
  "id": 1,
  "name": "Contato com nome genérico",
  "email": "contato@hotmail.com",
  "telephone": "2112345678",
  "registerAt": "12/01/2024",
}
```