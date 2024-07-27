import { prisma } from "../database/prismaClient";
import { GameDto } from "../dtos/GameDto";
import { ResponseDto } from "../dtos/ResponseDto";

export class GamesService {

    private gamePrisma = prisma;

    async createGame(data: GameDto): Promise<ResponseDto<string | GameDto>> {
        try {

            const isObjectBlank = Object.values(data).every(value => value !== null && value !== undefined);

            if(!isObjectBlank) {
                return {
                    data: 'Os campos estão vazios',
                    status: 400
                }
            }
            
            const isGameExist = await this.isGameExist(data);

            if(isGameExist) {
                return {
                    data: 'O jogo já existe em nossa plataforma',
                    status: 409
                }
            }

            const game = await this.gamePrisma.games.create({data});

            return {
                data: game,
                status: 201
            }

        } catch (error) {
            return {
                data: `${error}`,
                status: 417
            }
        }
    }

    async findAllGames(): Promise<ResponseDto<GameDto[] | string>> {
        try {
            
            const games = await this.gamePrisma.games.findMany();

            return {
                data: games,
                status: 200
            }

        } catch (error) {
            return {
                data: `${error}`,
                status: 417
            }
        }
    }

    async isGameExist(data: GameDto): Promise<boolean> {
        const game = await this.gamePrisma.games.findFirst({where: data});

        return !!game;
    }
}