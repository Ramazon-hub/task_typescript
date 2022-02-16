import { Router } from "express";
import { fileUpload } from "../../middleware/fileUpload";
fileUpload
import { authentication } from "../../middleware/authentication";
import controller from "./index";
const router = Router();

router
  .get("/messages", authentication, controller.GET_MESSAGES)
  .post("/message", authentication,fileUpload,controller.NEW_MESSAGE)
  .delete("/message/:messageId", authentication, controller.DELETE_MESSAGE);

export default router;
