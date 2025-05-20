import { Request, Response } from 'express';
import { createPost, createUser, fetchUsers, fetchUsersWithPosts } from '../service/user.service';
import jwt from 'jsonwebtoken';
import { Post } from '../../generated/prisma';

export const createUserHandler = async (req: Request, res: Response) => {
    try {

        const user = req.body;
        const result: any = await createUser(user);
        
        const payload = {
            id: result.insertId, // assuming `result` has an `id` property
            email: result.email
        };

        const token = jwt.sign(payload, "SECRET_KEY", { expiresIn: '10h' });
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



export const createPostHandler = async (req: Request, res: Response) => {
    try {
        const { id, title, content }: Post = req.body;

        console.log(req.body, "oost")

        const result = await createPost({ title, content, id });

        res.status(201).json({ message: 'Post created successfully', data: result });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err });
    }
};



export const fetchUsersWithPostsHandler = async (_req: Request, res: Response) => {
    try {
        const users = await fetchUsersWithPosts();

        res.status(200).json({ message: 'Fetched users with posts', data: users });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err });
    }
};