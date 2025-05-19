import { Request, Response } from 'express';
import { createUser, fetchUsers } from '../service/user.service';

export const createUserHandler = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const result = await createUser(user);
        res.status(201).json({ message: 'User created successfully', data: user });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err });
    }
};

export const fetchUsersHandler = async (req: Request, res: Response) => {
    try {
        const users = await fetchUsers()
        console.log('users',users);
        
        res.status(200).json({ message: 'User fetch successfully', data: users || [] });
    }
    catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err });
    }
}
