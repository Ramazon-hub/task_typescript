const { upload } = require("../utils/multer");
import {Request,Response,NextFunction} from 'express'

const fileUpload = (req:Request, res:Response, next:NextFunction) => {
  return upload.single("file")(req, res, (err:any) => {
    if (err)
      return res.status(400).json({
        message: err.message,
      });
    next();
    
  });
};

export { fileUpload };
