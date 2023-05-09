import { Router } from "express";
import gamesRoutes from "./games.routes.js";
import customersRoutes from "./customers.routes.js";
import rentalsRoutes from "./rentals.routes.js";

const routes = Router();

routes.use(gamesRoutes);
routes.use(customersRoutes);
routes.use(rentalsRoutes);

export default routes;
