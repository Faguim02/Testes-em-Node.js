# Testes com Node e TypeScript

> Testar nosso codigo durante o desenvolvimento, traz a segurança que nosso codigo está funcionando perfeitamente e evitar problemas em produção.

## Tipos de testes

- Testes Unitarios
  - Testes em pequenas unidades de codigo

- Testes de integrações
  - Testes em rotas

## Configurações iniciais

> [!IMPORTANT]
> Use o ts-node para transpilar o typescript, o jest não tem suporte para outros como o tsx (ou melhor, não encontrei uma forma).

1. Configurando ambient do node com typescript.

2. Configure seu ORM e banco de sua preferencia.

3. Instale o express ou fastfy para fazer a Api.

4. Instale o Jest e o TsJest
    - `npm i jest @types/jest -D ts-jest -D`
5. Iniciar Jest
    - `npm init jest@latest`
6. Configurar o Jest, no arquivo `jest.config.ts`:

```json
preset: "ts-jest"
testMatch: ["**/**/*.spec.ts"]
```

## Executando os primeiros testes unitarios

crie um arquivo `nomeDoArquivo.spec.ts` para executar os testes

INICIE COM DESCRIBE

```ts
describe("Games", () => {
    
})
```

Em seguida, use o `it()` para agrupar seu testem

- o primeiro parametro é uma string, o nome do teste

- o segundo parametro é uma função, onde será executado o teste

```ts
describe("Games", () => {
    it("should be able to create a new game", async() => {
        //Coloque o teste aqui
    })
})
```

O teste de exemplo, é, fazer uma chamada a função que armazena os dados do game no banco de dados, e o esperado é que o resultado de `game.status` seja 201

```ts
import { GameDto } from "../dtos/GameDto"
import { GamesService } from "../services/GamesService"

describe("Games", () => {
    it("should be able to create a new game", async() => {

        const data = {...} as GameDto

        const games = await new GamesService().createGame(data)
        
        //expect = esperar | toBe = ser/seja
        //esperar que games.status seja 201
        expect(games.status).toBe(201)

    })
})
```

por fim, execute dando um `npm run test`


## Executando os primeiros testes de integração

execute: `npm i supertest @types/supertest -D` no terminal para baixar a biblioteca.

em seguida crie um arquivo para esses testes `nomeDoArquivo.spec.ts`.

Assim como nos testes unitarios, utiliza a mesma estrutura:

```ts
import { server } from '../index'
import request from 'supertest';

describe("Games", () => {
    it("Should test findAll games return statusCode 200", async() => {

        //Deixe o servidor express/fastfy exportavel
        const app = await server

        //chame o request, passe o app express como parametro
        //escolha o metodo http (get, post, delete, put) e passe o endpoint da rota
        const res = await request(app).get('/games')

        //res é o resultado da busca pela rota da api, temos os parametros body = o que foi recebido, header ...

        //espera que o res.body.status seja 200
        expect(res.body.status).toBe(200)
    })
})
```

por fim, execute um `npm run test`.

## Mais detalhes
fora esse exemplo utilizando o `expect().toBe()` que é: esperar que algo seja algo, existem varios outros meio de testar coisas diferentes, listarei alguns:

```ts

it("Should tests exemple", async() => {

        const app = await server
        const res = await request(app).get('/games')

        //espera que o res.body.status seja 200
        expect(res.body.status).toBe(200)

        //espera que o res.body.status não seja 200
        expect(res.body.status).not.toBe(200)

        //espera que res.body tenha a propriedade "status"
        expext(res.body).toHaveProperty("status")

        //ver se array tem 2 itens
        expect(res.body.data).toHaveLength(2)
    })

```

### [Veja mais exemplos de expect clicando aqui](https://jestjs.io/pt-BR/docs/expect)

## Tecnologias utilizadas
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Prisma](https://www.prisma.io/)
- [Jest](https://jestjs.io/pt-BR/)
- [Supertest](https://www.npmjs.com/package/supertest)
