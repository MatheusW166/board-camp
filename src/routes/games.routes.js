import { Router } from "express";
import gameSchema from "../schemas/game.schema.js";
import { createGame, listGames } from "../controllers/games.controllers.js";
import validateSchema from "../middlewares/schema.middleware.js";

const gamesRoutes = Router();

gamesRoutes.get("/games", listGames);
gamesRoutes.post("/games", validateSchema(gameSchema), createGame);

export default gamesRoutes;
