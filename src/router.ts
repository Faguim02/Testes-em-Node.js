import { Router } from "express";
import { GamesController } from "./controllers/GamesController";

export const router = Router();

router.post('/games', new GamesController().createGame);

router.get('/games', new GamesController().findAllGames);