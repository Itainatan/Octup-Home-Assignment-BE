import express from "express";
import routes from "./routes";
import { PORT } from "./consts";
import { logger } from "./utils";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => {
  logger.info(`The application is listening on port ${PORT}!`);
});
