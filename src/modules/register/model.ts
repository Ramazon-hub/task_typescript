import { fetch } from "../../utils/pg";

fetch
const NEW_USER = `
insert into users (user_fullname,user_username,user_password) VALUES ($1, $2, $3) returning
 user_id as id,
 user_username as username,
`;

const creatNewUser = (...values: any) => fetch(NEW_USER, values);

export  { creatNewUser };
