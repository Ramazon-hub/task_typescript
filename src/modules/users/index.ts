import { Request, Response } from "express";
import { findUser,allUsers } from "./model";


export default {
  GET_USER: async (req: Request, res: Response) => {
    try {
      const {userId}=req.params
      const foundUser = await findUser(userId);
      if (!foundUser) return res.status(404).json({ message: "User not found ,please try again !" });
      res.status(200).json({ message: "Succesfully !", foundUser });
    } catch (error) {
      res.status(500).json({ message: `Server error !` });
    }
  },
  ALL_USERs: async (req: Request, res: Response) => {
    try {
      
      const AllUsers = await allUsers();
      if (!AllUsers) return res.status(404).json({ message: "User not found ,please try again !" });

      res.status(200).json({ message: "Succesfully  !", AllUsers });
    } catch (error) {
      res.status(500).json({ message: `Server error !` });
    }
  },
};
