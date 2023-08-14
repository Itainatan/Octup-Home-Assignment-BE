import { RequestHandler } from "express";
import fs from "fs";
import { logger } from "../utils";
import { DATA_PATH_JSON } from "../consts";

const get: RequestHandler = async (req, res) => {
  try {
    logger.info(`request history of locations `);

    const dataFromFile = await fs.promises.readFile(DATA_PATH_JSON, "utf-8");
    const parsedDataFromFile = JSON.parse(dataFromFile);

    return res.status(200).json({ data: parsedDataFromFile.slice(-10) });
  } catch (e) {
    const message = e instanceof Error ? e.message : "General Error";
    const stack = e instanceof Error ? e.stack : "No Stack";

    logger.error(message, { stack });

    return res.status(500).json({
      message: message,
    });
  }
};

export default get;
