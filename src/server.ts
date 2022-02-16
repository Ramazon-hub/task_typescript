import  express,{Request,Response} from 'express';
import  cors from "cors";
import  path from "path";
import  { createServer } from "http";
import  { Server,Socket } from "socket.io";
import  routes from "./routes/index";
import  config from './config'
import eventEmitter from './utils/events';
import { VERIFY } from './utils/jwt';
let connectionUsers:any[]=[]
const app = express();
const server = createServer(app);
const io = new Server(server);
app.use("/media", express.static(path.join(__dirname, "./uploads")));
app.use(cors());
app.use(express.json());
app.use(routes);
io.on("connection", (socket:Socket): any => {
    const { token }: any = socket.handshake.headers;
    if (!token) return;
    const { userId }: any = VERIFY(token);
    const newUser = {
      userId,
      userTemporaryId: socket.id
    };
    connectionUsers.push(newUser);
     // Personal Message
    eventEmitter.on("personalMessage", (message) => {
      const reciever = connectionUsers.find(
        (user) => user.userId === message.recieverId
      );
  
      if (reciever) {
        socket.to(reciever.userTemporaryId).emit("personalMessage", message);
      }
    });
  
    eventEmitter.on("deleteMessage", (message) => {
      const reciever = connectionUsers.find(
        (user) => user.userId === message.user_id
      );
  
      if (reciever) {
        socket.to(reciever.userSocketId).emit("deleteMessage", message);
      }
    });
  
    eventEmitter.on("newUser", (newUser) => {
      socket.broadcast.emit("newUser", newUser);
    });
  
    socket.on("disconnect", () => {
      const removeUser=userLeave(connectionUsers,socket.id)
       connectionUsers = connectionUsers.filter((user) => user.userTemporaryId !== socket.id);

      if(removeUser){
           io.emit('message',removeUser)
      } 
    });
})
function userLeave(array:any,id:any){
  const index = array.findIndex((user:any) => user.userTemporaryId !== id);
  if(index!==-1)return connectionUsers.splice(index,1)
}

server.listen(():void=>console.log(`server run on port ${config.PORT}`));