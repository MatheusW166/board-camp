import { Router } from "express";
import gamesRoutes from "./games.routes.js";
import customersRoutes from "./customers.routes.js";

const routes = Router();

routes.use(gamesRoutes);
routes.use(customersRoutes);

export default routes;
