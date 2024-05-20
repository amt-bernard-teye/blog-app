import express from "express";
import dotenv from "dotenv";
import swagger from "swagger-ui-express";
import cors from "cors";
import morgan from "morgan";
import path from "path";

dotenv.config();

import { APP_PORT } from "./constants/env.constant";
import { DatabaseSeeder } from "./seeders/database.seeder";
import { swaggerConfiguration } from "./swagger/config.swagger";
import { authRoute } from "./routes/auth.route";
import { categoryRoute } from "./routes/category.route";

const app = express();

app.set("view engine", "ejs");

app.use(cors());
app.use(morgan("tiny"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/api-docs", swagger.serve, swagger.setup(swaggerConfiguration));

app.use("/api", authRoute);
app.use("/api", categoryRoute);

app.listen(APP_PORT, () => {
    DatabaseSeeder.run();
    console.log(`Server running on port: http://localhost:${APP_PORT}`);
    console.log(`Docs running on port: http://locahost:${APP_PORT}/api-docs`);
});