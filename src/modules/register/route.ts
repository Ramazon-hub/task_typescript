import { Router } from "express";
import controller from "./index";

const router = Router();

router.post("/register", controller.REGISTER);

export default router;
