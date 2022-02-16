import {Request,Response,NextFunction}from 'express'
import { VERIFY } from '../utils/jwt';
  const authentication = (req:Request, res:Response, next:NextFunction) => {
    try {
      const { token } = req.headers;
      const { userId }:any = VERIFY(token);
      if (!userId)
        return res
          .status(401)
          .json({
            message:
              "Siz Userlar ro'yxatidan topilmadingiz, Login qilin yoki Registratsiyadan o'tin!",
          });

      req.body.userId = userId;

      next();
    } catch (error) {
      return res
        .status(401)
        .json({
          message:
            "Siz Userlar ro'yxatidan topilmadingiz, Login qilin yoki Registratsiyadan o'tin!",
        });
    }
  }
export{
    authentication
}
