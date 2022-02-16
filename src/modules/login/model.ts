import { fetch } from "../../utils/pg";

const FIND_USER = `
select
    user_id as id,
    user_password as password
 from users where user_username = $1
`;

const findUser = (...values: any) => fetch(FIND_USER, values);

export {findUser}