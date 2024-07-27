import express, { Application } from 'express';
import cors from 'cors';
import { router } from './router';

export const server: Application = express();

server.use(express.json());
server.use(cors());
server.use(router);

server.listen(8080, () => console.log("Rodando"));