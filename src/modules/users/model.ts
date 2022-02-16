import { fetch } from "../../utils/pg";

const FIND_USER=`
select 
    user_username as username
from 
    users
where 
    user_id=$1;
`

const ALL_USERS=`
select 
    user_id as id,
    user_fullname as fullname,
    user_username as username,
    created_at 
from 
    users;
`
const findUser=(...values:any)=>fetch(FIND_USER,values)
const allUsers=(...values:any)=>fetch(ALL_USERS,values)

export {findUser,allUsers}