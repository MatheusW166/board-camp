import { Router } from "express";
import {
  createCustomer,
  listCustomers,
  searchCustomerById,
  updateCustomer,
} from "../controllers/customers.controllers.js";
import validateSchema from "../middlewares/schema.middleware.js";
import customerSchema from "../schemas/customer.schema.js";

const customersRoutes = Router();

customersRoutes.get("/customers", listCustomers);
customersRoutes.get("/customers/:id", searchCustomerById);
customersRoutes.post(
  "/customers",
  validateSchema(customerSchema),
  createCustomer
);
customersRoutes.put(
  "/customers/:id",
  validateSchema(customerSchema),
  updateCustomer
);

export default customersRoutes;
