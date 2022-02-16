import { Router } from "express";

const router = Router();

import register from "../modules/register/route";
import login from "../modules/login/route";
import message from "../modules/messages/route";
import users from "../modules/users/route";

router.use("/", register);
router.use("/", login);
router.use("/", message);
router.use("/", users);


export default router;
