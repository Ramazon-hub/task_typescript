import { fetch,fetchAll } from "../../utils/pg";

const GET_MESSAGES = `
select
    message_id as id,
    message_text as message,
    message_media as file,
    message_sender as user_id,
    message_reciever as author_id,
    message_send_date as date
from messages 
where 
    message_sender = $1 OR message_reciever = $1;
`;
const NEW_MESSAGE = `
insert into messages (
    message_text, 
    message_media, 
    message_sender, 
    message_reciever
) VALUES ($1, $2, $3, $4) 
returning
    message_id as id,
    message_text as message,
    message_media as file,
    message_user as user_id,
    message_author as author_id,
    message_send_date as date;
`;
const DELETE_MESSAGE = `
delete 
FROM 
    messages 
where 
    message_id = $1 AND message_sender = $2 
returning
    message_id as id,
    message_text as message,
    message_media as file,
    message_sender as author_id,
    message_reciever as user_id,
    message_send_date as date;
`;

const getMessages = (...values: any) => fetchAll(GET_MESSAGES, values);
const newMessage = (...values: any) => fetch(NEW_MESSAGE, values);
const deleteMessage = (...values: any) => fetch(DELETE_MESSAGE, values);

export  { getMessages, newMessage, deleteMessage };
