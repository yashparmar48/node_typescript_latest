import { db } from '../config/db';
import { User } from '../models/user';

export const createUser = async (user: User) => {
  const [result] = await db.execute(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [user.name, user.email]
  );
  return result;
};


export const fetchUsers = async()=>{
    const [result] = await db.execute(`SELECT * FROM users`)
    return result
}