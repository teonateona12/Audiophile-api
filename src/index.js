import express from "express";
import bodyParser from "body-parser";
import connection from "./config/mongo.js";
import dotenv from "dotenv";
import router from "./routes/user-routes.js";
import cors from "cors";
import path, { join } from "path";
import { Edge } from "edge.js";
import crypto from "crypto";
// import gmailTransport from "./mail/gmail.js";

const send = (to, subject, html) => {
  const options = {
    to,
    subject,
    html,
    from: "teona.piranishvili1@gmail.com",
  };

  return gmailTransport.sendMail(options);
};

const edge = new Edge({ cache: false });
const templatesPath = join(path.resolve(), "src/mail/templates");
edge.mount(templatesPath);

export const sendEmailConfirmation = async (to, hash, name, backLink) => {
  const html = edge.renderSync("confirm-email", {
    link: `${backLink}?hash=${hash}`,
    name,
  });
  return send(to, "Email Confirmation", html);
};

import swaggerMiddleware from "./middlewares/swagger-middleware.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/avatar", express.static("public/avatar"));
app.use("/product", express.static("public/product"));

app.use("/api", router);
app.use("/", ...swaggerMiddleware);
dotenv.config();
connection();

app.listen(5000);
