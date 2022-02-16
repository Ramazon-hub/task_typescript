import bcrypt from 'bcrypt'
const hash = async (password:string) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (err) {
    console.log(err);
  }
};
const compare = async (password:string, hash:string) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    console.log(err);
  }
};
export {
    hash,compare
}