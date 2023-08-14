import { Router } from "express";
import history from "./get-history";
import search from "./get-weather";

const router = Router();

router.get("/get-history", [], history);
router.get("/get-weather/:city", [], search);

export default router;
