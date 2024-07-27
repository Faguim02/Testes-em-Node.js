import { Request, Response } from "express";
import { GamesService } from "../services/GamesService";

export class GamesController {

    public async createGame(req: Request, res: Response) {
        const data = req.body;

        const game = await new GamesService().createGame(data);

        return res.status(game.status).json(game);
    }

    public async findAllGames(req: Request, res: Response) {
      const games = await new GamesService().findAllGames();

      return res.status(games.status).json(games)
    }
}