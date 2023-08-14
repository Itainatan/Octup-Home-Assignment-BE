import { Router } from "express";
import search from "./get-hero";

const router = Router();

router.get("/get-superhero/:name", [], search);

export default router;
