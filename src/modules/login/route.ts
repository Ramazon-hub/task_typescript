import { Router } from "express";
import controller from "./index";

const router = Router();

router.post("/login", controller.LOGIN);

export default router;
