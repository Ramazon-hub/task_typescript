import { Request, Response } from "express";
import { deleteFile } from "utils/upload";
import eventEmitter from "../../utils/events";
import { deleteMessage, getMessages, newMessage } from "./model";

export default {
  eventEmitter,
  GET_MESSAGES: async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;

      const allMessages = await getMessages(userId);
      if(!allMessages)
      return res.status(400).json({message:"No messages !"})

      res.status(200).json({ message: "All Messages !", data: allMessages });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: `Server error!` });
    }
  },
  NEW_MESSAGE: async (req: Request, res: Response) => {
    try {
      const { message, recieverId, userId } = req.body;
      const {filename} = req.file;

      if ((!message && !filename) || !recieverId)
        return res.status(400).json({ message: "Invalid values !" });
      const createMessage = await newMessage(
        message,
        filename,
        userId,
        recieverId
      );

      if (!createMessage) {
        deleteFile(filename)

        return res.status(500).json({ message: "Message noi=t created!" });
      }

      res.status(200).json({ message: "Succesfully create a new message !", data: createMessage });

      eventEmitter.emit("personalMessage", createMessage);
    } catch (error) {
      res.status(500).json({ message: `Server error!` });
    }
  },
  DELETE_MESSAGE: async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
      const { messageId } = req.params;

      const deletedMessage = await deleteMessage(messageId, userId);

      if (!deletedMessage)
        return res.status(500).json({ message: "SERVER_DELETED_ERROR!" });

      res.status(200).json({ message: "DELETED", data: deletedMessage });

      eventEmitter.emit("deleteMessage", deletedMessage);

      deleteFile(deletedMessage.file);
    } catch (error) {
      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
};
