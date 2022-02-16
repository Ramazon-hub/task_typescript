import jwt from 'jsonwebtoken'
import config from '../config/index'

const SIGN = async (data:object) => {
  try {
    return await jwt.sign(data,config.SECRET_KEY);
  } catch (err) {
    console.log(err);
  }
};
const VERIFY = async (data:any) => {
  try {
    return await jwt.verify(data,config.SECRET_KEY);
  } catch (err) {
    console.log(err);
  }
};
export {
  SIGN,
  VERIFY,
};
