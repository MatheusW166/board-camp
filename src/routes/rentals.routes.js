import { Router } from "express";
import {
  createRental,
  listRentals,
  returnRental,
} from "../controllers/rentals.controllers.js";
import validateSchema from "../middlewares/schema.middleware.js";
import rentalSchema from "../schemas/rental.schema.js";

const rentalsRoutes = Router();

rentalsRoutes.get("/rentals", listRentals);
rentalsRoutes.post("/rentals", validateSchema(rentalSchema), createRental);
rentalsRoutes.post("/rentals/:id/return", returnRental);

export default rentalsRoutes;
