import express from "express";
import bodyParser from "body-parser";
import connection from "./config/mongo.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
connection();
app.use(bodyParser.json());

app.listen(5000);
