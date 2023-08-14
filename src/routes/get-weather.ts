import { RequestHandler } from "express";
import Joi from "joi";
import fs from "fs";
import { logger } from "../utils";
import { DATA_PATH_JSON } from "../consts";
import axios from "axios";

const schema = Joi.object().keys({
  city: Joi.string(),
});

const deleteExchange: RequestHandler = async (req, res) => {
  try {
    const {
      params: { city },
      params,
    } = req;

    try {
      await schema.validateAsync(params);
    } catch (e) {
      return res.status(400).json({
        message: e instanceof Error ? e.message : "Validation failed",
      });
    }

    logger.info(`got city -> `, city);

    const weather = await axios.get(
      `https://api.weatherapi.com/v1/current.json?q=${city}&key=0c2ec368bdf34942bd0104420233005`
    );

    const dataToReturn = {
      name: city,
      data: weather.data,
    };

    logger.info("got weather for the city");

    const dataFromFile = await fs.promises.readFile(DATA_PATH_JSON, 'utf-8')

    await fs.promises.writeFile(DATA_PATH_JSON, JSON.stringify([...JSON.parse(dataFromFile), dataToReturn]));

    logger.info("finish save in database");

    return res.status(200).json(dataToReturn);
  } catch (e) {
    const message = e instanceof Error ? e.message : "General Error";
    const stack = e instanceof Error ? e.stack : "No Stack";

    logger.error(message, { stack });

    return res.status(500).json({
      message: message,
    });
  }
};

export default deleteExchange;
