import { Request, Response } from "express";
import { compare } from "../../utils/bcrypt";
import { SIGN } from "../../utils/jwt";
import { findUser } from "./model";

export default {
  LOGIN: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password)
        return res.status(400).json({ message: "Invalid values !" });

      const foundUser = await findUser(username);

      if (!foundUser) return res.status(404).json({ message: "User not found ,please try again !" });

      const comparedPassword = await compare(
        password,
        foundUser.password
      );

      if (!comparedPassword)
        return res.status(400).json({ message: "Password is incorect,please try again !" });

      const token = SIGN({ userId: foundUser.id });

      res.status(200).json({ message: "Succesfully visited !", token });
    } catch (error) {
      res.status(500).json({ message: `Server error !` });
    }
  },
};
