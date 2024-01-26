import express from "express";
import { configDb } from "./config.js";
import { router } from "./routes.js";
import { db } from "./src/config/db.js";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api", router);

const port = configDb.port;

//db connection then server connection
db.then(() => {
  app.listen(port, () => console.log(`Server is listening on port ${port}`));
});
