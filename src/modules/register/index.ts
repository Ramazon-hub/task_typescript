import { Request, Response } from "express";
import {SIGN} from "../../utils/jwt";
import {hash} from "../../utils/bcrypt";
import eventEmitter from "../../utils/events";
import { creatNewUser } from "./model";


export default {
  eventEmitter,
  REGISTER: async (req: Request, res: Response) => {
    try {
      const { fullname, username, password } = req.body;

      if (!fullname  || !username || !password)
        return res.status(400).json({ message: "Invalid values !" });

      const hashedPassword = await hash(password);

      const newUser = await creatNewUser(
        fullname,
        username,
        hashedPassword
      );

      if (!newUser)
        return res.status(500).json({ message: "User not created,please try again !" });

      const token = SIGN({ userId: newUser.id });

      res.status(201).json({ message: "Succesfully !", token });

      eventEmitter.emit("newUser", newUser);
    } catch (error) {
      res.status(400).json({
        message: `Please choose another username ,this username already exist!`,
      });
    }
  },
};
