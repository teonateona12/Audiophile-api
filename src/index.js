import express from "express";
import bodyParser from "body-parser";
import connection from "./config/mongo.js";
import dotenv from "dotenv";
import router from "./routes/user-routes.js";
import cors from "cors";

import swaggerMiddleware from "./middlewares/swagger-middleware.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/avatar", express.static("public/avatar"));
app.use("/api", router);
app.use("/", ...swaggerMiddleware);
dotenv.config();
connection();

app.listen(5000);
