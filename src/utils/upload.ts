import path from "path"
import fs from 'fs'
import uuid from "uuid"
import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
type DestinationCallback = (error: Error | null, destination: string) => void
type FileFormatError = (error: Error | null, message: string) => void

type FileNameCallback = (error: Error | null, filename: string) => void
let filename = "";
const fileStorageEngine = multer.diskStorage({
  destination: (req:Request, file :Express.Multer.File, cb:DestinationCallback):void => {
    cb(null, path.resolve(__dirname, "../uploads"));
  },
  filename: (req:Request, file:Express.Multer.File, cb:FileNameCallback):void => {
    filename = `${uuid.v4()}.${file.mimetype.split("/")[1]}`;
    cb(null, filename);
  },
});
const upload = multer({
  storage: fileStorageEngine
});
const deleteFile =(file: string) => {
  fs.unlink(path.join(__dirname, "../uploads", file), (er) => {
    if(er)return console.log(er);

  });
}
export  {
  upload,filename,deleteFile
  
}
