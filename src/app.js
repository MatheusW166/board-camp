import express from "express";
import cors from "cors";
import routes from "./routes/index.routes.js";
import { config } from "dotenv";
config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Running at ${PORT}`));
