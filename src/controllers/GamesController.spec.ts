import { GameDto } from "../dtos/GameDto"
import { GamesService } from "../services/GamesService"
import { server } from '../index'
import request from 'supertest';

describe("Should routes from game", () => {
    
    it("Should test findAll games return statusCode 200", async() => {

        const app = await server
        const res = await request(app).get('/games')

        expect(res.body.status).toBe(200)
    })

})

describe("Should services from game", () => {
    it("should be able to create a new game", async() => {

        const data = {
            "name": "CatStolen",
            "description": "Jogo bom",
            "price": 36.00,
            "author": "string"
        } as GameDto

        const games = await new GamesService().createGame(data)
        
        expect(games.status).toBe(201)

    })
})