import { config } from "dotenv";

config();

export default{
PORT: process.env.PORT,
SECRET_KEY: process.env.SECRET_KEY,
DB_URL: process.env.DB_URL,
FILE_MAX_SIZE:process.env.FILE_SIZE
};
