import { config } from "dotenv";

config();

export default{
PORT: process.env.PORT,
SECRET_KEY: process.env.SECRET_KEY,
DB_URL: process.env.DB_URL,
DB_ONLINE_URL:process.env.DB_ONLINE_URL
};
