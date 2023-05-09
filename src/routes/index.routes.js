import { Router } from "express";
import gamesRoutes from "./games.routes.js";

const routes = Router();

routes.use(gamesRoutes);

export default routes;
