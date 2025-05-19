import { Request, Response } from 'express';
import { createUser, fetchUsers } from '../service/user.service';
import jwt from 'jsonwebtoken';
export const createUserHandler = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const result: any = await createUser(user);
        const payload = {
            id: result.insertId, // assuming `result` has an `id` property
            email: result.email
        };

        const token = jwt.sign(payload, "SECRET_KEY", { expiresIn: '1h' });
        res.status(201).json({ message: 'User created successfully', data: { ...user, token } });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err });
    }
};

export const fetchUsersHandler = async (req: Request, res: Response) => {
    try {
        const users = await fetchUsers()
        console.log('users', users);

        res.status(200).json({ message: 'User fetch successfully', data: users || [] });
    }
    catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err });
    }
}
