import { Router } from "express";
import controller from "./index";

const router = Router();

router.get("/user:userId", controller.GET_USER);
router.get("/users", controller.ALL_USERs);


export default router;
