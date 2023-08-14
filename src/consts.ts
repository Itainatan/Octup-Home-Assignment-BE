import dotenv from "dotenv";

dotenv.config();

const {
  PORT = "8000",
  API_URL = "https://www.superheroapi.com/api",
  SECRET_TOKEN = "10223009321394258",
} = process.env;


export { PORT, API_URL, SECRET_TOKEN };
