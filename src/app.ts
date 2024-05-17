import express from "express";
import dotenv from "dotenv";
import swagger from "swagger-ui-express";
import cors from "cors";
import morgan from "morgan";
import path from "path";

dotenv.config();

import { APP_PORT } from "./constants/env.constant";
import { swaggerConfiguration } from "./swagger/config.swagger";

const app = express();

app.set("view engine", "ejs");

app.use(cors());
app.use(morgan("tiny"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/api-docs", swagger.serve, swagger.setup(swaggerConfiguration));

app.listen(APP_PORT, () => {
    console.log(`Server running on port: http://localhost:${APP_PORT}`);
    console.log(`Docs running on port: http://locahost:${APP_PORT}/api-docs`);
});