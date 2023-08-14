import { RequestHandler } from "express";
import Joi from "joi";
import { logger } from "../utils";
import { API_URL, SECRET_TOKEN } from "../consts";
import axios from "axios";

const schema = Joi.object().keys({
  name: Joi.string(),
});

const deleteExchange: RequestHandler = async (req, res) => {
  try {
    const {
      params: { name },
      params,
    } = req;

    try {
      await schema.validateAsync(params);
    } catch (e) {
      return res.status(400).json({
        message: e instanceof Error ? e.message : "Validation failed",
      });
    }

    logger.info(`got name -> ${name}`);

    const { data } = await axios.get(
      `${API_URL}/${SECRET_TOKEN}/search/${name}`
    );

    logger.info(`got data for the name -> ${name}`);

    return res.status(200).json(data);
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
